import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { PROD_ENV } from '@/constants/app';
import { ROOM_TOPIC } from '@/constants/endpoints';
import t from '@/helpers/translate';

import { getRoomMissions } from './services/requests';

const RoomMissions = (): JSX.Element => {
  const { roomCode } = useParams();

  const { data: roomMissions, refetch: refetchRoomMissions } = useQuery(
    'roomMissions',
    () => getRoomMissions(),
  );

  useEffect(() => {
    const missionsEventSource = new EventSource(
      `${ROOM_TOPIC}/${roomCode}/mission/{id}`,
      { withCredentials: PROD_ENV },
    );

    missionsEventSource.addEventListener('message', async (): Promise<void> => {
      await refetchRoomMissions();
    });

    return () => missionsEventSource.close();
  }, [roomCode, refetchRoomMissions]);

  return (
    <div>
      <p>{t('room.missions_in_room', { missionsCount: roomMissions })}</p>
    </div>
  );
};

export default RoomMissions;
