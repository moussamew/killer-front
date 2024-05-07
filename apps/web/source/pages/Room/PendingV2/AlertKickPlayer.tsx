import { useTranslation } from '@killerparty/intl';
import { LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

interface AlertKickPlayerProps {
  playerId: number;
  playerName: string;
}

export function AlertKickPlayer({
  playerId,
  playerName,
}: AlertKickPlayerProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();

  const isCurrentPlayer = session?.id === playerId;

  const handleKickPlayer = async () => {
    await updatePlayer.mutateAsync({ id: playerId, room: null });

    toast.success(
      isCurrentPlayer
        ? t('room.leave.confirmed.message')
        : t('room.kick.confirmed.message', { playerName }),
    );

    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        className="h-8 w-8"
        variant="destructive"
        size="icon"
      >
        <X className="h-4" />
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isCurrentPlayer
              ? t('alert.leave.warning.title')
              : t('alert.kick.warning.title', { playerName })}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isCurrentPlayer
              ? t('alert.leave.warning.description')
              : t('alert.kick.warning.description', { playerName })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <Button
            disabled={updatePlayer.isPending}
            variant="destructive"
            onClick={handleKickPlayer}
          >
            {updatePlayer.isPending && (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Chargement..
              </>
            )}
            {!updatePlayer.isPending &&
              isCurrentPlayer &&
              t('room.leave.confirm.button')}
            {updatePlayer.isPending &&
              !isCurrentPlayer &&
              t('room.kick.confirm.button', { playerName })}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
