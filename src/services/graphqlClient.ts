import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';

interface GraphQLRequestBody<V> {
  query: string;
  variables?: V;
}

export interface GraphQLClient {
  request<T, V = Record<string, unknown>>(
    body: GraphQLRequestBody<V>,
    init?: RequestInit,
  ): Promise<T>;
}

export class AppSyncClient implements GraphQLClient {
  private readonly client = generateClient();

  constructor(
    private readonly url: string,
    private readonly region: string,
    private readonly apiKey?: string,
  ) {
    if (!url) throw new Error('AppSync URL is not defined');

    Amplify.configure({
      API: {
        GraphQL: {
          endpoint: url,
          region,
          defaultAuthMode: 'apiKey',
          apiKey,
        },
      },
    });
  }

  async request<T, V = Record<string, unknown>>(
    body: GraphQLRequestBody<V>,
  ): Promise<T> {
    const result = (await this.client.graphql({
      query: body.query as any,
      variables: body.variables as Record<string, unknown> | undefined,
    })) as { data?: T; errors?: { message: string }[] };

    if (result.errors?.length) {
      throw new Error(result.errors.map(e => e.message).join(', '));
    }

    return result.data as T;
  }
}
