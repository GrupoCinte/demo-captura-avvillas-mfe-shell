import React from "react";

interface ConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	message?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	isOpen,
	onClose,
	title = "¡Envío exitoso!",
	message = "Los datos han sido enviados correctamente al servidor.",
}) => {
	if (!isOpen) return null;

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="enhanced-modal-backdrop"
			onClick={handleBackdropClick}>
			<div className="enhanced-modal-content success-modal">
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
					<div className="success-icon-container">
						<div className="success-checkmark">
							<svg viewBox="0 0 24 24" className="success-icon-svg">
								<path
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									fill="none"
								/>
							</svg>
						</div>
						<div className="success-animation">
							<div className="success-ripple"></div>
							<div className="success-ripple"></div>
							<div className="success-ripple"></div>
						</div>
					</div>
					<h3 className="enhanced-modal-title success-title">{title}</h3>
				</div>

				<div className="enhanced-modal-body">
					<p className="success-message">{message}</p>
					<div className="success-details">
						<div className="success-detail-item">
							<svg viewBox="0 0 16 16" className="detail-icon">
								<path d="M8 0C3.58 0 0 3.58 0 8c0 4.42 3.58 8 8 8 4.42 0 8-3.58 8-8 0-4.42-3.58-8-8-8zm3.707 6.707l-4 4a.997.997 0 01-1.414 0l-2-2a.999.999 0 111.414-1.414L7 8.586l3.293-3.293a.999.999 0 111.414 1.414z" fill="currentColor"/>
							</svg>
							<span>Datos procesados correctamente</span>
						</div>
						<div className="success-detail-item">
							<svg viewBox="0 0 16 16" className="detail-icon">
								<path d="M8 0C3.58 0 0 3.58 0 8c0 4.42 3.58 8 8 8 4.42 0 8-3.58 8-8 0-4.42-3.58-8-8-8zm3.707 6.707l-4 4a.997.997 0 01-1.414 0l-2-2a.999.999 0 111.414-1.414L7 8.586l3.293-3.293a.999.999 0 111.414 1.414z" fill="currentColor"/>
							</svg>
							<span>Información almacenada de forma segura</span>
						</div>
					</div>
				</div>

				<div className="enhanced-modal-footer">
					<button
						className="enhanced-btn enhanced-btn-success"
						onClick={onClose}>
						<svg viewBox="0 0 20 20" className="btn-icon">
							<path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fill="currentColor"/>
						</svg>
						<span>Continuar</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
