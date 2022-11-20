import { useContext } from 'react';
import tw, { styled } from 'twin.macro';

import { ReactComponent as AdminIcon } from '@/assets/icons/admin.svg';
import { ReactComponent as KickPlayerIcon } from '@/assets/icons/kickPlayer.svg';
import { ReactComponent as LeaveRoomIcon } from '@/assets/icons/leaveRoom.svg';
import Player from '@/assets/images/player.png';
import { ModalContext } from '@/hooks/context/modal';
import { PlayerRole } from '@/services/player/constants';
import { usePlayerSession } from '@/services/player/queries';

import { KickPlayerModal } from './KickPlayerModal';
import { LeaveRoomModal } from './LeaveRoomModal';

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

interface Props {
  playerId: number;
  playerName: string;
  playerRole: PlayerRole;
}

export function RoomPlayer({
  playerId,
  playerName,
  playerRole,
}: Props): JSX.Element {
  const { playerSession } = usePlayerSession();
  const { openModal } = useContext(ModalContext);

  const handleLeaveRoom = (): void => {
    openModal(<LeaveRoomModal />);
  };

  const handleKickPlayer = (): void => {
    openModal(<KickPlayerModal playerName={playerName} playerId={playerId} />);
  };

  return (
    <PlayerItem key={playerName}>
      <PlayerImage alt={`player-${playerName}`} src={Player} />
      <PlayerName currentPlayer={playerSession?.id === playerId}>
        {playerName}
      </PlayerName>
      {playerRole === PlayerRole.ADMIN && playerSession?.id !== playerId && (
        <Icon>
          <AdminIcon title="roomAdmin" />
        </Icon>
      )}
      {playerSession?.id === playerId && (
        <Icon onClick={handleLeaveRoom}>
          <LeaveRoomIcon title="leaveRoom" />
        </Icon>
      )}
      {playerSession?.role === PlayerRole.ADMIN &&
        playerSession.id !== playerId && (
          <Icon onClick={handleKickPlayer}>
            <KickPlayerIcon title={`kick${playerName}`} />
          </Icon>
        )}
    </PlayerItem>
  );
}
