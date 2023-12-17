import { useTranslation } from '@killerparty/intl';
import Lottie from 'lottie-react';
import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import HomeLottie from '@/assets/lotties/home.json';
import { Button } from '@/components/Button';
import { Gallery } from '@/components/Gallery';
import { type SessionQuery } from '@/services/player/types';

import commonStyles from '../../assets/styles/common.module.css';

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

  const handleCreateRoom = (): void => {
    navigate('/choose-pseudo', { state: 'create-room' });
  };

  const handleJoinRoom = (): void => {
    navigate('/choose-pseudo', { state: 'join-room' });
  };

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
            <Button color="primary" onClick={handleCreateRoom}>
              {t('home.create.room.button')}
            </Button>
            <Button color="secondary" onClick={handleJoinRoom}>
              {t('home.join.room')}
            </Button>
          </div>
        </div>
        <Lottie className={styles.webLottie} animationData={HomeLottie} />
      </div>
      <Gallery />
      <Rules />
    </>
  );
}
