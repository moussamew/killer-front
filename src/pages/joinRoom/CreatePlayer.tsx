import { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import t from '@/helpers/translate';
import { PlayerContext } from '@/hooks/context/player';

import { createPlayer } from '../home/services/requests';

interface Props {
  roomCode: string;
}

export const CreatePlayer = ({ roomCode }: Props): JSX.Element => {
  const [pseudo, setPseudo] = useState('');

  const { refreshPlayerSession } = useContext(PlayerContext);

  const navigate = useNavigate();

  const handleJoinRoom = async (): Promise<void> =>
    createPlayer({ name: pseudo, roomCode }).then(refreshPlayerSession);

  return (
    <Fragment>
      <h1>{t('join_room.no_pseudo')}</h1>
      <p>{t('join_room.create_pseudo')}</p>
      <Input
        id="setPseudo"
        placeholder={t('common.create_pseudo_placeholder')}
        value={pseudo}
        onChange={({ target }) => setPseudo(target.value.toUpperCase())}
      />

      <Button
        content={t('join_room.join_the_room', { roomCode })}
        onClick={handleJoinRoom}
      />
      <Button
        content={t('join_room.create_room')}
        onClick={() => navigate('/')}
        buttonColor="bg-yellow-200"
        textColor="text-lightDark"
      />
    </Fragment>
  );
};
