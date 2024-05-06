import { useTranslation } from '@killerparty/intl';
import { LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/Button';

interface JoinRoomButtonProps {
  pseudo?: string | null;
  roomCode: string;
  handleJoinRoom: () => Promise<void>;
  isLoading: boolean;
}

export function JoinRoomButton({
  pseudo,
  roomCode,
  handleJoinRoom,
  isLoading,
}: JoinRoomButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      disabled={!pseudo || isLoading || roomCode.length < 5}
      onClick={handleJoinRoom}
      variant="secondary"
      size="lg"
      className="transition-opacity ease-in duration-500"
    >
      {isLoading ? (
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
