import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';

import { kickPlayerFromRoom } from './services/requests';

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

interface Props {
  playerName: string;
  playerId: number;
}

export const KickPlayerModal = ({
  playerName,
  playerId,
}: Props): JSX.Element => {
  const { roomCode } = useParams();

  const [errorMessage, setErrorMessage] = useState('');

  const { closeModal } = useContext(ModalContext);

  const kickPlayer = (): Promise<void> =>
    kickPlayerFromRoom(roomCode!, playerId)
      .then(closeModal)
      .catch((error) => setErrorMessage(error.message));

  return (
    <div>
      <HeadContent>
        <Title>{t('room.kick_room')}</Title>
      </HeadContent>
      <TextContent>
        <p>{t('room.kick_room_warning', { playerName })}</p>
      </TextContent>
      <Button
        content={t('room.kick_room_confirmation', { playerName })}
        onClick={kickPlayer}
      />
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          closeMessage={() => setErrorMessage('')}
        />
      )}
    </div>
  );
};
