import { Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Message } from '@/components/Message';
import t from '@/helpers/translate';
import { updatePlayer } from '@/layout/services/requests';

interface Props {
  playerRoomCode?: string;
  refreshPlayerSession: () => Promise<void>;
}

export const LeaveCurrentRoom = ({
  playerRoomCode,
  refreshPlayerSession,
}: Props): JSX.Element => {
  const { roomCode } = useParams();

  const [errorMessage, setErrorMessage] = useState<string>();

  const navigate = useNavigate();

  const handleJoinRoom = (): Promise<void> =>
    updatePlayer({ roomCode })
      .then(refreshPlayerSession)
      .catch((error) => setErrorMessage(error.message));

  return (
    <Fragment>
      <h1>{t('joinRoom.already_inside_room', { playerRoomCode })}</h1>
      <p>{t('joinRoom.careful_before_join_room')}</p>
      <Button
        content={t('joinRoom.join_the_room', { roomCode })}
        onClick={handleJoinRoom}
      />
      {errorMessage && (
        <Message
          errorMessage={errorMessage}
          closeMessage={() => setErrorMessage('')}
        />
      )}
      <Button
        content={t('joinRoom.return_current_room')}
        onClick={() => navigate(`/room/${playerRoomCode}`)}
        buttonColor="bg-yellow-200"
        textColor="text-lightDark"
      />
    </Fragment>
  );
};
