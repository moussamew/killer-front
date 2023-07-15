import { t } from '@killerparty/intl';
import { useSession } from '@killerparty/webservices';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

import { CreateRoomPage } from '../pages/CreateRoom';
import { HomePage } from '../pages/Home';
import { PendingRoomPage } from '../pages/Room';

export type RootStackParamList = {
  Home: undefined;
  CreateRoom: undefined;
  Room: { roomCode: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes(): JSX.Element {
  const { isLoading, session } = useSession();

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#fdf7f2' },
      }}
    >
      {session?.room?.id ? (
        <Stack.Screen
          name="Room"
          component={PendingRoomPage}
          options={{ title: t('room.welcome.title') }}
          initialParams={{ roomCode: session.room.id }}
        />
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
}
