import { useTranslation } from '@killerparty/intl';
import clsx from 'clsx';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Checked from '@/assets/icons/checked.svg';
import Crown from '@/assets/icons/crown.svg';
import Delete from '@/assets/icons/delete.svg';
import { Button } from '@/components/Button';
import { avatarList } from '@/components/Gallery';
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

  useEffect(() => {
    room?.players.forEach((player, index) => {
      if (player.id === room.admin.id) {
        room.players.splice(index, 1);
        room.players.unshift(player);
      }
    });
  }, [room?.players, room?.admin.id]);

  const handleKickPlayer = (playerId: number): void => {
    updatePlayer.mutate({ id: playerId, room: null });
  };

  return (
    <div className={styles.content}>
      <RoomSettings />
      {room?.players.map(({ id, name, avatar, hasAtLeastOneMission }) => (
        <div key={name} className={styles.item}>
          <div className={styles.player}>
            <div className={styles.avatarContent}>
              <div
                className={clsx(styles.avatar, {
                  [styles.currentPlayer]: session?.id === id,
                  [styles.otherPlayer]: session?.id !== id,
                  [styles.adminPlayer]: room.admin.id === id,
                })}
              >
                {avatarList[avatar]}
              </div>
              {room.admin.id === id && <Crown className={styles.crown} />}
            </div>
            <h3>{name}</h3>
            <Checked
              className={clsx(styles.icon, {
                [styles.playerReady]:
                  room?.isGameMastered || hasAtLeastOneMission,
              })}
            />
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
      <Button color="primary" onClick={() => openModal(<LeaveRoomModal />)}>
        {t('room.leave.current.room')}
      </Button>
    </div>
  );
}
