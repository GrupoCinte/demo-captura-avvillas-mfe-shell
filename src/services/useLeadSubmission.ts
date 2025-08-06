import { useCallback, useState } from 'react';
import type { LeadFormData } from './leadGateway';
import type { LeadGateway } from './leadGateway';

export const useLeadSubmission = (leadGateway: LeadGateway) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitLead = useCallback(
    async (lead: LeadFormData) => {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      try {
        await leadGateway.sendLead(lead);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setError('Error al enviar los datos. Por favor, inténtelo de nuevo.');
        console.error('Error sending lead data:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [leadGateway],
  );

  const handleError = useCallback(
    ({ error: err }: { error: unknown; lead: LeadFormData }) => {
      setError('Error al enviar los datos. Por favor, inténtelo de nuevo.');
      console.error('Error sending lead data:', err);
    },
    [],
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    isLoading,
    error,
    success,
    submitLead,
    handleError,
    clearError,
  };
};
