import {supabase} from '../supabase/client';
import {Candidatura} from '../types/candidatura';
//retorna todas as candidaturas
export async function getCandidaturas(): Promise<Candidatura[]>{
    const {data, error} = await supabase
    .from ('candidaturas')
    .select('*')
    .order('criado_em', {ascending: false});

    if(error){
        console.log('Erro ao buscar candidaturas', error);
        return [];
    }
    return data as Candidatura[];
}

//retorna uma candidatura pelo id
export async function geetCandidaturaById(id: number): Promise<Candidatura | null>{
    const {data, error} = await supabase
    .from('candidaturas')
    .select('*')
    .eq('id', id)
    .single();

    if(error){
        if(error.code === 'PGRST116'){
            return null;
        }
        console.error('Erro ao buscar candidatura pelo ID: ', error);
        return null;
    }
    return data as Candidatura;
}
//cria um novo registro de candidatura
export async function createCandidatura(candidatura: Omit<Candidatura, 'id' | 'criado_em'>): Promise<Candidatura | null>{
    console.log('cadastro de candidatura: ', candidatura);
    const {data, error} = await supabase
    .from('candidaturas')
    .insert(candidatura)
    .select()
    .single();

    if(error){
        console.error('Erro ao criar candidatura', error);
        return null;
    }
    return data as Candidatura;
}
//atualiza um registro de candidatura
export async function updateCandidatura(id: number, candidatura: Partial<Omit<Candidatura, 'id' | 'criado_em'>>): Promise<Candidatura | null>{
    const {data, error} = await supabase
    .from('candidaturas')
    .update(candidatura)
    .eq('id', id)
    .select()
    .single();

    if(error){
        console.error('Erro ao atualizar candidatura', error);
        return null;
    }
    return data as Candidatura;
}
//exclui candidatura
export async function deleteCandidatura(id: number): Promise<void>{
    const {error} = await supabase
    .from('candidaturas')
    .delete()
    .eq('id', id);

    if(error){
        console.error('Erro ao excluir candidatura', error);
        throw new Error('Erro ao excluir candidatura');
    }
}