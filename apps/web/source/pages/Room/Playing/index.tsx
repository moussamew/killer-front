import { useTranslation } from '@killerparty/intl';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getRandomAvatar } from '@/constants/avatars';
import { PlayerList } from '@/pages/Room/Pending/PlayerList';
import { PlayerStatus } from '@/services/player/constants';
import { useSession } from '@/services/player/queries';
import { useRoom } from '@/services/room/queries';

import { CurrentAvatar } from '../Ended/CurrentAvatar';

import { PlayerKilledButton } from './PlayerKilledButton';
import styles from './styles/index.module.css';
import { TargetMission } from './TargetMission';

export function PlayingRoomPage(): JSX.Element {
  const { roomCode } = useParams();
  const { session } = useSession();
  const { room } = useRoom(roomCode!);
  const [targetAvatar, setTargetAvatar] = useState(getRandomAvatar());
  const { t } = useTranslation();

  useEffect(() => {
    const target = room?.players.find(({ id }) => id === session?.target?.id);

    if (target?.avatar) {
      setTargetAvatar(target.avatar);
    }
  }, [room?.players, session?.target?.id]);

  return (
    <div className={styles.content}>
      {session?.status === PlayerStatus.ALIVE ? (
        <>
          <h1 className={styles.title}>
            {t('room.target.to.kill', { pseudo: session?.target?.name })}
          </h1>
          <CurrentAvatar avatar={targetAvatar} />
          <TargetMission />
        </>
      ) : (
        <>
          <h1 className={styles.title}>{t('room.player.killed.title')}</h1>
          <CurrentAvatar avatar={session?.avatar} />
        </>
      )}
      <div className={styles.features}>
        {session?.status === PlayerStatus.ALIVE && <PlayerKilledButton />}
        <PlayerList />
      </div>
    </div>
  );
}
