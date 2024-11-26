import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/Home';
import Routes from './src/routes';
import { ContatoProvider } from './src/contexts/contatoContext';

export type RootStackParamList = {
  Home: undefined;
  Screens: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ContatoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Screens" component={Routes} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContatoProvider>
  );
}
