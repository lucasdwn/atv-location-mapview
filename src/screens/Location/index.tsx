import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

// Defina o tipo de navegação para a tela
type LocationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Location'>;
type LocationScreenRouteProp = RouteProp<RootStackParamList, 'Location'>;

interface Props {
    navigation: LocationScreenNavigationProp;
    route: LocationScreenRouteProp;
}

export const LocationScreen: React.FC<Props> = ({ navigation, route }) => {
    const { contato } = route.params;
    const [userLocation, setUserLocation] = useState<Location.LocationObjectCoords | null>(null);;

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
            >
                <Marker
                    coordinate={{ latitude: contato.latitude, longitude: contato.longitude }}
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
