import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { ReactComponent as ShareIcon } from '@/assets/icons/share.svg';
import { Button } from '@/components/Button';
import { JOIN_ROOM_ROUTE } from '@/constants/endpoints';
import { errorStyle, successStyle } from '@/constants/styles';
import { t } from '@/helpers/translate';
import { useCreateNavigatorClipboard } from '@/services/common/mutations';

export function ShareRoomLink(): JSX.Element {
  const { roomCode } = useParams();

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
      return void toast.error(t('common.link_error'), errorStyle);
    }

    return createNavigatorClipboard.mutateAsync(roomLink, {
      onSuccess: () => {
        toast.success(t('common.link_saved'), successStyle);
      },
      onError: () => {
        toast.error(t('common.link_error'), errorStyle);
      },
    });
  };

  return (
    <Button
      content={t('room.share_room_link')}
      icon={<ShareIcon />}
      onClick={saveRoomLink}
    />
  );
}
