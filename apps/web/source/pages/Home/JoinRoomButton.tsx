import { useTranslation } from '@killerparty/intl';
import { LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { useCreatePlayer, useUpdatePlayer } from '@/services/player/mutations';
import { useCreateRoom } from '@/services/room/mutations';

interface JoinRoomButtonProps {
  pseudo?: string | null;
}

export function JoinRoomButton({ pseudo }: JoinRoomButtonProps) {
  const { t } = useTranslation();
  const { createPlayer } = useCreatePlayer();
  const { updatePlayer } = useUpdatePlayer();
  const { createRoom } = useCreateRoom();

  const handleJoinRoom = async () => {};

  const isCreationRoomPending =
    createPlayer.isPending || updatePlayer.isPending || createRoom.isPending;

  return (
    <Button
      disabled={!pseudo || isCreationRoomPending}
      onClick={handleJoinRoom}
      variant="secondary"
      size="lg"
      className="w-full transition-opacity ease-in duration-500"
    >
      {isCreationRoomPending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Chargement de la partie..
        </>
      ) : (
        t('home.join.room.confirm.button')
      )}
    </Button>
  );
}
