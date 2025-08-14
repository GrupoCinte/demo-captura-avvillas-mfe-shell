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

interface CreatePersonaInput {
  aliado: string;
  identificacion: string;
  primerNombre?: string;
  segundoNombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  celular?: string;
  correoElectronico?: string;
  autorizacion?: boolean;
  fechaRegistro?: string;
}

const CREATE_PERSONA_MUTATION = `
  mutation createPersona($createpersonainput: CreatePersonaInput!) {
    createPersona(input: $createpersonainput) {
      aliado
      identificacion
      primerNombre
      segundoNombre
      primerApellido
      segundoApellido
      celular
      correoElectronico
      autorizacion
      fechaRegistro
    }
  }
`;

interface CreatePersonaResponse {
  createPersona: {
    aliado: string;
    identificacion: string;
    primerNombre?: string | null;
    segundoNombre?: string | null;
    primerApellido?: string | null;
    segundoApellido?: string | null;
    celular?: string | null;
    correoElectronico?: string | null;
    autorizacion?: boolean | null;
    fechaRegistro?: string | null;
  };
}

export class LeadGateway {
  constructor(
    private readonly client: GraphQLClient,
    private readonly allyId: string,
  ) {}

  async sendLead(data: LeadFormData): Promise<void> {
    const input: CreatePersonaInput = {
      aliado: this.allyId,
      identificacion: data.idNumber,
      primerNombre: data.firstName,
      segundoNombre: data.secondName,
      primerApellido: data.firstLastName,
      segundoApellido: data.secondLastName,
      celular: data.phone,
      correoElectronico: data.email,
      autorizacion: true,
      fechaRegistro: new Date().toISOString(),
    };

    await this.client.request<
      CreatePersonaResponse,
      { createpersonainput: CreatePersonaInput }
    >({
      query: CREATE_PERSONA_MUTATION,
      variables: { createpersonainput: input },
    });
  }
}

export const createLeadGateway = (
  client: GraphQLClient,
  allyId: string,
): LeadGateway => new LeadGateway(client, allyId);
