import { useTranslation } from '@killerparty/intl';
import { LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { useCreatePlayer, useUpdatePlayer } from '@/services/player/mutations';
import { useCreateRoom } from '@/services/room/mutations';

import { type ActionButtonProps } from './CreatePlayer';

export function JoinRoomButton({ pseudo }: ActionButtonProps) {
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
      size="lg"
      className="transition-opacity ease-in duration-500"
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
