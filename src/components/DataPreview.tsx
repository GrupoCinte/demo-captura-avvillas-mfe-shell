import React from "react";

interface DataPreviewProps {
	data: Record<string, any>;
}

const DataPreview: React.FC<DataPreviewProps> = ({ data }) => {
	const hasData = Object.keys(data).length > 0;

	const formatJsonValue = (value: any): string => {
		if (value === null) return "null";
		if (value === undefined) return "undefined";
		if (typeof value === "string") return `"${value}"`;
		if (typeof value === "boolean") return value.toString();
		if (typeof value === "number") return value.toString();
		if (Array.isArray(value)) return JSON.stringify(value, null, 2);
		if (typeof value === "object") return JSON.stringify(value, null, 2);
		return String(value);
	};

	return (
		<div className="data-preview-container">
			<div className="data-preview-header">
				<h4>Vista previa de datos</h4>
				<div className={`status-indicator ${hasData ? "active" : "inactive"}`}>
					<span className="status-dot"></span>
					{hasData ? "Datos capturados" : "Sin datos"}
				</div>
			</div>

			<div className="json-preview">
				<div className="json-header">
					<span className="json-label">JSON</span>
					<button
						className="copy-button"
						onClick={() =>
							navigator.clipboard?.writeText(JSON.stringify(data, null, 2))
						}
						disabled={!hasData}
						title="Copiar JSON">
						📋
					</button>
				</div>

				<pre className={`json-content ${!hasData ? "empty" : ""}`}>
					{hasData ? (
						<code>
							{`{\n`}
							{Object.entries(data).map(([key, value], index, array) => (
								<span
									key={key}
									className="json-line">
									<span className="json-key"> "{key}"</span>
									<span className="json-colon">: </span>
									<span className="json-value">{formatJsonValue(value)}</span>
									{index < array.length - 1 && (
										<span className="json-comma">,</span>
									)}
									{"\n"}
								</span>
							))}
							{`}`}
						</code>
					) : (
						<span className="json-placeholder">
							{`{\n  // Los datos aparecerán aquí\n  // mientras completas el formulario\n}`}
						</span>
					)}
				</pre>
			</div>

			{hasData && (
				<div className="data-stats">
					<div className="stat-item">
						<span className="stat-label">Campos:</span>
						<span className="stat-value">{Object.keys(data).length}</span>
					</div>
					<div className="stat-item">
						<span className="stat-label">Tamaño:</span>
						<span className="stat-value">{JSON.stringify(data).length}B</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default DataPreview;
