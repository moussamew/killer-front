import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import Island from '@/assets/images/island.png';
import { isEmptyObject } from '@/helpers/objects';
import t from '@/helpers/translate';
import { PlayerContext } from '@/hooks/context/player';
import { usePrevious } from '@/hooks/usePrevious';
import { Layout } from '@/layout/Layout';

import PlayerList from './PlayerList';
import PlayerMissions from './PlayerMissions';
import RoomMissions from './RoomMissions';

const Content = tw.div`
  max-w-screen-xl p-2 m-auto
`;

const Welcome = tw.div`
  flex flex-col md:flex-row 
  items-center mb-2 md:mb-4 
  justify-center
`;

const WelcomeImage = tw.img`
  md:mr-5 h-10 md:h-full
`;

const RoomResume = tw.div`
  mt-2 text-center md:text-left
`;

const RoomFeatures = tw.div`
  xl:flex xl:flex-row xl:justify-between 
  mt-2 md:mt-4
`;

export const RoomPage = (): JSX.Element => {
  const { roomCode } = useParams();
  const { playerSession } = useContext(PlayerContext);

  const previousRoomCode = usePrevious(playerSession.roomCode);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      isEmptyObject(playerSession) ||
      (!previousRoomCode && playerSession.roomCode !== roomCode)
    ) {
      navigate(`/join/${roomCode}`);
    }
  }, [playerSession, previousRoomCode, roomCode, navigate]);

  return (
    <Layout>
      <Content>
        <Welcome>
          <WelcomeImage alt="welcome" src={Island} />
          <RoomResume>
            <h1>{t('room.welcome')}</h1>
            <p>{t('room.join_room_code', { roomCode })}</p>
            <RoomMissions />
          </RoomResume>
        </Welcome>
        <hr />
        <RoomFeatures>
          <PlayerMissions />
          <PlayerList />
        </RoomFeatures>
      </Content>
    </Layout>
  );
};
