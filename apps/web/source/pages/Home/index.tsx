import { useTranslation } from '@killerparty/intl';
import Lottie from 'lottie-react';
import { Redo, PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import AppleStore from '@/assets/images/apple-store.svg';
import GooglePlayStore from '@/assets/images/google-play-store.png';
import HomeLottie from '@/assets/lotties/home.json';
import { Gallery } from '@/components/Gallery';
import { Button } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { Typography } from '@/components/ui/Typography';
import { useIsMobile } from '@/hooks/useWindowSize';
import { type SessionQuery } from '@/services/player/types';

import commonStyles from '../../assets/styles/common.module.css';

import { CreateRoomDrawer } from './CreateRoomDrawer';
import { JoinRoomDrawer } from './JoinRoomDrawer';
import { Rules } from './Rules';
import styles from './styles/index.module.css';

export function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { session } = useOutletContext<SessionQuery>();
  const [defaultAvatar, setDefaultAvatar] = useState('captain');
  const [pseudo, setPseudo] = useState<string | null>(session?.name ?? null);
  const isMobile = useIsMobile();

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
            <Typography.H1>{t('home.title')}</Typography.H1>
            <p>{t('home.description')}</p>
          </div>
          <Lottie className={styles.mobileLottie} animationData={HomeLottie} />
          <div className={commonStyles.actions}>
            {!isMobile && (
              <>
                <CreateRoomDrawer
                  defaultAvatar={defaultAvatar}
                  setDefaultAvatar={setDefaultAvatar}
                  pseudo={pseudo}
                  setPseudo={setPseudo}
                />
                <JoinRoomDrawer
                  defaultAvatar={defaultAvatar}
                  setDefaultAvatar={setDefaultAvatar}
                  pseudo={pseudo}
                  setPseudo={setPseudo}
                />
              </>
            )}
            {isMobile && (
              <>
                <Button onClick={handleCreateRoom} size="lg">
                  {t('home.create.room.button')}
                  <PlusCircle className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="secondary" onClick={handleJoinRoom} size="lg">
                  {t('home.join.room')}
                  <Redo className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          <div>
            <Typography.Blockquote>
              {t('home.disclaimer.mobile.app')}
            </Typography.Blockquote>
          </div>
          <div className="flex items-center mt-2">
            <a
              href="https://apps.apple.com/fr/app/killerparty/id6468843961"
              target="_blank"
              rel="noreferrer"
              aria-label="Download on the Apple Store"
            >
              <AppleStore />
            </a>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <img
                    src={GooglePlayStore}
                    alt="Download on the Google Play Store"
                    className="h-20"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <span>{t('home.android.app.coming.soon')}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <Lottie className={styles.webLottie} animationData={HomeLottie} />
      </div>
      <Gallery
        currentAvatar={defaultAvatar}
        setCurrentAvatar={setDefaultAvatar}
      />
      <Rules />
    </>
  );
}
