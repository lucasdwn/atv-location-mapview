import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useContatos } from '../../hooks/useContato';
import { RootStackParamList } from '../../types';
import { deleteContato } from '../../services/contatoService';

type ContatosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Contatos'>;

interface Props {
    navigation: ContatosScreenNavigationProp;
}

export const ContatosScreen: React.FC<Props> = ({ navigation }) => {
    const { contatos, loadContatos } = useContatos();

    useFocusEffect(
        useCallback(() => {
            loadContatos(); // Atualiza a lista de contatos quando a tela ganhar o foco
        }, [])
    );


    const HandleDelete = async (id: string) => {
        console.log(id)
        try {
            await deleteContato(id);
            loadContatos();
        }
        catch (error: any) {
            alert(error)
        }

    }


    return (
        <View style={styles.container}>
            <FlatList
                data={contatos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.contactCard}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Location', { contato: item })} // Navega para a tela 'Location' passando o contato
                        >
                            <Text style={styles.contactName}>{item.name}</Text>
                            <Text style={styles.contactAddress}>{item.address}</Text>
                            <TouchableOpacity style={styles.removeButton} onPress={() => HandleDelete(item.id)}>
                                <Ionicons name="trash" size={16} color="white" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('ContatosForm')}
            >
                <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    contactCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    contactName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    contactAddress: {
        fontSize: 14,
        color: '#555',
    },
    addButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#4CAF50',
        borderRadius: 30,
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    removeButton: {
        position: 'absolute',
        top: 14,
        right: 14,
        backgroundColor: '#fa0009',
        borderRadius: 30,
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    }
});
