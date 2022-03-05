import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import NotReady from '../../assets/icons/not_ready.svg';
import Knife from '../../assets/images/knife.png';
import Player from '../../assets/images/player.png';
import t from '../../helpers/translate';

import { getPlayersInRoom } from './services/requests';

const Container = tw.div`
  mt-3 xl:mt-0
`;

const Section = tw.div`
  flex flex-row items-center 
  mb-2
`;

const ListImage = tw.img`
  h-7 mr-1 -rotate-45
`;

const List = tw.div`
  mt-1
`;

const PlayerItem = tw.div`
  flex flex-row items-center 
  text-center py-1 justify-between 
  border-b
`;

const PlayerImage = tw.img`
  pl-1 h-4 mr-2
`;

const PlayerName = tw.p`
  text-3xl md:text-4xl font-bold 
  text-center
`;

const PlayerList = (): JSX.Element | null => {
  const { roomCode } = useParams();

  const { isLoading, data: playersInRoom } = useQuery('playersInRoom', () =>
    getPlayersInRoom(roomCode),
  );

  if (isLoading || !playersInRoom) {
    return null;
  }

  return (
    <Container>
      <Section>
        <ListImage alt="player list" src={Knife} />
        <div>
          <h2>{t('room.players_list')}</h2>
          <p>{t('room.players_list_description')}</p>
        </div>
      </Section>
      <hr />
      <List>
        {playersInRoom.map(({ name }) => (
          <PlayerItem key={name}>
            <PlayerImage alt={`player-${name}`} src={Player} />
            <PlayerName>{name}</PlayerName>
            <img alt="player not ready" src={NotReady} />
          </PlayerItem>
        ))}
      </List>
    </Container>
  );
};

export default PlayerList;
