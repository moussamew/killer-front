import { Fragment, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import Share from '@/assets/icons/share.svg';
import { AlertMessage } from '@/components/AlertMessage';
import { Button } from '@/components/Button';
import { JOIN_ROOM_ROUTE } from '@/constants/endpoints';
import { successStyle } from '@/constants/styles';
import t from '@/helpers/translate';
import { useCreateNavigatorClipboard } from '@/services/common/mutations';

export function ShareRoomLink(): JSX.Element {
  const { roomCode } = useParams();
  const [alertMessage, setAlertMessage] = useState('');

  const { createNavigatorClipboard } = useCreateNavigatorClipboard();

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
      onSuccess: () => {
        toast.success(t('common.link_saved'), successStyle);
      },
      onError: () =>
        setAlertMessage(t('common.link_without_clipboard', { roomLink })),
    });
  };

  return (
    <Fragment>
      <Button
        content={t('room.share_room_link')}
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
