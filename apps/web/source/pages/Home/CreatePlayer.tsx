import { useTranslation } from '@killerparty/intl';
import { LoaderCircle, SquarePen } from 'lucide-react';
import {
  type Dispatch,
  type SetStateAction,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';

import { avatarList, Gallery } from '@/components/Gallery';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';
import { useCreatePlayer, useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';
import { useCreateRoom } from '@/services/room/mutations';

import { type Mode } from './constants';
import styles from './styles/CreateRoomV2.module.css';

interface CreatePlayerProps {
  defaultAvatar: string;
  setDefaultAvatar: (avatar: string) => void;
  mode: Mode;
  setDrawerOpen: (open: boolean) => void;
}

export function CreatePlayer({
  defaultAvatar,
  setDefaultAvatar,
  mode,
  setDrawerOpen,
}: CreatePlayerProps) {
  const { session } = useSession();
  const { createPlayer } = useCreatePlayer();
  const { updatePlayer } = useUpdatePlayer();
  const { createRoom } = useCreateRoom();
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);
  const [pseudo, setPseudo] = useState<string | null>(session?.name ?? null);

  const currentAvatar = useMemo(
    () => session?.avatar ?? defaultAvatar,
    [session, defaultAvatar],
  );

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
      isGameMastered: Boolean(mode.value === 'game master'),
    });

    toast.success('Nouvelle partie créée avec succès');

    setDrawerOpen(false);
  };

  const isCreationRoomPending =
    createPlayer.isPending || updatePlayer.isPending || createRoom.isPending;

  return (
    <div className="flex flex-col justify-between w-1/2 shadow-md rounded-lg p-8 bg-brand mx-auto">
      <div className={styles.avatar}>{avatarList[currentAvatar]}</div>
      <Typography.H3
        className={cn(
          'text-center text-slate-500 cursor-pointer hover:text-slate-800 transition duration-500 hover:scale-105 flex items-center justify-center',
          { 'text-slate-800': pseudo },
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {pseudo || 'Bruce Wayne'}
      </Typography.H3>
      <Gallery
        currentAvatar={currentAvatar}
        setCurrentAvatar={setDefaultAvatar}
      />
      <div className="flex flex-col">
        <div className="flex flex-col gap-4 mb-4">
          <Label htmlFor="pseudo">{t('home.create.pseudo.placeholder')}</Label>
          <Input
            ref={inputRef}
            id="pseudo"
            type="text"
            placeholder="Bruce Wayne"
            required
            value={pseudo ?? ''}
            onChange={(e) => setPseudo(e.target.value)}
          />
        </div>
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
      </div>
    </div>
  );
}
