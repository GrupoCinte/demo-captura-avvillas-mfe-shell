import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";

interface GraphQLRequestBody<V> {
	query: string;
	variables?: V;
}

export interface GraphQLResponse<T = any> {
	data?: T;
	errors?: Array<{
		message: string;
		path?: any[];
		errorType?: string;
		errorInfo?: any;
		locations?: Array<{
			line: number;
			column: number;
			sourceName?: string;
		}>;
	}>;
}

export class GraphQLError extends Error {
	constructor(message: string, public response: GraphQLResponse) {
		super(message);
		this.name = "GraphQLError";
	}
}

export interface GraphQLClient {
	request<T, V = Record<string, unknown>>(
		body: GraphQLRequestBody<V>,
		init?: RequestInit
	): Promise<T>;
}

export class AppSyncClient implements GraphQLClient {
	private readonly client = generateClient();

	constructor(
		private readonly url: string,
		private readonly region: string,
		private readonly apiKey?: string
	) {
		if (!url) throw new Error("AppSync URL is not defined");

		Amplify.configure({
			API: {
				GraphQL: {
					endpoint: url,
					region,
					defaultAuthMode: "apiKey",
					apiKey,
				},
			},
		});
	}

	async request<T, V = Record<string, unknown>>(
		body: GraphQLRequestBody<V>
	): Promise<T> {
		try {
			const result = (await this.client.graphql({
				query: body.query as any,
				variables: body.variables as Record<string, unknown> | undefined,
			})) as GraphQLResponse<T>;

			if (result.errors?.length) {
				throw new GraphQLError(
					result.errors.map((e) => e.message).join(", "),
					result
				);
			}

			return result.data as T;
		} catch (error) {
			if (error instanceof GraphQLError) {
				throw error;
			}

			if (error && typeof error === "object" && "errors" in error) {
				const graphqlError = error as any;
				throw new GraphQLError(
					graphqlError.errors?.map((e: any) => e.message).join(", ") ||
						"Unknown GraphQL error",
					graphqlError
				);
			}

			throw error;
		}
	}
}
