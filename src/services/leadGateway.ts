import type { GraphQLClient } from './graphqlClient';

export interface LeadFormData {
  idType: 'CC' | 'CE';
  idNumber: string;
  firstName: string;
  secondName?: string;
  firstLastName: string;
  secondLastName?: string;
  phone: string;
  email: string;
}

const CREATE_LEAD_MUTATION = `
  mutation CreateLead($input: LeadInput!) {
    createLead(input: $input) {
      id
    }
  }
`;

interface CreateLeadResponse {
  createLead: {
    id: string;
  };
}

export class LeadGateway {
  constructor(private readonly client: GraphQLClient) {}

  async sendLead(data: LeadFormData): Promise<void> {
    await this.client.request<CreateLeadResponse>({
      query: CREATE_LEAD_MUTATION,
      variables: { input: data },
    });
  }
}

export const createLeadGateway = (client: GraphQLClient): LeadGateway =>
  new LeadGateway(client);
