import { Fragment, useContext, useState } from 'react';
import tw from 'tailwind-styled-components';

import Edit from 'assets/icons/edit.svg';
import Logout from 'assets/icons/logout.svg';
import Settings from 'assets/icons/settings.svg';
import { Button, Input } from 'components';
import t from 'helpers/translate';
import { ModalContext } from 'hooks/context/modal';
import { PlayerContext } from 'hooks/context/player';

import { updatePlayer } from '../services/requests';

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

const SettingsModal = (): JSX.Element => {
  const { playerSession, refreshPlayerSession } = useContext(PlayerContext);
  const { closeModal } = useContext(ModalContext);

  const [isPseudoInputOpen, togglePseudoInput] = useState(false);
  const [pseudo, setPseudo] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();

  const updatePseudo = (): Promise<void> =>
    updatePlayer({ name: pseudo })
      .then(refreshPlayerSession)
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
      <Action onClick={(): void => togglePseudoInput(!isPseudoInputOpen)}>
        <Text>{t('layout.update_pseudo')}</Text>
        <img alt="editPseudo" src={Edit} />
      </Action>
      {isPseudoInputOpen && (
        <Fragment>
          <Spacer />
          <Input
            id="editPseudo"
            value={pseudo}
            onChange={(e): void => setPseudo(e.target.value)}
            placeholder={playerSession.name}
            errorMessage={errorMessage}
          />
          <Button onClick={updatePseudo} disabled={!pseudo}>
            {t('layout.save_changes')}
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SettingsModal;
