import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { IContato } from '../../interfaces/IContato';
import { editContato } from '../../services/contatoService';

// Defina o tipo de navegação para a tela
type LocationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Location'>;
type LocationScreenRouteProp = RouteProp<RootStackParamList, 'Location'>;

interface Props {
  navigation: LocationScreenNavigationProp;
  route: LocationScreenRouteProp;
}

export const LocationScreen:React.FC<Props> =({ navigation, route }) => {
  const { contato } = route.params;
  const [userLocation, setUserLocation] =  useState<Location.LocationObjectCoords | null>(null);
  const [contactLocation, setContactLocation] = useState({
    latitude: contato.latitude,
    longitude: contato.longitude,
  }); 

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da permissão de localização para exibir o mapa.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  const handleMapPress = async (event: MapPressEvent) => {

    const { latitude, longitude } = event.nativeEvent.coordinate;

    try {
      const location = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (location.length > 0) {
        const { street, name, city, region, postalCode, country } = location[0];
        const fullAddress = `${street ?? ''} ${name ?? ''}, ${city ?? ''} - ${region ?? ''}, ${postalCode ?? ''}, ${country ?? ''}`;

        const contatoSelecionado:IContato = {
          id: contato.id,
          name: contato.name,
          latitude,
          longitude,
          address: fullAddress
        }

        Alert.alert(
          'Editar localização',
          'Deseja editar o local?',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Editar', onPress: () => {
              // Atualiza o contato no servidor
              editContato(contatoSelecionado);
              // Atualiza a localização do contato no mapa
              setContactLocation({
                latitude,
                longitude,
              });
            } }
          ],
          { cancelable: true }
        );
      } 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter o endereço do local selecionado.');
      console.error('Geocoding error:', error);
    }
  };

  

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: contato.latitude,
          longitude: contato.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        <Marker
          coordinate={contactLocation}
          title={contato.name}
        />
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Você está aqui"
            pinColor="blue"
          />
        )}
      </MapView>
    </View>
  );
};
