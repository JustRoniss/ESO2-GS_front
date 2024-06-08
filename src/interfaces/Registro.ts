import { Ong } from "./Ong";

export interface Registro {
  id: number;
  nomePessoa: string;
  cpf: string;
  dataReport: string;
  dataFinalizado?: string;
  statusPendente: boolean;
  descricao: string;
  praia: {
    nome: string;
    cidade: string;
    estado: string;
  };
  ong: Ong | null;
}