import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Admin from '@/assets/icons/admin.svg';
import KickPlayer from '@/assets/icons/kickPlayer.svg';
import LeaveRoom from '@/assets/icons/leaveRoom.svg';
import { AVATARS } from '@/constants/avatars';
import { ModalContext } from '@/context/modal';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';
import { useRoom } from '@/services/room/queries';

import { LeaveRoomModal } from './LeaveRoomModal';
import { RoomSettings } from './RoomSettings';
import styles from './styles/PlayerList.module.css';

export function PlayerList(): JSX.Element {
  const { roomCode } = useParams();
  const { room } = useRoom(roomCode!);
  const { session } = useSession();
  const { updatePlayer } = useUpdatePlayer();
  const { openModal } = useContext(ModalContext);
  const { t } = useTranslation();

  const handleLeaveRoom = (): void => {
    openModal(<LeaveRoomModal />);
  };

  const handleKickPlayer = async (playerId: number): Promise<void> => {
    await updatePlayer.mutateAsync({ id: playerId, room: null });
  };

  return (
    <div className={styles.content}>
      <RoomSettings />
      {room?.players.map(({ name, id, avatar }) => (
        <div key={name} className={styles.player}>
          <div className={styles.avatar}>{AVATARS[avatar]}</div>
          <h3>{name}</h3>
          {room.admin.id === id && session?.id !== id && (
            <Admin title={t('tooltip.admin.room')} />
          )}
          {session?.id === id && (
            <LeaveRoom
              title={t('tooltip.leave.room')}
              onClick={handleLeaveRoom}
            />
          )}
          {room.admin.id === session?.id &&
            room?.admin?.id !== id &&
            session?.name !== name && (
              <KickPlayer
                title={t('tooltip.kick.player', { playerName: name })}
                onClick={() => handleKickPlayer(id)}
              />
            )}
        </div>
      ))}
    </div>
  );
}
