import { useTranslation } from '@killerparty/intl';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import { useCreatePlayer, useUpdatePlayer } from '@/services/player/mutations';
import { useCreateRoom } from '@/services/room/mutations';

import { type ActionButtonProps } from './CreatePlayer';

export function CreateRoomButton({
  pseudo,
  session,
  currentAvatar,
  mode,
}: ActionButtonProps) {
  const { t } = useTranslation();
  const { createPlayer } = useCreatePlayer();
  const { updatePlayer } = useUpdatePlayer();
  const { createRoom } = useCreateRoom();

  const handleCreateRoom = async (): Promise<void> => {
    if (!pseudo) return;

    if (session) {
      await updatePlayer.mutateAsync({
        id: session.id,
        name: pseudo,
        avatar: currentAvatar,
      });
    } else {
      await createPlayer.mutateAsync({
        name: pseudo,
        avatar: currentAvatar,
      });
    }

    await createRoom.mutateAsync({
      isGameMastered: Boolean(mode?.value === 'game master'),
    });

    toast.success('Nouvelle partie créée avec succès');
  };

  const isCreationRoomPending =
    createPlayer.isPending || updatePlayer.isPending || createRoom.isPending;

  return (
    <Button
      disabled={!pseudo || isCreationRoomPending}
      onClick={handleCreateRoom}
      size="lg"
      className="transition-opacity ease-in duration-500"
    >
      {isCreationRoomPending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Création en cours..
        </>
      ) : (
        t('home.create.room.confirm.button')
      )}
    </Button>
  );
}
