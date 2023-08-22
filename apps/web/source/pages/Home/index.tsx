import { useTranslation } from '@killerparty/intl';
import Lottie from 'lottie-react';
import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import HomeLottie from '@/assets/lotties/home.json';
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
      <div className={styles.content}>
        <div>
          <div className={styles.resume}>
            <h1>{t('home.title')}</h1>
            <p>{t('home.description')}</p>
          </div>
          <Lottie className={styles.mobileLottie} animationData={HomeLottie} />
          <div className={commonStyles.actions}>
            <CreateRoomButton playerName={session?.name} />
            <JoinRoomButton />
          </div>
        </div>
        <Lottie className={styles.webLottie} animationData={HomeLottie} />
      </div>
      <Gallery />
      <Rules />
    </>
  );
}
