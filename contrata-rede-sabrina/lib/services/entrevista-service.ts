import {supabase} from '../supabase/client';
import {Entrevista} from '../types/entrevista';

//retorna todas as entrevistas
export async function getEntrevistas(): Promise<Entrevista[]>{
    const {data, error} = await supabase
    .from('entrevistas')
    .select('*')
    .order('data_hora', {ascending: false});

    if(error){
        console.error('Erro ao buscar entrevistas no banco: ', error)
        return[]
    }
    return data as Entrevista[];
}

//retorna uma entrevista pelo ID
export async function getEntrevistaById(id: number): Promise<Entrevista | null>{
    const {data, error} = await supabase
    .from('entrevistas')
    .select('*')
    .eq('id', id)
    .single();

    if (error){
        if(error.code === 'PGRST116'){
            return null;
        }   
        console.error('Erro ao buscar entrevista no banco: ', error);
        return null;
    }
    return data as Entrevista;
}

//cria uma nova entrevista
export async function createEntrevista(entrevista: Omit<Entrevista, 'id'>): Promise<Entrevista | null>{
    console.log('Criação de entrevista: ', entrevista);
    const {data, error} = await supabase
    .from('entrevistas')
    .insert(entrevista)
    .single();
    
    if (error){
        console.error('Erro ao criar entrevista no banco: ', error);
        return null;
    }
    return data as Entrevista;
}
//atualiza entrevista
export async function updateEntrevista(id: number, entrevista: Partial<Omit<Entrevista, 'id'>>): Promise<Entrevista | null>{
    const {data, error} = await supabase
    .from('entrevistas')
    .update(entrevista)
    .eq('id', id)
    .select()
    .single();

    if (error){
        console.error('Erro ao atualizar entrevista no banco: ', error);
        return null;
    }
    return data as Entrevista;
}
//deleta uma entrevista
export async function deleteEntrevista(id: number): Promise<void>{
    const {error} = await supabase
    .from('entrevistas')
    .delete()
    .eq('id', id);
    
    if (error){
        console.error('Erro ao deletar entrevista no banco: ', error);
        throw new Error('Erro ao deletar entrevista no banco');
    }
}