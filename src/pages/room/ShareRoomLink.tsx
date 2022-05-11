import { Fragment, useEffect, useState } from 'react';

import Share from '@/assets/icons/share.svg';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { RESET_STATE_DELAY_MS } from '@/constants/common';
import t from '@/helpers/translate';

interface Props {
  roomCode: string;
}

export const ShareRoomLink = ({ roomCode }: Props): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Remove the success message after a specific delay.
   */
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => setSuccessMessage(''), RESET_STATE_DELAY_MS);
    }
  });

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
        content={successMessage || t('room.share_room_link')}
        icon={Share}
        onClick={saveRoomLink}
      />
      {errorMessage && (
        <ErrorMessage
          errorMessage={errorMessage}
          closeMessage={() => setErrorMessage('')}
        />
      )}
    </Fragment>
  );
};
