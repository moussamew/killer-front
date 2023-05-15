import { t } from '@killerparty/intl';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CreateRoomPage } from '../pages/CreateRoom';
import { HomePage } from '../pages/Home';

export type RootStackParamList = {
  Home: undefined;
  CreateRoom: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes(): JSX.Element {
  return (
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
        options={{ title: t('create.room.page.title') }}
      />
    </Stack.Navigator>
  );
}
