import { Helmet } from "@modern-js/runtime/head";
import { useState } from "react";
import Provider from "provider";
import StatusMessage from "../components/StatusMessage";
import DataPreview from "../components/DataPreview";
import { createAppSyncClient } from "../services/appSyncClient";
import { createLeadGateway } from "../services/leadGateway";
import { useLeadSubmission } from "../services/useLeadSubmission";
import "./index.css";

const appSyncUrl = process.env.APP_SYNC_URL ?? "";
const appSyncApiKey = process.env.APP_SYNC_API_KEY;
const appSyncClient = createAppSyncClient(appSyncUrl, appSyncApiKey);
const leadGateway = createLeadGateway(appSyncClient);

const Index = () => {
	const [formData, setFormData] = useState<Record<string, any>>({});
	const { isLoading, error, success, submitLead, handleError, clearError } =
		useLeadSubmission(leadGateway);

	const handleFormDataChange = (data: Record<string, any>) => {
		setFormData(data);
	};

	return (
		<>
			<Helmet>
				<link
					rel="icon"
					type="image/x-icon"
					href="https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/favicon.ico"
				/>
			</Helmet>

			<section className="form-section">
				<div className="container-box">
					<div className="form-intro">
						<h3>Herramienta de recolección de datos</h3>
						<p>
							Proporciona la información solicitada para procesar y gestionar
							tus datos de manera segura y eficiente
						</p>
					</div>

					<div className="form-container">
						<div className="form-content">
							{isLoading && (
								<StatusMessage
									variant="loading"
									message="Enviando información..."
								/>
							)}

							{error && (
								<StatusMessage
									variant="error"
									message={error}
									onClose={clearError}
								/>
							)}

							{success && (
								<StatusMessage
									variant="success"
									message="¡Información enviada correctamente!"
								/>
							)}

							<Provider
								onLeadSubmit={submitLead}
								onLeadError={handleError}
								onFormDataChange={handleFormDataChange}
							/>
						</div>

						<aside className="form-sidebar">
							<DataPreview data={formData} />
						</aside>
					</div>
				</div>
			</section>
		</>
	);
};

export default Index;
