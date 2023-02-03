import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { ReactComponent as ShareIcon } from '@/assets/icons/share.svg';
import { Button } from '@/components/Button';
import { JOIN_ROOM_ROUTE } from '@/constants/endpoints';
import { errorStyle, successStyle } from '@/constants/styles';
import { useTranslation } from '@/hooks/useTranslation';
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
      return void toast.error(t('notification.link.saved.error'), errorStyle);
    }

    return createNavigatorClipboard.mutateAsync(roomLink, {
      onSuccess: () => {
        toast.success(t('notification.link.saved.success'), successStyle);
      },
      onError: () => {
        toast.error(t('notification.link.saved.error'), errorStyle);
      },
    });
  };

  return (
    <Button
      content={t('room.share.link.button')}
      icon={<ShareIcon />}
      onClick={saveRoomLink}
    />
  );
}
