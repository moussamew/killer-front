import { useContext, useState } from 'react';
import tw from 'tailwind-styled-components';

import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { PlayerContext } from '@/hooks/context/player';
import { updatePlayer } from '@/layout/services/requests';

const HeadContent = tw.div`
  flex flex-row mb-2
  items-center
`;

const Title = tw.h2`
  mb-0
`;

const TextContent = tw.div`
  mb-1
`;

export const LeaveRoomModal = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('');

  const { refreshPlayerSession } = useContext(PlayerContext);
  const { closeModal } = useContext(ModalContext);

  const leaveRoom = async (): Promise<void> =>
    updatePlayer({ roomCode: null })
      .then(refreshPlayerSession)
      .then(closeModal)
      .catch((error) => setErrorMessage(error.message));

  return (
    <div>
      <HeadContent>
        <Title>{t('room.leave_room')}</Title>
      </HeadContent>
      <TextContent>
        <p>{t('room.leave_room_warning')}</p>
      </TextContent>
      <Button content={t('room.leave_room_confirmation')} onClick={leaveRoom} />
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          closeMessage={() => setErrorMessage('')}
        />
      )}
    </div>
  );
};
