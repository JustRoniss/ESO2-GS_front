export interface Registro {
    id: number;
    nomePessoa: string;
    cpf: string;
    dataReport: string;
    dataFinalizado?: string;
    statusPendente: boolean;
    descricao: string;
    praia: {
      id: number;
      nome: string;
      cidade: string;
      estado: string;
    };
    ong?: {
      id: number;
      nome: string;
    };
  }
  