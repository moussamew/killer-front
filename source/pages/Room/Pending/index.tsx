import { useParams } from 'react-router-dom';
import tw from 'twin.macro';

import Island from '@/assets/images/island.png';
import { useTranslation } from '@/hooks/useTranslation';
import { useSession } from '@/services/player/queries';
import { useRoom } from '@/services/room/queries';

import { PlayerList } from './PlayerList';
import { PlayerMissions } from './PlayerMissions';
import { RoomMissions } from './RoomMissions';
import { ShareRoomLink } from './ShareRoomLink';
import { StartPartyButton } from './StartPartyButton';

const Content = tw.div`
  flex flex-col md:flex-row 
  items-center md:items-start mb-2 md:mb-4 
  justify-center pb-2 border-b
`;

const WelcomeImage = tw.img`
  md:mr-5 h-10 md:h-full
`;

const RoomResume = tw.div`
  mt-2 text-center md:text-left
  w-full sm:w-[fit-content]
`;

const RoomFeatures = tw.div`
  xl:flex xl:flex-row xl:justify-between 
  mt-2 md:mt-4
`;

export function PendingRoomPage(): JSX.Element | null {
  const { roomCode } = useParams();
  const { t } = useTranslation();
  const { session } = useSession();
  const { room } = useRoom(roomCode!);

  return (
    <>
      <Content>
        <WelcomeImage alt="welcome" src={Island} />
        <RoomResume>
          <h1>{t('room.welcome.title')}</h1>
          <p>{t('room.join.room.code', { roomCode })}</p>
          <RoomMissions />
          <ShareRoomLink />
          {session?.id === room?.admin.id && <StartPartyButton />}
        </RoomResume>
      </Content>
      <RoomFeatures>
        <PlayerMissions />
        <PlayerList />
      </RoomFeatures>
    </>
  );
}
