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
			className="modal-backdrop"
			onClick={handleBackdropClick}>
			<div className="modal-content confirmation-modal">
				<div className="modal-header">
					<div className="success-icon">✅</div>
					<h3>{title}</h3>
					<button
						className="modal-close-button"
						onClick={onClose}
						aria-label="Cerrar modal">
						×
					</button>
				</div>

				<div className="modal-body">
					<p>{message}</p>
				</div>

				<div className="modal-footer">
					<button
						className="btn btn-primary"
						onClick={onClose}>
						Continuar
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
