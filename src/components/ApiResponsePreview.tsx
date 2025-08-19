import React from "react";

interface ApiResponsePreviewProps {
	response: any;
	isLoading?: boolean;
}

const ApiResponsePreview: React.FC<ApiResponsePreviewProps> = ({
	response,
	isLoading = false,
}) => {
	const hasResponse = response && Object.keys(response).length > 0;

	return (
		<div className="data-preview-container">
			<div className="data-preview-header">
				<h4>Respuesta de la API</h4>
				<div
					className={`status-indicator ${hasResponse ? "active" : "inactive"}`}>
					<span className="status-dot"></span>
					{isLoading
						? "Procesando..."
						: hasResponse
						? "Respuesta recibida"
						: "Sin respuesta"}
				</div>
			</div>

			<div className="json-preview">
				<div className="json-header">
					<span className="json-label">Response JSON</span>
					<button
						className="copy-button"
						onClick={() =>
							navigator.clipboard?.writeText(JSON.stringify(response, null, 2))
						}
						disabled={!hasResponse || isLoading}
						title="Copiar respuesta JSON">
						📋
					</button>
				</div>

				<pre className={`json-content ${!hasResponse ? "empty" : ""}`}>
					{isLoading ? (
						<span className="json-placeholder">
							{`{\n  "status": "waiting_for_response"\n}`}
						</span>
					) : hasResponse ? (
						<code>{JSON.stringify(response, null, 2)}</code>
					) : (
						<span className="json-placeholder">
							{`{\n  "message": "La respuesta aparecerá aquí después del envío"\n}`}
						</span>
					)}
				</pre>
			</div>

			{hasResponse && !isLoading && (
				<div className="data-stats">
					<div className="stat-item">
						<span className="stat-label">Estado:</span>
						<span className="stat-value">Éxito</span>
					</div>
					<div className="stat-item">
						<span className="stat-label">Tamaño:</span>
						<span className="stat-value">
							{JSON.stringify(response).length}B
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default ApiResponsePreview;
