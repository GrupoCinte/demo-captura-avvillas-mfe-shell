declare module "provider" {
	import type { ForwardRefExoticComponent, RefAttributes } from "react";
	import type { LeadFormData } from "./services/leadGateway";

	export interface ProviderRef {
		resetForm: () => void;
	}

	export interface ProviderProps {
		onLeadSubmit: (lead: LeadFormData) => void | Promise<void>;
		onLeadError?: (args: { error: unknown; lead: LeadFormData }) => void;
		onFormDataChange?: (data: Record<string, unknown>) => void;
	}

	const Provider: ForwardRefExoticComponent<
		ProviderProps & RefAttributes<ProviderRef>
	>;
	export default Provider;
}
