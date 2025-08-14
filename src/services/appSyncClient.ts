import { AppSyncClient } from './graphqlClient';

export const createAppSyncClient = (
  url: string,
  apiKey: string | undefined,
  region: string,
) => new AppSyncClient(url, region, apiKey);
