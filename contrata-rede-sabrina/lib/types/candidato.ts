export interface Candidato {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    curriculo_url?: string;
    status: "pendente" | "aprovado" | "reprovado";
    criado_em: string;
}