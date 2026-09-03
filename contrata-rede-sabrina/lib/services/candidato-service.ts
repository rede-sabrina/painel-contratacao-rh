import {supabase} from '../supabase/client';
import { Candidato } from '../types/candidato';

//retorna todos os candidatos cadastrados no banco
export async function getCandidatos(): Promise<Candidato[]>{
    const {data, error} = await supabase
        .from('candidatos')
        .select('*')
        .order('criado_em', {ascending: false});
    
        if(error){
            console.error('Erro ao buscar candidatos:', error);
            return [];
        }
        return data as Candidato[];
}
//retorna um candidato pelo ID
export async function getCandidatoById(id: number): Promise<Candidato | null>{
    const {data, error} = await supabase
        .from('candidatos')
        .select('*')
        .eq('id', id)
        .single();

        if(error){
            if(error.code === 'PGRST116'){
                return null;
            }
            console.error('Erro ao buscar candidato pelo ID.', error);
            return null;
        }
        return data as Candidato;
}
//cria um novo candidato no banco
export async function createCandidato(candidato: Omit<Candidato, 'id' | 'criado_em'>): Promise<Candidato | null>{
    console.log('Criação de candidato:', candidato);
    const{data, error} = await supabase
    .from('candidatos')
    .insert(candidato)
    .select()
    .single();

    if(error){
        console.error('Erro ao cadastrar candidato: ', error);
        return null;
    }
    return data as Candidato;
}
//atualiza um candidato no banco
export async function updateCandidato(id: number, candidato: Partial<Omit<Candidato, 'id' | 'criado_em'>>): Promise<Candidato | null>{
    const {data, error} = await supabase
    .from('candidatos')
    .update(candidato)
    .eq('id', id)
    .select()
    .single();

    if(error){
        console.error('Erro ao atualizar candidato: ', error);
        return null;
    }
    return data as Candidato;
}
//deleta um candidato do banco
export async function deleteCandidato(id: number): Promise<void>{
    const{error} = await supabase
    .from('candidatos')
    .delete()
    .eq('id', id);

    if(error){
        console.error('Erro ao deletar candidato: ', error);
        throw new Error('Erro ao deletar candidato');
    }
}
