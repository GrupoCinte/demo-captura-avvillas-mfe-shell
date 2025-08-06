import { appTools, defineConfig } from '@modern-js/app-tools';
import { moduleFederationPlugin } from '@module-federation/modern-js';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  source: {
    globalVars: {
      'process.env.APP_SYNC_URL': process.env.APP_SYNC_URL ?? '',
      'process.env.APP_SYNC_API_KEY': process.env.APP_SYNC_API_KEY ?? '',
    },
  },
  plugins: [
    appTools({
      bundler: 'rspack', // Set to 'webpack' to enable webpack
    }),
    moduleFederationPlugin(),
  ],
});
