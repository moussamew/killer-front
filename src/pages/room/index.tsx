import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import Island from '../../assets/images/island.png';
import Header from '../../components/Header';
import { H1 } from '../../components/Heading';
import { t } from '../../translate/helpers';

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

  return (
    <Fragment>
      <Header />
      <Content>
        <Welcome>
          <WelcomeImage alt="welcome" src={Island} />
          <RoomResume>
            <H1>{t('room.welcome')}</H1>
            <p>
              {/* TODO: Update the translate method to use string interpolation. */}
              The code to join this room is <strong>{roomCode}</strong>.
            </p>
          </RoomResume>
        </Welcome>
        <hr />
        <RoomFeatures>
          <Missions />
          <PlayerList />
        </RoomFeatures>
      </Content>
    </Fragment>
  );
};

export default Room;
