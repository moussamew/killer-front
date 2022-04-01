import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import Island from 'assets/images/island.png';
import t from 'helpers/translate';
import { PlayerContext } from 'hooks/context/player';

import Missions from './Missions';
import PlayerList from './PlayerList';

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

const Room = (): JSX.Element => {
  const { roomCode } = useParams();
  const { playerSession } = useContext(PlayerContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!playerSession.roomCode) {
      navigate('/');
    }
  }, [playerSession.roomCode, navigate]);

  return (
    <Content>
      <Welcome>
        <WelcomeImage alt="welcome" src={Island} />
        <RoomResume>
          <h1>{t('room.welcome')}</h1>
          <p>{t('room.join_room_code', { roomCode })}</p>
        </RoomResume>
      </Welcome>
      <hr />
      <RoomFeatures>
        <Missions />
        <PlayerList />
      </RoomFeatures>
    </Content>
  );
};

export default Room;
