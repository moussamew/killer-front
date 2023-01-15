import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PROD_ENV } from '@/constants/app';
import { ROOM_TOPIC } from '@/constants/endpoints';
import t from '@/helpers/translate';
import { useRoom } from '@/services/room/queries';

export function RoomMissions(): JSX.Element {
  const { roomCode } = useParams();
  const { room, refetchRoom } = useRoom(roomCode!);

  useEffect(() => {
    const missionsEventSource = new EventSource(
      `${ROOM_TOPIC}/${roomCode}/mission/{id}`,
      { withCredentials: PROD_ENV },
    );

    missionsEventSource.addEventListener('message', refetchRoom);

    return () => missionsEventSource.close();
  }, [roomCode, refetchRoom]);

  return (
    <div>
      <p>
        {t('room.missions_in_room', { missionsCount: room?.missions.length })}
      </p>
    </div>
  );
}
