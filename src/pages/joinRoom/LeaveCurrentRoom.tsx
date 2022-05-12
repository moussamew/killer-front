import { Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
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
      <h1>{t('join_room.already_inside_room', { playerRoomCode })}</h1>
      <p>{t('join_room.careful_before_join_room')}</p>
      <Button content={t('join_room.join_the_room')} onClick={handleJoinRoom} />
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          closeMessage={() => setErrorMessage('')}
        />
      )}
      <Button
        content={t('join_room.return_current_room')}
        onClick={() => navigate(`/room/${playerRoomCode}`)}
        buttonColor="bg-yellow-200"
        textColor="text-lightDark"
      />
    </Fragment>
  );
};
