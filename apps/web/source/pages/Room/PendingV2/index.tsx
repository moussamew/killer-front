import { useParams } from 'react-router-dom';

import { useIsSmallDesktop } from '@/hooks/useWindowSize';
import { useRoom } from '@/services/room/queries';

import { LaunchGameButton } from './LaunchGameButton';
import { MissionProgress } from './MissionsProgress';
import PlayerList from './PlayerList';
import { RoomMissions } from './RoomMissions';
import ShareRoomButton from './ShareRoomButton';

export function PendingRoomPageV2() {
  const { roomCode } = useParams();
  const { room } = useRoom(roomCode);
  const isSmallDesktop = useIsSmallDesktop();

  return (
    <div>
      <div className="flex flex-col lg:flex-row mt-4 gap-4">
        <div className="w-full lg:w-2/3">
          <div className="flex mb-0 lg:mb-4 gap-4 w-full">
            <ShareRoomButton />
            <MissionProgress room={room} />
            <LaunchGameButton room={room} />
          </div>
          {!isSmallDesktop && <RoomMissions />}
        </div>
        {isSmallDesktop ? (
          <div className="flex gap-4">
            <RoomMissions />
            <PlayerList />
          </div>
        ) : (
          <PlayerList />
        )}
      </div>
    </div>
  );
}
