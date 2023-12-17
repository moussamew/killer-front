import { useTranslation } from '@killerparty/intl';
import Lottie from 'lottie-react';
import { useState, type ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Pumpkin from '@/assets/lotties/pumpkin.json';
import { Button } from '@/components/Button';
import { FullScreenModal } from '@/components/FullScreenModal';
import { Input } from '@/components/Input';
import { getRandomAvatar } from '@/constants/avatars';
import { useCreatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

import styles from './styles/ChoosePseudo.module.css';

export function ChoosePseudo(): JSX.Element {
  const navigate = useNavigate();
  const { state: route } = useLocation();
  const { t } = useTranslation();
  const [pseudo, setPseudo] = useState('');
  const { createPlayer } = useCreatePlayer();
  const { refetchSession } = useSession();

  const handlePseudo = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setPseudo(target.value);
  };

  const goToNextStep = async (): Promise<void> => {
    await createPlayer.mutateAsync({
      name: pseudo,
      avatar: getRandomAvatar(),
    });

    // Refetch session to update the player infos.
    await refetchSession();

    navigate('/choose-avatar', { state: route });
  };

  return (
    <FullScreenModal
      title={t('home.create.pseudo.title')}
      onClose={() => navigate('/')}
    >
      <div>
        <Lottie className={styles.lottie} animationData={Pumpkin} />
        <div className={styles.selectPseudo}>
          <Input
            id="pseudo"
            type="text"
            label={t('home.create.pseudo.label')}
            placeholder={t('home.create.pseudo.placeholder')}
            value={pseudo}
            onChange={handlePseudo}
          />
          <Button color="secondary" onClick={goToNextStep}>
            {t('action.next.button')}
          </Button>
        </div>
      </div>
    </FullScreenModal>
  );
}
