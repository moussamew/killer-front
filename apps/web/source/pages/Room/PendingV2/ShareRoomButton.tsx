import { useTranslation } from '@killerparty/intl';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { JOIN_ROOM_ROUTE } from '@/constants/endpoints';
import { onEnter } from '@/helpers/keys';

export default function ShareRoomButton() {
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
    <Card className="w-1/3 bg-brand-foreground">
      <CardHeader className="pb-2">
        <CardDescription>Code de la partie</CardDescription>
        <CardTitle className="text-4xl">{roomCode}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          Inviter de nouveaux joueurs en partageant le code ou en utilisant le
          lien de partage.
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="secondary"
          onClick={saveRoomLink}
          onKeyDown={({ key }) => onEnter({ key, fn: saveRoomLink })}
        >
          {t('room.share.link.button')}
        </Button>
      </CardFooter>
    </Card>
  );
}
