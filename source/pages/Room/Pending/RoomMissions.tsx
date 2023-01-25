import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PROD_ENV } from '@/constants/app';
import { ROOM_TOPIC } from '@/constants/endpoints';
import { useTranslation } from '@/hooks/useTranslation';
import { useRoom } from '@/services/room/queries';

export function RoomMissions(): JSX.Element {
  const { roomCode } = useParams();
  const { t } = useTranslation();
  const { room, refetchRoom } = useRoom(roomCode!);

  useEffect(() => {
    const missionsEventSource = new EventSource(
      `${ROOM_TOPIC}/${roomCode}/mission/{id}`,
      { withCredentials: PROD_ENV },
    );

    missionsEventSource.addEventListener('message', refetchRoom);

    return () => missionsEventSource.close();
  }, [roomCode, refetchRoom]);

  const roomMissions = room?.missions.length;

  return (
    <div>
      {Boolean(roomMissions) && (
        <p>{t('room.missions.count', { missions: roomMissions })}</p>
      )}
    </div>
  );
}
