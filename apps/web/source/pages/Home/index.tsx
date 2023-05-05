import { useTranslation } from '@killerparty/intl';
import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { Gallery } from '@/components/Gallery';
import { type SessionQuery } from '@/services/player/types';

import commonStyles from '../../assets/styles/common.module.css';

import { CreateRoomButton } from './CreateRoomButton';
import { JoinRoomButton } from './JoinRoomButton';
import { Rules } from './Rules';
import styles from './styles/index.module.css';

export function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { session } = useOutletContext<SessionQuery>();

  useEffect(() => {
    if (session?.room?.id) {
      navigate(`/room/${session.room.id}`);
    }
  }, [navigate, session?.room?.id]);

  return (
    <>
      <div className={styles.introduction}>
        <h1>{t('home.title')}</h1>
        <h2>{t('home.subtitle')}</h2>
        <p>{t('home.description')}</p>
      </div>
      <div className={commonStyles.actions}>
        <CreateRoomButton playerName={session?.name} />
        <JoinRoomButton />
      </div>
      <Gallery />
      <Rules />
    </>
  );
}
