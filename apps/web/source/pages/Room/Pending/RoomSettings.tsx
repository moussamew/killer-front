import { useTranslation } from '@killerparty/intl';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import RoomSettingsIcon from '@/assets/icons/roomSettings.svg';
import { ModalContext } from '@/context/modal';
import { useSession } from '@/services/player/queries';
import { useRoom } from '@/services/room/queries';

import { RoomSettingsModal } from './RoomSettingsModal';
import styles from './styles/RoomSettings.module.css';

export function RoomSettings(): JSX.Element {
  const { t } = useTranslation();
  const { session } = useSession();
  const { roomCode } = useParams();
  const { room } = useRoom(roomCode!);
  const { openModal } = useContext(ModalContext);

  const handleRoomSettings = (): void => {
    openModal(<RoomSettingsModal />);
  };

  return (
    <div className={styles.content}>
      <h2>{t('room.players.list')}</h2>
      {session?.id === room?.admin.id && (
        <RoomSettingsIcon
          title={t('tooltip.room.settings')}
          onClick={handleRoomSettings}
          className={styles.icon}
        />
      )}
      <p>{t('room.players.list.description')}</p>
    </div>
  );
}
