import { useTranslation } from '@killerparty/intl';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/Button';
import { JOIN_ROOM_ROUTE } from '@/constants/endpoints';

export function ShareRoomLink(): JSX.Element {
  const { roomCode } = useParams();
  const { t } = useTranslation();

  const saveRoomLink = async (): Promise<void> => {
    const roomLink = `${JOIN_ROOM_ROUTE}/${roomCode}`;

    if (navigator.share) {
      return navigator.share({
        title: 'Killerparty',
        text: t('room.share.link.message'),
        url: roomLink,
      });
    }

    return navigator.clipboard
      .writeText(roomLink)
      .then(() => {
        toast.success(t('notification.link.saved.success'));
      })
      .catch(() => {
        toast.error(t('notification.link.saved.error'));
      });
  };

  return (
    <Button color="secondary" onClick={saveRoomLink}>
      {t('room.share.link.button')}
    </Button>
  );
}
