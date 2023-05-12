import { setupIntl } from '@killerparty/intl';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { CreateRoomPage } from './pages/CreateRoom';
import { HomePage } from './pages/Home';

import 'intl-pluralrules';

setupIntl('fr-FR');

export type RootStackParamList = {
  Home: undefined;
  CreateRoom: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#fdf7f2' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: 'KILLER PARTY' }}
        />
        <Stack.Screen
          name="CreateRoom"
          component={CreateRoomPage}
          options={{ title: 'Create new room' }}
        />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
