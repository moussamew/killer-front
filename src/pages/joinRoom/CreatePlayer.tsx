import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Message } from '@/components/Message';
import t from '@/helpers/translate';

import { createPlayer } from '../home/services/requests';

interface Props {
  roomCode?: string;
  refreshPlayerSession: () => Promise<void>;
}

export const CreatePlayer = ({
  roomCode,
  refreshPlayerSession,
}: Props): JSX.Element => {
  const [pseudo, setPseudo] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();

  const navigate = useNavigate();

  const handleJoinRoom = (): Promise<void> =>
    createPlayer({ name: pseudo, roomCode })
      .then(refreshPlayerSession)
      .catch((error) => setErrorMessage(error.message));

  return (
    <Fragment>
      <h1>{t('joinRoom.no_pseudo')}</h1>
      <p>{t('joinRoom.create_pseudo')}</p>
      <Input
        id="setPseudo"
        placeholder={t('generic.create_pseudo_placeholder')}
        value={pseudo}
        onChange={({ target }) => setPseudo(target.value.toUpperCase())}
      />
      {errorMessage && (
        <Message
          errorMessage={errorMessage}
          closeMessage={() => setErrorMessage('')}
        />
      )}
      <Button
        content={t('joinRoom.join_the_room', { roomCode })}
        onClick={handleJoinRoom}
      />
      <Button
        content={t('joinRoom.create_room')}
        onClick={() => navigate('/')}
        buttonColor="bg-yellow-200"
        textColor="text-lightDark"
      />
    </Fragment>
  );
};
