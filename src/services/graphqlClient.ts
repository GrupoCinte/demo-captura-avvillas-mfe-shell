interface GraphQLRequestBody<V> {
  query: string;
  variables?: V;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

export interface GraphQLClient {
  request<T, V = Record<string, unknown>>(
    body: GraphQLRequestBody<V>,
    init?: RequestInit,
  ): Promise<T>;
}

export class AppSyncClient implements GraphQLClient {
  constructor(
    private readonly url: string,
    private readonly apiKey?: string,
  ) {
    if (!url) {
      throw new Error('AppSync URL is not defined');
    }
  }

  async request<T, V = Record<string, unknown>>(
    body: GraphQLRequestBody<V>,
    init?: RequestInit,
  ): Promise<T> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey ? { 'x-api-key': this.apiKey } : {}),
      },
      body: JSON.stringify(body),
      ...init,
    });

    if (!response.ok) {
      throw new Error(
        `Network error: ${response.status} ${response.statusText}`,
      );
    }

    const result = (await response.json()) as GraphQLResponse<T>;

    if (result.errors?.length) {
      throw new Error(result.errors.map(e => e.message).join(', '));
    }

    return result.data as T;
  }
}
