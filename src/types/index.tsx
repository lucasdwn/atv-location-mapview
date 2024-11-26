import { ParamListBase } from '@react-navigation/native';
import { IContato } from '../interfaces/IContato';
export interface RootStackParamList extends ParamListBase {
    Contatos: undefined;
    ContatosForm: undefined;
    Location: { contato: IContato };
}