import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';

type HomeScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Screens');
    }, 10000); 

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App!</Text>
      <Button 
        title="Iniciar"
        onPress={() => navigation.navigate('Screens')} 
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
