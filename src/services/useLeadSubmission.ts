import { useCallback, useState } from "react";
import type { LeadFormData } from "./leadGateway";
import type { LeadGateway } from "./leadGateway";
import { GraphQLError } from "./graphqlClient";

export const useLeadSubmission = (
	leadGateway: LeadGateway,
	onSuccess?: () => void
) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [apiResponse, setApiResponse] = useState<any>(null);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);

	const submitLead = useCallback(
		async (lead: LeadFormData) => {
			setIsLoading(true);
			setError(null);
			setSuccess(false);
			setApiResponse(null);

			try {
				const response = await leadGateway.sendLead(lead);
				setApiResponse(response);
				setSuccess(true);
				setShowConfirmationModal(true);
				onSuccess?.();
			} catch (err) {
				console.error("Error sending lead data:", err);

				if (err instanceof GraphQLError) {
					setApiResponse(err.response);
					setError(
						"Debido a problemas del servidor no se pudo enviar el formulario. Por favor, inténtelo más tarde."
					);
				} else if (err instanceof Error) {
					if (
						err.message.includes("Network") ||
						err.message.includes("Failed to fetch")
					) {
						setError(
							"Error de conexión. Verifique su conexión a internet y vuelva a intentarlo."
						);
					} else {
						setError(
							"Debido a problemas del servidor no se pudo enviar el formulario. Por favor, inténtelo más tarde."
						);
					}
				} else {
					setError(
						"Debido a problemas del servidor no se pudo enviar el formulario. Por favor, inténtelo más tarde."
					);
				}
			} finally {
				setIsLoading(false);
			}
		},
		[leadGateway]
	);

	const handleError = useCallback(
		({ error: err }: { error: unknown; lead: LeadFormData }) => {
			console.error("Error sending lead data:", err);
			setError(
				"Debido a problemas del servidor no se pudo enviar el formulario. Por favor, inténtelo más tarde."
			);
		},
		[]
	);

	const clearError = useCallback(() => setError(null), []);

	const closeConfirmationModal = useCallback(() => {
		setShowConfirmationModal(false);
		setSuccess(false);
	}, []);

	const clearApiResponse = useCallback(() => setApiResponse(null), []);

	return {
		isLoading,
		error,
		success,
		apiResponse,
		showConfirmationModal,
		submitLead,
		handleError,
		clearError,
		closeConfirmationModal,
		clearApiResponse,
	};
};
