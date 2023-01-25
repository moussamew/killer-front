import { ChangeEvent, useContext, useState } from 'react';
import tw from 'twin.macro';

import { ReactComponent as EditIcon } from '@/assets/icons/edit.svg';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ModalContext } from '@/context/modal';
import { useTranslation } from '@/hooks/useTranslation';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

const HeadContent = tw.div`
  flex flex-row mb-2
  items-center
`;

const Title = tw.h2`
  mb-0
`;

const Action = tw.div`
  flex flex-row justify-between
  cursor-pointer
`;

const Text = tw.p`
  font-medium
`;

const Spacer = tw.hr`
  my-1
`;

export function SettingsModal(): JSX.Element {
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
    <div>
      <HeadContent>
        <Title>{t('layout.user.settings.title')}</Title>
      </HeadContent>
      <Action>
        <Text>{t('layout.user.update.pseudo.label')}</Text>
        <EditIcon />
      </Action>
      <div>
        <Spacer />
        <Input
          id="editPseudo"
          value={pseudo}
          onChange={handlePseudo}
          placeholder={t('layout.user.update.pseudo.placeholder')}
        />
        <Button
          content={t('layout.user.update.pseudo.confirm.button')}
          onClick={updatePlayerPseudo}
          disabled={!pseudo}
        />
      </div>
    </div>
  );
}
