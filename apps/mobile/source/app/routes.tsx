import { useTranslation } from '@killerparty/intl';
import { type RoomStatus, useSession } from '@killerparty/webservices';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Text, View } from 'react-native';

import { CreateRoomPage } from '../pages/CreateRoom';
import { HomePage } from '../pages/Home';
import { JoinRoomPage } from '../pages/JoinRoom';
import { EndedRoomPage } from '../pages/Room/Ended';
import { PendingRoomPage } from '../pages/Room/Pending';
import { PlayingRoomPage } from '../pages/Room/Playing';

export type RootStackParamList = {
  Home: undefined;
  CreateRoom: undefined;
  JoinRoom: undefined;
  PendingRoom: { roomCode: string };
  PlayingRoom: { roomCode: string };
  EndedRoom: { roomCode: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
  roomCode: string;
  t: ReturnType<typeof useTranslation>['t'];
}

function GenerateRoomPageScreen({
  roomCode,
  t,
}: Props): Record<RoomStatus, JSX.Element> {
  return {
    PENDING: (
      <Stack.Screen
        name="PendingRoom"
        component={PendingRoomPage}
        options={{ title: 'Killer Party' }}
        initialParams={{ roomCode }}
      />
    ),
    IN_GAME: (
      <Stack.Screen
        name="PlayingRoom"
        component={PlayingRoomPage}
        options={{ title: t('room.playing.title') }}
        initialParams={{ roomCode }}
      />
    ),
    ENDED: (
      <Stack.Screen
        name="EndedRoom"
        component={EndedRoomPage}
        options={{ title: 'Killer Party' }}
        initialParams={{ roomCode }}
      />
    ),
  };
}

export function Routes(): JSX.Element {
  const { isLoading, session } = useSession();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <View>
        <Image source={require('../assets/splash.png')} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#fdf7f2' },
        headerBackTitleVisible: false,
      }}
    >
      {session?.room?.id ? (
        GenerateRoomPageScreen({ roomCode: session.room.id, t })[
          session.room.status
        ]
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{ title: t('home.title') }}
          />
          <Stack.Screen
            name="CreateRoom"
            component={CreateRoomPage}
            options={{ title: t('create.room.page.title') }}
          />
          <Stack.Screen
            name="JoinRoom"
            component={JoinRoomPage}
            options={{ title: t('home.join.room') }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
