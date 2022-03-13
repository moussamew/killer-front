import { useContext, useState } from 'react';
import tw from 'tailwind-styled-components';

import Edit from 'assets/icons/edit.svg';
import Logout from 'assets/icons/logout.svg';
import { Button, Input, Modal } from 'components';
import t from 'helpers/translate';
import { PlayerContext } from 'hooks/context';

import { updatePlayer } from './services/requests';

const H3 = tw.h3`
  text-center
`;

const UserAction = tw.div`
  flex flex-row justify-between
`;

const Spacer = tw.hr`
  my-1
`;

const Image = tw.img`
  ml-1 cursor-pointer
`;

const UpdatePseudoSection = tw.section`
  
`;

interface Props {
  closeModal: () => void;
}

const SettingsModal = ({ closeModal }: Props): JSX.Element => {
  const { playerSession, refreshPlayerSession } = useContext(PlayerContext);

  const [isPseudoInputOpen, togglePseudoInput] = useState(false);
  const [pseudo, setPseudo] = useState('');

  const updatePseudo = async (): Promise<void> => {
    await updatePlayer({ name: pseudo });
    await refreshPlayerSession();

    closeModal();
  };

  const exitRoom = async (): Promise<void> => {
    // TODO: Use updatePlayer with roomCode setted to null when backend will be ready.
  };

  return (
    <Modal closeModal={closeModal}>
      <H3>{t('layout.user_settings')}</H3>
      <UserAction onClick={exitRoom}>
        <p>{t('layout.leave_room')}</p>
        <Image alt="exitRoom" src={Logout} />
      </UserAction>
      <Spacer />
      <UserAction onClick={(): void => togglePseudoInput(!isPseudoInputOpen)}>
        <p>{t('layout.update_pseudo')}</p>
        <Image alt="editPseudo" src={Edit} />
      </UserAction>
      {isPseudoInputOpen && (
        <UpdatePseudoSection>
          <Input
            id="editPseudo"
            value={pseudo}
            onChange={(e): void => setPseudo(e.target.value)}
            placeholder={playerSession.name}
          />
          <Button onClick={updatePseudo} disabled={!pseudo}>
            {t('layout.save_changes')}
          </Button>
        </UpdatePseudoSection>
      )}
    </Modal>
  );
};

export default SettingsModal;
