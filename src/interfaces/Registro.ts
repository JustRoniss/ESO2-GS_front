import { Praia } from "./Praia";

export interface Registro {
    id: number;
    nomePessoa: String;
    cpf: String;
    statusPendente: boolean;
    descricao: String;

    praia: Praia


}