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
