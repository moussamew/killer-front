import { useTranslation } from '@killerparty/intl';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/Drawer';

import { ChooseRoom } from './ChooseRoom';
import { CreatePlayer } from './CreatePlayer';

interface Props {
  defaultAvatar: string;
  setDefaultAvatar: (avatar: string) => void;
  pseudo?: string | null;
  setPseudo: (pseudo: string) => void;
}

export function JoinRoomDrawer({
  defaultAvatar,
  setDefaultAvatar,
  pseudo,
  setPseudo,
}: Props) {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" size="lg">
          {t('home.join.room')}
        </Button>
      </DrawerTrigger>
      <DrawerContent title="Rejoindre une partie">
        <div className="flex mx-8 m-auto gap-8">
          <CreatePlayer
            defaultAvatar={defaultAvatar}
            setDefaultAvatar={setDefaultAvatar}
            pseudo={pseudo}
            setPseudo={setPseudo}
          />
          <ChooseRoom pseudo={pseudo} defaultAvatar={defaultAvatar} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
