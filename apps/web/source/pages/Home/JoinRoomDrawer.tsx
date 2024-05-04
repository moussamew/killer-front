import { useTranslation } from '@killerparty/intl';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/Drawer';

import { ChooseRoom } from './ChooseRoom';
import { CreatePlayer } from './CreatePlayer';
import { JoinRoomButton } from './JoinRoomButton';

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
          <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent title="Rejoindre une partie">
        <div className="flex mx-8 m-auto gap-8">
          <CreatePlayer
            defaultAvatar={defaultAvatar}
            setDefaultAvatar={setDefaultAvatar}
            actionButton={JoinRoomButton}
            pseudo={pseudo}
            setPseudo={setPseudo}
          />
          <ChooseRoom pseudo={pseudo} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
