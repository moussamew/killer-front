import { type ChangeEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

import styles from './styles/UpdatePseudo.module.css';

export function UpdatePseudo(): JSX.Element {
  const [pseudo, setPseudo] = useState('');
  const { t } = useTranslation();
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();

  const handlePseudo = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setPseudo(target.value);
  };

  const updatePlayerPseudo = async (): Promise<void> => {
    await updatePlayer.mutateAsync(
      { id: session?.id, name: pseudo.toUpperCase() },
      {
        onSuccess: () =>
          toast.success(
            t('layout.user.update.pseudo.success.message', { pseudo }),
          ),
      },
    );
  };

  return (
    <div className={styles.content}>
      <Input
        id="editPseudo"
        value={pseudo}
        onChange={handlePseudo}
        label={t('layout.user.update.pseudo.label')}
        placeholder={t('layout.user.update.pseudo.placeholder')}
      />
      <Button color="primary" onClick={updatePlayerPseudo} disabled={!pseudo}>
        {t('layout.user.update.pseudo.confirm.button')}
      </Button>
    </div>
  );
}
