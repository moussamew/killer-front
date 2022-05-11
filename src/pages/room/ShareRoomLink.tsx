import { Fragment, useState } from 'react';

import Share from '@/assets/icons/share.svg';
import { Button } from '@/components/Button';
import { Message } from '@/components/Message';
import t from '@/helpers/translate';

interface Props {
  roomCode: string;
}

export const ShareRoomLink = ({ roomCode }: Props): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const saveRoomLink = async (): Promise<void> => {
    const roomLink = `${window.location.origin}/join/${roomCode}`;

    if (navigator.share) {
      return navigator.share({
        title: 'Killerparty',
        url: roomLink,
      });
    }

    if (!navigator.clipboard) {
      return setErrorMessage(t('room.share_room_link_error', { roomLink }));
    }

    return navigator.clipboard
      .writeText(`${window.location.origin}/join/${roomCode}`)
      .then(() => setSuccessMessage(t('room.share_room_link_success')))
      .catch(() =>
        setErrorMessage(t('room.share_room_link_error', { roomLink })),
      );
  };

  return (
    <Fragment>
      <Button
        content={t('room.share_room_link')}
        icon={Share}
        onClick={saveRoomLink}
      />
      {successMessage && (
        <Message
          successMessage={successMessage}
          closeMessage={() => setSuccessMessage('')}
        />
      )}
      {errorMessage && (
        <Message
          errorMessage={errorMessage}
          closeMessage={() => setErrorMessage('')}
        />
      )}
    </Fragment>
  );
};
