import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { type SessionQuery } from '@/services/player/types';

import commonStyles from '../../assets/styles/common.module.css';

import { CreateRoomButton } from './CreateRoomButton';
import { Gallery } from './Gallery';
import { JoinRoomButton } from './JoinRoomButton';
import { Rules } from './Rules';
import styles from './styles/index.module.css';

export function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { session } = useOutletContext<SessionQuery>();

  useEffect(() => {
    if (session?.room?.code) {
      navigate(`/room/${session.room.code}`);
    }
  }, [navigate, session?.room?.code]);

  return (
    <>
      <div className={styles.introduction}>
        <h1>{t('home.title')}</h1>
        <h2>{t('home.subtitle')}</h2>
        <p>
          <Trans t={t} i18nKey="home.description" />
        </p>
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
