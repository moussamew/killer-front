import { useParams } from 'react-router-dom';
import tw from 'twin.macro';

import Island from '@/assets/images/island.png';
import { t } from '@/helpers/translate';
import { Layout } from '@/layout/Layout';
import { RoomPage } from '@/pages/Room';
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
  justify-center
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
  const { session } = useSession();
  const { room } = useRoom(roomCode!);

  return (
    <RoomPage>
      <Layout>
        <Content>
          <WelcomeImage alt="welcome" src={Island} />
          <RoomResume>
            <h1>{t('room.welcome')}</h1>
            <p>{t('room.join_room_code', { roomCode })}</p>
            <RoomMissions />
            <ShareRoomLink />
            {session?.id === room?.admin.id && <StartPartyButton />}
          </RoomResume>
        </Content>
        <hr />
        <RoomFeatures>
          <PlayerMissions />
          <PlayerList />
        </RoomFeatures>
      </Layout>
    </RoomPage>
  );
}
