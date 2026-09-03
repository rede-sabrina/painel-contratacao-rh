import {supabase} from '../supabase/client';
import {Vaga} from '../types/vaga';

//retorna todas as vagas cadastradas no banco
export async function getVagas(): Promise<Vaga[]>{
    const {data, error} = await supabase
        .from('vagas')
        .select('*')
        .order('criado_em', {ascending: false});

    if(error){
        console.error('Erro ao buscar vagas:', error);
        return [];
    }
    return data as Vaga[];
}
//busca uma vaga pelo id
export async function getVagaById(id: number): Promise<Vaga | null>{
    const{data, error} = await supabase
    .from('vagas')
    .select('*')
    .eq('id', id)
    .single();

    if(error){
        if(error.code === 'PGRST116'){
            return null;
        }
        console.error('Erro ao buscar vaga pelo ID.', error);
        return null;
    }
    return data as Vaga;
}
//cadastra uma nova vaga
export async function createVaga(vaga: Omit<Vaga, 'id' | 'criado_em'>): Promise<Vaga | null>{
console.log('Criação da vaga', vaga)
    const{data, error} = await supabase
    .from('vagas')
    .insert(vaga)
    .select()
    .single();

    if(error){
        console.error('Erro ao cadastrar vaga: ', error);
        return null;
    }
    return data as Vaga
}
//atualiza uma vaga
export async function updateVaga(id: number, vaga: Partial<Omit<Vaga, 'id' | 'criado_em'>>): Promise<Vaga | null>{
    const {data, error} = await supabase
    .from('vagas')
    .update(vaga)
    .eq('id', id)
    .single();

    if(error){
        console.error('Erro ao atualizar vaga: ', error);
        return null;
    }
    return data as Vaga;
}
//deleta uma vaga
export async function deleteVaga(id: number): Promise<void>{
    const {error} = await supabase
    .from('vagas')
    .delete()
    .eq('id', id);

    if(error){
        console.error('Erro ao deletar vaga: ', error);
        throw new Error('Erro ao deletar vaga');
    }
}