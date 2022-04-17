import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import NotReady from '@/assets/icons/not_ready.svg';
import Killer from '@/assets/images/killer.png';
import Knife from '@/assets/images/knife.png';
import { PROD_ENV } from '@/constants/app';
import { ROOM_TOPIC } from '@/constants/endpoints';
import t from '@/helpers/translate';
import { Player } from '@/types';

import { updatePlayerList } from './helpers';
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
  text-2xl md:text-3xl font-bold 
  text-center uppercase
`;

const PlayerList = (): JSX.Element => {
  const { roomCode } = useParams();

  const [players, setPlayers] = useState<Player[]>([]);

  const { data: playersInRoom } = useQuery('playersInRoom', () =>
    getPlayersInRoom(roomCode),
  );

  useEffect(() => {
    if (playersInRoom) {
      setPlayers(playersInRoom);
    }
  }, [playersInRoom]);

  useEffect(() => {
    const roomEventSource = new EventSource(`${ROOM_TOPIC}/${roomCode}`, {
      withCredentials: PROD_ENV,
    });

    roomEventSource.addEventListener('message', (event: MessageEvent): void => {
      const playerUpdated: Player = JSON.parse(event.data);

      const newPlayerList = updatePlayerList(playerUpdated, [...players]);

      return setPlayers(newPlayerList);
    });

    return (): void => roomEventSource.close();
  }, [roomCode, players]);

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
        {players.map(({ name }) => (
          <PlayerItem key={name}>
            <PlayerImage alt={`player-${name}`} src={Killer} />
            <PlayerName>{name}</PlayerName>
            <img alt="player not ready" src={NotReady} />
          </PlayerItem>
        ))}
      </List>
    </Container>
  );
};

export default PlayerList;
