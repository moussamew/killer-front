import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import Admin from '@/assets/icons/admin.svg';
import KickPlayer from '@/assets/icons/kickPlayer.svg';
import LeaveRoom from '@/assets/icons/leaveRoom.svg';
import Player from '@/assets/images/player.png';
import { ModalContext } from '@/context/modal';
import { useTranslation } from '@/hooks/useTranslation';
import { useSession } from '@/services/player/queries';
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
  ${({ currentPlayer }) => (currentPlayer ? tw`font-semibold` : `font-medium`)}

  text-2xl md:text-3xl
  text-center uppercase
`;

const Icon = tw.div`
  absolute cursor-pointer right-0
`;

export function PlayerList(): JSX.Element {
  const { roomCode } = useParams();
  const { room } = useRoom(roomCode!);
  const { session } = useSession();
  const { openModal } = useContext(ModalContext);
  const { t } = useTranslation();

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
      {room?.players.map(({ name, id }) => (
        <PlayerItem key={name}>
          <PlayerImage alt={`player-${name}`} src={Player} />
          <PlayerName currentPlayer={session?.id === id}>{name}</PlayerName>
          {room.admin.id === id && session?.id !== id && (
            <Icon>
              <Admin title={t('tooltip.admin.room')} />
            </Icon>
          )}
          {session?.id === id && (
            <Icon onClick={handleLeaveRoom}>
              <LeaveRoom title={t('tooltip.leave.room')} />
            </Icon>
          )}
          {room?.admin?.id !== id && session?.name !== name && (
            <Icon onClick={handleKickPlayer(name, id)}>
              <KickPlayer title={t('tooltip.kick.player')} />
            </Icon>
          )}
        </PlayerItem>
      ))}
    </Content>
  );
}
