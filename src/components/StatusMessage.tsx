import type { ReactNode } from 'react';

interface StatusMessageProps {
  variant: 'loading' | 'error' | 'success';
  message: ReactNode;
  onClose?: () => void;
}

const roleMap: Record<string, 'status' | 'alert'> = {
  loading: 'status',
  success: 'status',
  error: 'alert',
};

const ariaMap: Record<string, 'polite' | 'assertive'> = {
  loading: 'polite',
  success: 'polite',
  error: 'assertive',
};

const StatusMessage = ({ variant, message, onClose }: StatusMessageProps) => (
  <div
    className={`status-message ${variant}`}
    role={roleMap[variant]}
    aria-live={ariaMap[variant]}
  >
    {message}
    {onClose && (
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar mensaje de error"
      >
        ×
      </button>
    )}
  </div>
);

export default StatusMessage;
