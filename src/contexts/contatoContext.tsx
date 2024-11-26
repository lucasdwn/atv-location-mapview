import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { IContato } from '../interfaces/IContato';
import { getContatos } from '../services/contatoService';

interface ContatoContextData {
    contatos: IContato[];
    loadContatos: () => Promise<void>;
}

export const ContatoContext = createContext<ContatoContextData>({} as ContatoContextData);

export const ContatoProvider = ({ children }: { children: ReactNode }) => {
    const [contatos, setContatos] = useState<IContato[]>([]);

    const loadContatos = async () => {
        const data = await getContatos();
        setContatos(data);
    };

    useEffect(() => {
        loadContatos();
    }, []);

    return (
        <ContatoContext.Provider value={{ contatos, loadContatos }}>
            {children}
        </ContatoContext.Provider>
    );
};
