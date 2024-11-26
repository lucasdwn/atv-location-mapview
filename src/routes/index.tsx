import React from 'react';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { ContatosScreen } from '../screens/Contatos';
import { LocationScreen } from '../screens/Location';
import { ContatoFormScreen } from '../screens/ContatosForm';
import { ParamListBase } from '@react-navigation/native';

const Drawer = createDrawerNavigator();
type DrawerNavigation = DrawerNavigationProp<ParamListBase>;

type Props = {
  navigation: DrawerNavigation;
  route: any; // Ajuste o tipo conforme necessário, dependendo de como você está manipulando as rotas
};


const Routes = () => {
  return (
    <Drawer.Navigator initialRouteName="Contatos">
      <Drawer.Screen name="Contatos" component={ContatosScreen} />
      <Drawer.Screen name="Location" component={LocationScreen} options={{
        drawerItemStyle: { display: 'none' }, // Ocultar no Drawer
      }} />
      <Drawer.Screen name="ContatosForm" component={ContatoFormScreen} options={{
        drawerItemStyle: { display: 'none' }, // Ocultar no Drawer
      }} />
    </Drawer.Navigator>
  );
};

export default Routes;
