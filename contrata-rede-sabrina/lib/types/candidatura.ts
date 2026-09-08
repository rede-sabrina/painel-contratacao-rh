export type StatusCandidatura = 
| 'pendente'
| 'aprovado'
| 'reprovado'
| 'em_analise';

export interface Candidatura{
    id: number;
    candidato_id: number;
    vaga_id: number;
    status: StatusCandidatura;
    criado_em: string;
}