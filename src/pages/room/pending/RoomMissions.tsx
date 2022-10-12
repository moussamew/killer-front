import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PROD_ENV } from '@/constants/app';
import { ROOM_TOPIC } from '@/constants/endpoints';
import t from '@/helpers/translate';
import { useRoomMissions } from '@/services/room/queries';

export function RoomMissions(): JSX.Element {
  const { roomCode } = useParams();
  const { roomMissions, refetchRoomMissions } = useRoomMissions();

  useEffect(() => {
    const missionsEventSource = new EventSource(
      `${ROOM_TOPIC}/${roomCode}/mission/{id}`,
      { withCredentials: PROD_ENV },
    );

    missionsEventSource.addEventListener('message', refetchRoomMissions);

    return () => missionsEventSource.close();
  }, [roomCode, refetchRoomMissions]);

  return (
    <div>
      <p>{t('room.missions_in_room', { missionsCount: roomMissions })}</p>
    </div>
  );
}
