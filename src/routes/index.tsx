import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ContatosScreen from '../screens/Contatos';

const Drawer = createDrawerNavigator();

const Routes = () => {
  return (
    <Drawer.Navigator initialRouteName="Contatos">
      <Drawer.Screen name="Contatos" component={ContatosScreen} />
    </Drawer.Navigator>
  );
};

export default Routes;
