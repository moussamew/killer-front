import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Checked from '@/assets/icons/checked.svg';
import Delete from '@/assets/icons/delete.svg';
import Unchecked from '@/assets/icons/unchecked.svg';
import { chooseAvatar } from '@/components/Avatars';
import { Button } from '@/components/Button';
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
  const { openModal } = useContext(ModalContext);
  const { updatePlayer } = useUpdatePlayer();
  const { t } = useTranslation();

  const handleLeaveRoom = (): void => {
    openModal(<LeaveRoomModal />);
  };

  const handleKickPlayer = (playerId: number): void => {
    updatePlayer.mutate({ id: playerId, room: null });
  };

  return (
    <div className={styles.content}>
      <RoomSettings />
      {room?.players.map(({ id, name, avatar, hasAtLeastOneMission }) => (
        <div key={name} className={styles.item}>
          <div className={styles.player}>
            <div className={styles.avatar}>{chooseAvatar[avatar]}</div>
            <h3>{name}</h3>
            {hasAtLeastOneMission ? (
              <Checked className={styles.icon} />
            ) : (
              <Unchecked className={styles.icon} />
            )}
          </div>
          {room.admin.id === session?.id && session?.name !== name && (
            <Delete
              className={styles.kickPlayer}
              title={t('tooltip.kick.player', { playerName: name })}
              onClick={() => handleKickPlayer(id)}
            />
          )}
        </div>
      ))}
      <Button
        color="primary"
        onClick={handleLeaveRoom}
        customStyle={styles.button}
      >
        {t('room.leave.current.room')}
      </Button>
    </div>
  );
}
