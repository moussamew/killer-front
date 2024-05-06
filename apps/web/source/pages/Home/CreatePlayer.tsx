import { useTranslation } from '@killerparty/intl';
import { useMemo, useRef } from 'react';

import { avatarList, Gallery } from '@/components/Gallery';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';
import { useSession } from '@/services/player/queries';

import styles from './styles/CreateRoomV2.module.css';

interface CreatePlayerProps {
  defaultAvatar: string;
  setDefaultAvatar: (avatar: string) => void;
  pseudo?: string | null;
  setPseudo: (pseudo: string) => void;
}

export function CreatePlayer({
  defaultAvatar,
  setDefaultAvatar,
  pseudo,
  setPseudo,
}: CreatePlayerProps) {
  const { session } = useSession();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const currentAvatar = useMemo(
    () => session?.avatar ?? defaultAvatar,
    [session, defaultAvatar],
  );

  return (
    <div className="flex flex-col justify-between w-1/2 gap-8 shadow-md rounded-lg p-8 bg-brand mx-auto">
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
        <div className="flex flex-col gap-4">
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
      </div>
    </div>
  );
}
