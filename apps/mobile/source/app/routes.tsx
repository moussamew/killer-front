import { useTranslation } from '@killerparty/intl';
import { type Session } from '@killerparty/webservices';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROOM_PAGE_NAME } from '../constants/routes';
import { ChooseAvatar } from '../pages/ChooseAvatar';
import { ChoosePseudo } from '../pages/ChoosePseudo';
import { ChooseRoom } from '../pages/ChooseRoom';
import { HomePage } from '../pages/Home';
import { EndedRoomPage } from '../pages/Room/Ended';
import { PendingRoomPage } from '../pages/Room/Pending';
import { PlayingRoomPage } from '../pages/Room/Playing';
import { Rules } from '../pages/Rules';
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
        name="ChoosePseudo"
        component={ChoosePseudo}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="ChooseRoom"
        component={ChooseRoom}
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ChooseAvatar"
        component={ChooseAvatar}
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="PendingRoom"
        component={PendingRoomPage}
        options={{ headerShown: false }}
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
      <Stack.Screen
        name="Rules"
        component={Rules}
        options={{ headerShown: false, presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
