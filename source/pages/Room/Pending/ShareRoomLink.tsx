import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import { JOIN_ROOM_ROUTE } from '@/constants/endpoints';
import { useCreateNavigatorClipboard } from '@/services/common/mutations';

export function ShareRoomLink(): JSX.Element {
  const { roomCode } = useParams();
  const { t } = useTranslation();

  const { createNavigatorClipboard } = useCreateNavigatorClipboard();

  const saveRoomLink = async (): Promise<void> => {
    const roomLink = `${JOIN_ROOM_ROUTE}/${roomCode}`;

    if (navigator.share) {
      return navigator.share({
        title: 'Killerparty',
        text: t('room.share.link.message'),
        url: roomLink,
      });
    }

    if (!navigator.clipboard) {
      return void toast.error(t('notification.link.saved.error'));
    }

    return createNavigatorClipboard.mutateAsync(roomLink, {
      onSuccess: () => {
        toast.success(t('notification.link.saved.success'));
      },
      onError: () => {
        toast.error(t('notification.link.saved.error'));
      },
    });
  };

  return (
    <Button color="secondary" onClick={saveRoomLink}>
      {t('room.share.link.button')}
    </Button>
  );
}
