import { AppSyncClient } from './graphqlClient';

export const createAppSyncClient = (url: string, apiKey?: string) =>
  new AppSyncClient(url, apiKey);
