import { useTranslation } from '@killerparty/intl';
import { LoaderCircle, PlusCircle, SquarePen } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

import { avatarList, Gallery } from '@/components/Gallery';
import { Button } from '@/components/ui/Button';
import { type CarouselApi } from '@/components/ui/Carousel';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/Drawer';
import { Input } from '@/components/ui/Input';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';
import { useCreatePlayer, useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';
import { useCreateRoom } from '@/services/room/mutations';

import { ChooseGameMode } from './ChooseGameMode';
import { type Mode, modes } from './constants';
import { GameCarousel } from './GameCarousel';
import styles from './styles/CreateRoomV2.module.css';

interface Props {
  defaultAvatar: string;
  setDefaultAvatar: (avatar: string) => void;
}

export function CreateRoomV2({ defaultAvatar, setDefaultAvatar }: Props) {
  const { t } = useTranslation();
  const { session } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pseudo, setPseudo] = useState<string | null>(session?.name ?? null);
  const [isModeOpen, setIsModeOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(modes[0]);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [open, setOpen] = useState(false);
  const { createPlayer } = useCreatePlayer();
  const { updatePlayer } = useUpdatePlayer();
  const { createRoom } = useCreateRoom();

  const currentAvatar = useMemo(
    () => session?.avatar ?? defaultAvatar,
    [session, defaultAvatar],
  );

  useEffect(() => {
    if (carouselApi) {
      carouselApi.scrollTo(mode.id);

      carouselApi.on('select', ({ selectedScrollSnap }) => {
        const selectedScroll = selectedScrollSnap();

        if (mode.id !== selectedScroll) {
          setMode(modes[selectedScroll]);
        }
      });
    }
  }, [carouselApi, mode]);

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

    setOpen(false);
  };

  const isCreationRoomPending =
    createPlayer.isPending || updatePlayer.isPending || createRoom.isPending;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="lg">
          {t('home.create.room.button')}
          <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent title="Création de partie">
        <div className="lg:grid mx-8 m-auto lg:grid-cols-2 gap-8">
          <div className="flex items-start justify-center shadow-md rounded-lg p-8 bg-brand">
            <div className="mx-auto grid gap-6">
              <div className="grid gap-2 text-center" />
              <div className={styles.avatar}>{avatarList[currentAvatar]}</div>
              <Typography.H3
                className={cn(
                  'text-center text-slate-500 cursor-pointer hover:text-slate-800 transition duration-500 hover:scale-105 flex items-center justify-center',
                  { 'text-slate-800': pseudo },
                )}
                onClick={() => inputRef.current?.focus()}
              >
                <>
                  {pseudo || '[Choisir un nom..]'}
                  {pseudo && <SquarePen className="ml-2" />}
                </>
              </Typography.H3>
              <Gallery
                currentAvatar={currentAvatar}
                setCurrentAvatar={setDefaultAvatar}
              />
              <div className="flex flex-col">
                <div className="flex flex-row gap-4 mb-4">
                  <Input
                    ref={inputRef}
                    id="pseudo"
                    type="text"
                    placeholder="Bruce Wayne"
                    required
                    className="w-1/2"
                    value={pseudo ?? ''}
                    onChange={(e) => setPseudo(e.target.value)}
                  />
                  <ChooseGameMode
                    isModeOpen={isModeOpen}
                    mode={mode}
                    setIsModeOpen={setIsModeOpen}
                    setMode={setMode}
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
          </div>
          <div className="shadow-md rounded-lg p-8 bg-brand">
            {mode.value === 'game master' && (
              <div className="text-center">
                <Typography.H3 className="my-4">
                  {t('create.room.game.master.mode.title')}
                </Typography.H3>
                <p>{t('create.room.game.master.mode.description')}</p>
              </div>
            )}
            {mode.value === 'player' && (
              <div className=" text-center">
                <Typography.H3 className="my-4">
                  {t('create.room.free.for.all.mode.title')}
                </Typography.H3>
                <p>{t('create.room.free.for.all.mode.description')}</p>
              </div>
            )}
            <GameCarousel setApi={setCarouselApi} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
