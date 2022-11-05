import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Share from '@/assets/icons/share.svg';
import { AlertMessage } from '@/components/AlertMessage';
import { Button } from '@/components/Button';
import { RESET_STATE_DELAY_MS } from '@/constants/common';
import { JOIN_ROOM_ROUTE } from '@/constants/endpoints';
import t from '@/helpers/translate';
import { useCreateNavigatorClipboard } from '@/services/common/mutations';

export function ShareRoomLink(): JSX.Element {
  const { roomCode } = useParams();
  const [alertMessage, setAlertMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { createNavigatorClipboard } = useCreateNavigatorClipboard();

  /**
   * Remove the success message after a specific delay.
   */
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => setSuccessMessage(''), RESET_STATE_DELAY_MS);
    }
  }, [successMessage]);

  const saveRoomLink = async (): Promise<void> => {
    const roomLink = `${JOIN_ROOM_ROUTE}/${roomCode}`;

    if (navigator.share) {
      return navigator.share({
        title: 'Killerparty',
        text: t('room.share_room_text'),
        url: roomLink,
      });
    }

    if (!navigator.clipboard) {
      return setAlertMessage(t('common.link_without_clipboard', { roomLink }));
    }

    return createNavigatorClipboard.mutate(roomLink, {
      onSuccess: () => setSuccessMessage(t('common.link_saved')),
      onError: () =>
        setAlertMessage(t('common.link_without_clipboard', { roomLink })),
    });
  };

  return (
    <Fragment>
      <Button
        content={successMessage || t('room.share_room_link')}
        icon={Share}
        onClick={saveRoomLink}
      />
      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          closeMessage={() => setAlertMessage('')}
        />
      )}
    </Fragment>
  );
}
