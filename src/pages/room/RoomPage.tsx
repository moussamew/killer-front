import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import Island from '@/assets/images/island.png';
import { PlayerRole, RoomStatus } from '@/constants/enums';
import { isEmptyObject } from '@/helpers/objects';
import t from '@/helpers/translate';
import { PlayerContext } from '@/hooks/context/player';
import { usePrevious } from '@/hooks/usePrevious';
import { Layout } from '@/layout/Layout';

import PlayerList from './PlayerList';
import PlayerMissions from './PlayerMissions';
import RoomMissions from './RoomMissions';
import { getRoom } from './services/requests';
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
  w-full sm:w-fit
`;

const RoomFeatures = tw.div`
  xl:flex xl:flex-row xl:justify-between 
  mt-2 md:mt-4
`;

export const RoomPage = (): JSX.Element => {
  const { roomCode } = useParams();

  const { playerSession } = useContext(PlayerContext);

  const previousRoomCode = usePrevious(playerSession?.roomCode);

  const { data: room } = useQuery('room', () => getRoom(roomCode!));

  const navigate = useNavigate();

  /**
   * Redirect player to `join/room` route in two cases:
   * The player try to join the room without pseudo.
   * The player try to join the room when he is already inside another room.
   */
  useEffect(() => {
    if (
      isEmptyObject(playerSession) ||
      (!previousRoomCode && playerSession?.roomCode !== roomCode)
    ) {
      navigate(`/join/${roomCode}`);
    }
  }, [playerSession, previousRoomCode, roomCode, navigate]);

  /**
   * Redirect player to `room/playing` when the party is already started.
   */
  useEffect(() => {
    if (room?.status === RoomStatus.IN_GAME) {
      navigate(`/room/${roomCode}/playing`);
    }
  }, [room, navigate, roomCode]);

  return (
    <Layout>
      <Content>
        <WelcomeImage alt="welcome" src={Island} />
        <RoomResume>
          <h1>{t('room.welcome')}</h1>
          <p>{t('room.join_room_code', { roomCode })}</p>
          <RoomMissions />
          <ShareRoomLink roomCode={roomCode!} />
          {playerSession.role === PlayerRole.ADMIN && <StartPartyButton />}
        </RoomResume>
      </Content>
      <hr />
      <RoomFeatures>
        <PlayerMissions roomCode={roomCode!} />
        <PlayerList />
      </RoomFeatures>
    </Layout>
  );
};
