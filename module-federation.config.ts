import { createModuleFederationConfig } from '@module-federation/modern-js';

const providerRemoteUrl = process.env.LEADFORM_REMOTE_URL ?? '';

export default createModuleFederationConfig({
  name: 'shell',
  remotes: {
    provider: `leadform@${providerRemoteUrl}`,
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
