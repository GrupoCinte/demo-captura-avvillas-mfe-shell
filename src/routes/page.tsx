import { Helmet } from "@modern-js/runtime/head";
import { useState, useRef } from "react";
import Provider, { type ProviderRef } from "provider";
import StatusMessage from "../components/StatusMessage";
import DataPreview from "../components/DataPreview";
import ApiResponsePreview from "../components/ApiResponsePreview";
import ConfirmationModal from "../components/ConfirmationModal";
import ErrorModal from "../components/ErrorModal";
import { createAppSyncClient } from "../services/appSyncClient";
import { createLeadGateway } from "../services/leadGateway";
import { useLeadSubmission } from "../services/useLeadSubmission";
import "./index.css";

const appSyncUrl = process.env.APP_SYNC_URL ?? "";
const appSyncApiKey = process.env.APP_SYNC_API_KEY;
const appSyncRegion = process.env.APP_SYNC_REGION ?? "us-east-1";
const allyId = process.env.ALLY_ID ?? "";
const appSyncClient = createAppSyncClient(
	appSyncUrl,
	appSyncApiKey,
	appSyncRegion
);
const leadGateway = createLeadGateway(appSyncClient, allyId);

const Index = () => {
	const [formData, setFormData] = useState<Record<string, any>>({});
	const providerRef = useRef<ProviderRef>(null);

	const handleSuccess = () => {
		if (providerRef.current) {
			providerRef.current.resetForm();
		}
	};

	const {
		isLoading,
		error,
		success,
		apiResponse,
		showConfirmationModal,
		showErrorModal,
		errorType,
		submitLead,
		handleError,
		clearError,
		closeConfirmationModal,
		closeErrorModal,
		clearApiResponse,
	} = useLeadSubmission(leadGateway, handleSuccess);

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
								ref={providerRef}
								onLeadSubmit={submitLead}
								onLeadError={handleError}
								onFormDataChange={handleFormDataChange}
							/>
						</div>

						<aside className="form-sidebar">
							<div className="sidebar-content">
								<DataPreview data={formData} />
								<ApiResponsePreview
									response={apiResponse}
									isLoading={isLoading}
								/>
							</div>
						</aside>
					</div>
				</div>
			</section>

			<ConfirmationModal
				isOpen={showConfirmationModal}
				onClose={closeConfirmationModal}
				title="¡Envío exitoso!"
				message="Los datos han sido enviados correctamente al servidor. Puede ver la respuesta en el panel lateral."
			/>

			<ErrorModal
				isOpen={showErrorModal}
				onClose={closeErrorModal}
				message={error || ""}
				errorType={errorType}
			/>
		</>
	);
};

export default Index;
