import { Fragment, useContext, useState } from 'react';
import tw from 'tailwind-styled-components';

import Edit from '@/assets/icons/edit.svg';
import Logout from '@/assets/icons/logout.svg';
import Settings from '@/assets/icons/settings.svg';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/Input';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { PlayerContext } from '@/hooks/context/player';

import { updatePlayer } from './services/requests';

const HeadContent = tw.div`
  flex flex-row mb-2
  items-center
`;

const Title = tw.h2`
  ml-0.5 mb-0
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
  const { closeModal } = useContext(ModalContext);

  const [isPseudoInputOpen, togglePseudoInput] = useState(false);
  const [pseudo, setPseudo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const updatePseudo = (): Promise<void> =>
    updatePlayer({ name: pseudo })
      .then(refreshPlayerSession)
      .then(closeModal)
      .catch((error) => setErrorMessage(error.message));

  const exitRoom = (): Promise<void> =>
    updatePlayer({ roomCode: null })
      .then(refreshPlayerSession)
      .then(closeModal);

  return (
    <Fragment>
      <HeadContent>
        <img alt="settingsIcon" src={Settings} />
        <Title>{t('layout.user_settings')}</Title>
      </HeadContent>
      {playerSession.roomCode && (
        <Fragment>
          <Action onClick={exitRoom}>
            <Text>{t('layout.leave_room')}</Text>
            <img alt="exitRoom" src={Logout} />
          </Action>
          <Spacer />
        </Fragment>
      )}
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
          {errorMessage && (
            <ErrorMessage
              message={errorMessage}
              closeMessage={() => setErrorMessage('')}
            />
          )}
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
