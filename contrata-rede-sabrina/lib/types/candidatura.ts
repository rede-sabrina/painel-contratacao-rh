export type StatusCandidatura = 
| 'Pendente'
| 'Aprovado'
| 'Reprovado'
| 'Em analise';

export interface Candidatura{
    id: number;
    candidato_id: number;
    vaga_id: number;
    status: StatusCandidatura;
    criado_em: string;
}