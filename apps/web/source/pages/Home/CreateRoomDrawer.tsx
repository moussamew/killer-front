import { useTranslation } from '@killerparty/intl';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/Drawer';
import { type GameMode } from '@/constants/types';

import { ChooseGameMode } from './ChooseGameMode';
import { GAME_MODES } from './constants';
import { CreatePlayer } from './CreatePlayer';

interface CreateRoomDrawerProps {
  defaultAvatar: string;
  setDefaultAvatar: (avatar: string) => void;
  pseudo?: string | null;
  setPseudo: (pseudo: string) => void;
}

export function CreateRoomDrawer({
  defaultAvatar,
  setDefaultAvatar,
  pseudo,
  setPseudo,
}: CreateRoomDrawerProps) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<GameMode>(GAME_MODES[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        <Button size="lg">{t('home.create.room.button')}</Button>
      </DrawerTrigger>
      <DrawerContent title="Création de partie">
        <div className="flex mx-8 m-auto gap-8">
          <CreatePlayer
            defaultAvatar={defaultAvatar}
            setDefaultAvatar={setDefaultAvatar}
            pseudo={pseudo}
            setPseudo={setPseudo}
          />
          <ChooseGameMode
            defaultAvatar={defaultAvatar}
            pseudo={pseudo}
            mode={mode}
            setMode={setMode}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
