import { ChangeEvent, Fragment, useState } from 'react';
import tw from 'tailwind-styled-components';

import Edit from '@/assets/icons/edit.svg';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import t from '@/helpers/translate';
import { useUpdatePlayer } from '@/services/player/mutations';
import { usePlayerSession } from '@/services/player/queries';

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
  const { playerSession } = usePlayerSession();
  const { updatePlayer } = useUpdatePlayer();

  const handlePseudo = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setPseudo(target.value);
  };

  const updatePlayerPseudo = async (): Promise<void> => {
    await updatePlayer.mutateAsync({ name: pseudo.toUpperCase() });
  };

  return (
    <Fragment>
      <HeadContent>
        <Title>{t('layout.user_settings')}</Title>
      </HeadContent>
      <Action>
        <Text>{t('layout.update_pseudo')}</Text>
        <img alt="editPseudo" src={Edit} />
      </Action>
      <Fragment>
        <Spacer />
        <Input
          id="editPseudo"
          value={pseudo}
          onChange={handlePseudo}
          placeholder={playerSession?.name}
        />
        <Button
          content={t('layout.save_changes')}
          onClick={updatePlayerPseudo}
          disabled={!pseudo}
        />
      </Fragment>
    </Fragment>
  );
}
