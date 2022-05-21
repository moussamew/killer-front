import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import Admin from '@/assets/icons/admin.svg';
import ExitRoom from '@/assets/icons/exitRoom.svg';
import Knife from '@/assets/images/knife.png';
import Player from '@/assets/images/player.png';
import { PROD_ENV } from '@/constants/app';
import { ROOM_TOPIC } from '@/constants/endpoints';
import { PlayerRole } from '@/constants/enums';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { PlayerContext } from '@/hooks/context/player';

import { KickPlayerModal } from './KickPlayerModal';
import { LeaveRoomModal } from './LeaveRoomModal';
import { getRoomPlayers } from './services/requests';

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

const PlayerItem = tw.div`
  flex flex-row items-center 
  text-center py-2 justify-center 
  border-b relative
`;

const PlayerImage = tw.img`
  absolute h-4 left-1
`;

const PlayerName = tw.p<{ $currentPlayer: boolean }>`
 ${({ $currentPlayer }): string =>
   $currentPlayer ? 'font-bold' : 'font-medium'}

  text-2xl md:text-3xl
  text-center uppercase
`;

const ExitIcon = tw.img`
  absolute cursor-pointer right-2
`;

const AdminIcon = tw.img`
  absolute right-2 h-2.5
  rotate-y-45
`;

const PlayerList = (): JSX.Element => {
  const { roomCode } = useParams();

  const { data: roomPlayers, refetch: refetchRoomPlayers } = useQuery(
    'roomPlayers',
    () => getRoomPlayers(roomCode),
  );

  const { playerSession } = useContext(PlayerContext);
  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    const roomEventSource = new EventSource(`${ROOM_TOPIC}/${roomCode}`, {
      withCredentials: PROD_ENV,
    });

    roomEventSource.addEventListener('message', async (): Promise<void> => {
      await refetchRoomPlayers();
    });

    return () => roomEventSource.close();
  }, [roomCode, refetchRoomPlayers]);

  const handleRoomExit = (playerId?: number): void => {
    if (playerSession.id === playerId) {
      openModal(<LeaveRoomModal />);
    }

    if (
      playerSession.id !== playerId &&
      playerSession.role === PlayerRole.ADMIN
    ) {
      openModal(<KickPlayerModal />);
    }
  };

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
      {roomPlayers?.map(({ id, name, role }) => (
        <PlayerItem key={name}>
          <PlayerImage alt={`player-${name}`} src={Player} />
          <PlayerName $currentPlayer={playerSession.id === id}>
            {name}
          </PlayerName>
          {role === PlayerRole.ADMIN && playerSession.id !== id && (
            <AdminIcon alt="admin" src={Admin} />
          )}
          {(playerSession.role === PlayerRole.ADMIN ||
            playerSession.id === id) && (
            <ExitIcon
              alt={`exitRoom${name}`}
              src={ExitRoom}
              onClick={() => handleRoomExit(id)}
            />
          )}
        </PlayerItem>
      ))}
    </Container>
  );
};

export default PlayerList;
