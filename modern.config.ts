import { appTools, defineConfig } from '@modern-js/app-tools';
import { moduleFederationPlugin } from '@module-federation/modern-js';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  source: {
    mainEntryName: 'index',
    globalVars: {
      'process.env.APP_SYNC_URL': process.env.APP_SYNC_URL ?? '',
      'process.env.APP_SYNC_API_KEY': process.env.APP_SYNC_API_KEY ?? '',
      'process.env.APP_SYNC_REGION': process.env.APP_SYNC_REGION ?? '',
      'process.env.ALLY_ID': process.env.ALLY_ID ?? '',
    },
  },
  html: { outputStructure: 'flat' },
  output: { distPath: { html: '' } },
  plugins: [
    appTools({
      bundler: 'rspack', // Set to 'webpack' to enable webpack
    }),
    moduleFederationPlugin(),
  ],
});
