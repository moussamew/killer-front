import { Fragment, useContext, useState } from 'react';
import tw from 'tailwind-styled-components';

import Edit from '@/assets/icons/edit.svg';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import t from '@/helpers/translate';
import { PlayerContext } from '@/hooks/context/player';
import { RoomContext } from '@/hooks/context/room';

import { updatePlayer } from './services/requests';

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

export const SettingsModal = (): JSX.Element => {
  const { playerSession, refreshPlayerSession } = useContext(PlayerContext);
  const { refreshRoomPlayers } = useContext(RoomContext);

  const [isPseudoInputOpen, togglePseudoInput] = useState(true);
  const [pseudo, setPseudo] = useState('');

  const updatePseudo = async (): Promise<void> =>
    updatePlayer({ name: pseudo })
      .then(refreshPlayerSession)
      .then(refreshRoomPlayers);

  return (
    <Fragment>
      <HeadContent>
        <Title>{t('layout.user_settings')}</Title>
      </HeadContent>
      <Action onClick={() => togglePseudoInput(!isPseudoInputOpen)}>
        <Text>{t('layout.update_pseudo')}</Text>
        <img alt="editPseudo" src={Edit} />
      </Action>
      {isPseudoInputOpen && (
        <Fragment>
          <Spacer />
          <Input
            id="editPseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value.toUpperCase())}
            placeholder={playerSession.name}
            uppercase
          />
          <Button
            content={t('layout.save_changes')}
            onClick={updatePseudo}
            disabled={!pseudo}
          />
        </Fragment>
      )}
    </Fragment>
  );
};
