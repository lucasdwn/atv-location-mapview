import { IContato } from '../interfaces/IContato';
import api from './api';

export const getContatos = async () => {
    const response = await api.get('/');
    return response.data;
};

export const addContato = async (contact: Omit<IContato, 'id'>) => {
    const response = await api.post('/', contact);
    return response.data;
};

export const editContato = async (contact: IContato) => {
    const response = await api.put("/", contact)
    return response.data
}

export const deleteContato = async (id: string) => {
    const response = await api.delete(`/?id=${id}`)
    return response.data
}
