import { type TranslationKey, useTranslation } from '@killerparty/intl';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { type Room } from '@/services/room/types';

function Placeholder() {
  return (
    <Card className="w-1/3 bg-brand-foreground">
      <CardHeader className="pb-2">
        <CardDescription>
          <Skeleton className="h-2 w-2/3 mt-2" />
        </CardDescription>
        <CardTitle className="text-4xl">
          <Skeleton className="h-8 w-[80%] mt-2" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-2 w-[90%] mt-2" />
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Skeleton className="h-10 w-3/4 mr-auto mt-1" />
      </CardFooter>
    </Card>
  );
}

interface LaunchGameButtonProps {
  room?: Room;
}

export function LaunchGameButton({ room }: LaunchGameButtonProps) {
  const { t } = useTranslation();

  if (!room) {
    return <Placeholder />;
  }

  return (
    <Card className="w-1/3 bg-brand-foreground flex flex-col">
      <CardHeader className="pb-2">
        <CardDescription>{t('room.players.card.title')}</CardDescription>
        <CardTitle className="text-4xl">
          {t('room.players.count' as TranslationKey, {
            count: room.players.length,
          })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          {t('room.players.missing.count' as TranslationKey, {
            count: 3 - room.players.length,
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={room.players.length < 3}>
          {t('room.start.party.button')}
        </Button>
      </CardFooter>
    </Card>
  );
}
