import { type ChangeEvent, useContext, useState } from 'react';
import tw from 'twin.macro';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ModalContext } from '@/context/modal';
import { useTranslation } from '@/hooks/useTranslation';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

import styles from './styles/UpdatePseudo.module.css';

const Content = tw.div`
  mb-1
`;

const Action = tw.div`
  flex flex-row justify-between
  cursor-pointer
`;

const Text = tw.p`
  font-medium
`;

export function UpdatePseudo(): JSX.Element {
  const [pseudo, setPseudo] = useState('');
  const { t } = useTranslation();
  const { closeModal } = useContext(ModalContext);
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();

  const handlePseudo = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setPseudo(target.value);
  };

  const updatePlayerPseudo = async (): Promise<void> => {
    await updatePlayer.mutateAsync(
      { id: session?.id, name: pseudo.toUpperCase() },
      { onSuccess: () => closeModal() },
    );
  };

  return (
    <Content>
      <Action>
        <Text>{t('layout.user.update.pseudo.label')}</Text>
      </Action>
      <Input
        id="editPseudo"
        value={pseudo}
        onChange={handlePseudo}
        placeholder={t('layout.user.update.pseudo.placeholder')}
      />
      <Button
        color="primary"
        onClick={updatePlayerPseudo}
        disabled={!pseudo}
        customStyle={styles.button}
      >
        {t('layout.user.update.pseudo.confirm.button')}
      </Button>
    </Content>
  );
}
