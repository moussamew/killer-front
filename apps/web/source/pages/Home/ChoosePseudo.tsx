import { useTranslation } from '@killerparty/intl';
import Lottie from 'lottie-react';
import { LoaderCircle } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Pumpkin from '@/assets/lotties/pumpkin.json';
import { FullScreenModal } from '@/components/FullScreenModal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getRandomAvatar } from '@/constants/avatars';
import { onEnter } from '@/helpers/keys';
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
            type="text"
            value={pseudo}
            onChange={handlePseudo}
            placeholder={t('home.create.pseudo.placeholder')}
            onKeyDown={({ key }) => onEnter({ key, fn: goToNextStep })}
          />
          <Button disabled={createPlayer.isPending} onClick={goToNextStep}>
            {createPlayer.isPending && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            {t('action.next.button')}
          </Button>
        </div>
      </div>
    </FullScreenModal>
  );
}
