declare module 'provider' {
    import type { FC } from 'react';
    import type { LeadFormData } from './services/leadGateway';

    export interface ProviderProps {
      onLeadSubmit: (lead: LeadFormData) => void | Promise<void>;
      onLeadError?: (args: { error: unknown; lead: LeadFormData }) => void;
      onFormDataChange?: (data: Record<string, unknown>) => void;
    }

    const Provider: FC<ProviderProps>;
    export default Provider;
  }
