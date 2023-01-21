import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { ReactComponent as AdminIcon } from '@/assets/icons/admin.svg';
import { ReactComponent as KickPlayerIcon } from '@/assets/icons/kickPlayer.svg';
import { ReactComponent as LeaveRoomIcon } from '@/assets/icons/leaveRoom.svg';
import Player from '@/assets/images/player.png';
import { ModalContext } from '@/hooks/context/modal';
import { usePlayerSession } from '@/services/player/queries';
import { useRoom } from '@/services/room/queries';

import { KickPlayerModal } from './KickPlayerModal';
import { LeaveRoomModal } from './LeaveRoomModal';
import { RoomSettings } from './RoomSettings';

const Content = tw.div`
  mt-3 xl:mt-0
`;

const PlayerItem = tw.div`
  flex flex-row items-center 
  text-center py-2 justify-center 
  border-b relative
`;

const PlayerImage = tw.img`
  absolute h-4 left-1
`;

const PlayerName = styled.p<{ currentPlayer: boolean }>`
  ${({ currentPlayer }) => (currentPlayer ? tw`font-bold` : `font-medium`)}

  text-2xl md:text-3xl
  text-center uppercase
`;

const Icon = tw.div`
  absolute cursor-pointer right-0
`;

export function PlayerList(): JSX.Element {
  const { roomCode } = useParams();
  const { room } = useRoom(roomCode!);
  const { player } = usePlayerSession();
  const { openModal } = useContext(ModalContext);

  const handleLeaveRoom = (): void => {
    openModal(<LeaveRoomModal />);
  };

  const handleKickPlayer =
    (playerName: string, playerId: number) => (): void => {
      openModal(
        <KickPlayerModal playerName={playerName} playerId={playerId} />,
      );
    };

  return (
    <Content>
      <RoomSettings />
      <hr />
      {room?.players.map(({ name, id }) => (
        <PlayerItem key={name}>
          <PlayerImage alt={`player-${name}`} src={Player} />
          <PlayerName currentPlayer={player?.id === id}>{name}</PlayerName>
          {room.admin.id === id && player?.id !== id && (
            <Icon>
              <AdminIcon title="roomAdmin" />
            </Icon>
          )}
          {player?.id === id && (
            <Icon onClick={handleLeaveRoom}>
              <LeaveRoomIcon title="leaveRoom" />
            </Icon>
          )}
          {room?.admin?.id !== id && player?.name !== name && (
            <Icon onClick={handleKickPlayer(name, id)}>
              <KickPlayerIcon title={`kick${name}`} />
            </Icon>
          )}
        </PlayerItem>
      ))}
    </Content>
  );
}
