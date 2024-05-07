import { useParams } from 'react-router-dom';

import { useRoom } from '@/services/room/queries';

import { LaunchGameButton } from './LaunchGameButton';
import { MissionProgress } from './MissionsProgress';
import PlayerList from './PlayerList';
import { RoomMissions } from './RoomMissions';
import ShareRoomButton from './ShareRoomButton';

export function PendingRoomPageV2() {
  const { roomCode } = useParams();
  const { room } = useRoom(roomCode);

  return (
    <div>
      <div className="flex flex-row mt-4 gap-4">
        <div className="w-2/3">
          <div className="flex mb-4 gap-4 w-full">
            <ShareRoomButton />
            <MissionProgress room={room} />
            <LaunchGameButton room={room} />
          </div>
          <RoomMissions room={room} />
        </div>
        <PlayerList />
      </div>
    </div>
  );
}
