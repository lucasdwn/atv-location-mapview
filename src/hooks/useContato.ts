import { useContext } from 'react';
import { ContatoContext } from '../contexts/contatoContext';

export const useContatos = () => useContext(ContatoContext);
