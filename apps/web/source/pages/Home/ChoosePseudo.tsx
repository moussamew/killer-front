import { useTranslation } from '@killerparty/intl';
import Lottie from 'lottie-react';
import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Pumpkin from '@/assets/lotties/pumpkin.json';
import { Button } from '@/components/Button';
import { FullScreenModal } from '@/components/FullScreenModal';
import { Input } from '@/components/Input';
import { getRandomAvatar } from '@/constants/avatars';
import { useCreatePlayer } from '@/services/player/mutations';

import styles from './styles/ChoosePseudo.module.css';

export function ChoosePseudo(): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [pseudo, setPseudo] = useState('');
  const { createPlayer } = useCreatePlayer();

  const handlePseudo = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setPseudo(target.value);
  };

  const goToNextStep = async (): Promise<void> => {
    const { id: playerId } = await createPlayer.mutateAsync({
      name: pseudo,
      avatar: getRandomAvatar(),
    });

    navigate('/create-room/choose-avatar', { state: playerId });
  };

  return (
    <FullScreenModal title="Choisir un pseudo" onClose={() => navigate('/')}>
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
            Choisir ce pseudo
          </Button>
        </div>
      </div>
    </FullScreenModal>
  );
}
