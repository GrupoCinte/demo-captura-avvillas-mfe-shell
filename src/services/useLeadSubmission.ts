import { useCallback, useState } from "react";
import type { LeadFormData } from "./leadGateway";
import type { LeadGateway } from "./leadGateway";
import { GraphQLError, type GraphQLResponse } from "./graphqlClient";

const isDuplicatePersonError = (response: GraphQLResponse): boolean => {
	if (!response.errors) return false;

	return response.errors.some(error =>
		error.errorType === "DynamoDB:ConditionalCheckFailedException" ||
		error.message.includes("conditional request failed")
	);
};

export const useLeadSubmission = (
	leadGateway: LeadGateway,
	onSuccess?: () => void
) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [apiResponse, setApiResponse] = useState<any>(null);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [errorType, setErrorType] = useState<"validation" | "network" | "server">("server");

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

					if (isDuplicatePersonError(err.response)) {
						setErrorType("validation");
						setError(
							"Esta persona ya está registrada en el sistema. Por favor, verifique los datos de identificación e intente con información diferente."
						);
						setShowErrorModal(true);
					} else {
						setErrorType("server");
						setError(
							"Debido a problemas del servidor no se pudo enviar el formulario. Por favor, inténtelo más tarde."
						);
					}
				} else if (err instanceof Error) {
					if (
						err.message.includes("Network") ||
						err.message.includes("Failed to fetch")
					) {
						setErrorType("network");
						setError(
							"Error de conexión. Verifique su conexión a internet y vuelva a intentarlo."
						);
					} else {
						setErrorType("server");
						setError(
							"Debido a problemas del servidor no se pudo enviar el formulario. Por favor, inténtelo más tarde."
						);
					}
				} else {
					setErrorType("server");
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

			if (err instanceof GraphQLError && isDuplicatePersonError(err.response)) {
				setApiResponse(err.response);
				setErrorType("validation");
				setError(
					"Esta persona ya está registrada en el sistema. Por favor, verifique los datos de identificación e intente con información diferente."
				);
				setShowErrorModal(true);
			} else {
				setErrorType("server");
				setError(
					"Debido a problemas del servidor no se pudo enviar el formulario. Por favor, inténtelo más tarde."
				);
			}
		},
		[]
	);

	const clearError = useCallback(() => setError(null), []);

	const closeConfirmationModal = useCallback(() => {
		setShowConfirmationModal(false);
		setSuccess(false);
	}, []);

	const closeErrorModal = useCallback(() => {
		setShowErrorModal(false);
		setError(null);
	}, []);

	const clearApiResponse = useCallback(() => setApiResponse(null), []);

	return {
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
	};
};
