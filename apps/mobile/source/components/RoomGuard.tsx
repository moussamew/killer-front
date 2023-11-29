import {
  type Room,
  useRoom,
  useSession,
  ROOM_TOPIC,
} from '@killerparty/webservices';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import EventSource from 'react-native-sse';

import { ROOM_PAGE_NAME } from '../constants/routes';
import {
  type RootStackParamList,
  type StackNavigation,
} from '../types/navigation';

interface Props {
  children: JSX.Element;
  roomCode: string;
  currentRouteName: keyof RootStackParamList;
}

export function RoomGuard({
  children,
  roomCode,
  currentRouteName,
}: Props): JSX.Element {
  const { replace } = useNavigation<StackNavigation>();
  const { session, refetchSession } = useSession();
  const { room, refetchRoom } = useRoom(roomCode!);

  /**
   * Redirect player to the correct route related to the room status.
   */
  useEffect(
    function redirectPlayerToCorrectRoutePage() {
      if (room?.status && session) {
        const newRouteName = (
          session.room?.status ? ROOM_PAGE_NAME[session.room.status] : 'Home'
        ) as keyof RootStackParamList;

        if (newRouteName !== currentRouteName) {
          replace(newRouteName, { roomCode });
        }
      }
    },
    [session, currentRouteName, room, replace, roomCode],
  );

  /**
   * Listen to SSE events emits in the Room page.
   */
  useEffect(
    function listenEvents() {
      const roomEventSource = new EventSource(`${ROOM_TOPIC}/${roomCode}`);

      roomEventSource.addEventListener('message', (event) => {
        if (event.type === 'message' && event.data) {
          const roomInfos: Room = JSON.parse(event.data);

          const isPlayerInRoom = roomInfos.players.some(
            ({ id }) => id === session?.id,
          );

          if (isPlayerInRoom) {
            refetchRoom().then(refetchSession);
          } else {
            refetchSession();
          }
        }
      });

      return () => roomEventSource.close();
    },
    [roomCode, session?.id, refetchSession, refetchRoom],
  );

  return children;
}
