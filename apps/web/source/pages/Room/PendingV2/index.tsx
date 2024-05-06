import { LaunchGameButton } from './LaunchGameButton';
import MissionsProgress from './MissionsProgress';
import PlayerList from './PlayerList';
import { RoomMissions } from './RoomMissions';
import ShareRoomButton from './ShareRoomButton';

export function PendingRoomPageV2() {
  return (
    <div>
      <div className="flex flex-row mt-4 gap-4">
        <div className="w-2/3">
          <div className="flex mb-4 gap-4 w-full">
            <ShareRoomButton />
            <MissionsProgress />
            <LaunchGameButton />
          </div>
          <RoomMissions />
        </div>
        <PlayerList />
      </div>
    </div>
  );
}
