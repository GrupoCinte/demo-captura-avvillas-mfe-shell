import React from "react";

interface ErrorModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	message: string;
	errorType?: "validation" | "network" | "server";
}

const ErrorModal: React.FC<ErrorModalProps> = ({
	isOpen,
	onClose,
	title,
	message,
	errorType = "server",
}) => {
	if (!isOpen) return null;

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const getErrorDetails = () => {
		switch (errorType) {
			case "validation":
				return {
					icon: (
						<div className="error-icon-container validation-icon">
							<svg viewBox="0 0 24 24" className="error-icon-svg">
								<path
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									fill="none"
								/>
							</svg>
						</div>
					),
					colorClass: "validation-error",
					defaultTitle: "Error de Validación"
				};
			case "network":
				return {
					icon: (
						<div className="error-icon-container network-icon">
							<svg viewBox="0 0 24 24" className="error-icon-svg">
								<path
									d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
									fill="currentColor"
								/>
								<path
									d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
									stroke="currentColor"
									strokeWidth="2"
									fill="none"
								/>
								<circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
							</svg>
						</div>
					),
					colorClass: "network-error",
					defaultTitle: "Error de Conexión"
				};
			default:
				return {
					icon: (
						<div className="error-icon-container server-icon">
							<svg viewBox="0 0 24 24" className="error-icon-svg">
								<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
								<line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" />
								<line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" />
							</svg>
						</div>
					),
					colorClass: "server-error",
					defaultTitle: "Error del Servidor"
				};
		}
	};

	const errorDetails = getErrorDetails();

	return (
		<div
			className="enhanced-modal-backdrop"
			onClick={handleBackdropClick}>
			<div className={`enhanced-modal-content error-modal ${errorDetails.colorClass}`}>
				<button
					className="enhanced-modal-close"
					onClick={onClose}
					aria-label="Cerrar modal">
					<svg viewBox="0 0 24 24" className="close-icon">
						<line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
						<line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
					</svg>
				</button>

				<div className="enhanced-modal-header">
					{errorDetails.icon}
					<h3 className="enhanced-modal-title">{title || errorDetails.defaultTitle}</h3>
				</div>

				<div className="enhanced-modal-body">
					<p className="error-message">{message}</p>
				</div>

				<div className="enhanced-modal-footer">
					<button
						className="enhanced-btn enhanced-btn-error"
						onClick={onClose}>
						<span>Entendido</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ErrorModal;
