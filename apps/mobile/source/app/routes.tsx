import { useTranslation } from '@killerparty/intl';
import { type Session } from '@killerparty/webservices';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROOM_PAGE_NAME } from '../constants/routes';
import { CreateRoomPage } from '../pages/CreateRoom';
import { HomePage } from '../pages/Home';
import { JoinRoomPage } from '../pages/JoinRoom';
import { EndedRoomPage } from '../pages/Room/Ended';
import { PendingRoomPage } from '../pages/Room/Pending';
import { PlayingRoomPage } from '../pages/Room/Playing';
import { type RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
  session: Session | null;
}

export function Routes({ session }: Props): JSX.Element {
  const { t } = useTranslation();

  const currentRouteName = (
    session?.room?.status ? ROOM_PAGE_NAME[session.room.status] : 'Home'
  ) as keyof RootStackParamList;

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: '#fdf7f2' },
        contentStyle: { backgroundColor: '#fdf7f2' },
      }}
      initialRouteName={currentRouteName}
    >
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false }}
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
      <Stack.Screen
        name="PendingRoom"
        component={PendingRoomPage}
        options={{ title: 'Killer Party' }}
        initialParams={{ roomCode: session?.room?.id }}
      />
      <Stack.Screen
        name="PlayingRoom"
        component={PlayingRoomPage}
        options={{ title: t('room.playing.title') }}
        initialParams={{ roomCode: session?.room?.id }}
      />
      <Stack.Screen
        name="EndedRoom"
        component={EndedRoomPage}
        options={{ title: 'Killer Party' }}
        initialParams={{ roomCode: session?.room?.id }}
      />
    </Stack.Navigator>
  );
}
