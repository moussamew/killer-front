import clsx from 'clsx';
import { Crown } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { avatarList } from '@/components/Gallery';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { useSession } from '@/services/player/queries';
import { useRoom } from '@/services/room/queries';

import { AlertKickPlayer } from './AlertKickPlayer';
import styles from './PlayerList.module.css';

export default function PlayerList() {
  const { roomCode } = useParams();
  const { room } = useRoom(roomCode!);
  const { session } = useSession();

  return (
    <Card className="w-1/3 bg-brand-foreground">
      <CardHeader>
        <CardTitle>Liste des joueurs</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {room?.players.map(({ id, name, avatar }) => (
          <div key={id} className="flex items-center gap-4">
            <div
              className={clsx(styles.avatar, {
                [styles.currentPlayer]: session?.id === id,
                [styles.otherPlayer]: session?.id !== id,
              })}
            >
              {avatarList[avatar]}
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-sm text-muted-foreground">
                À écrit 10 missions
              </p>
            </div>
            <div className="flex ml-auto gap-2">
              {(room.admin.id === session?.id || session?.id === id) && (
                <AlertKickPlayer playerId={id} playerName={name} />
              )}
              {room.admin.id !== session?.id && room.admin.id === id && (
                <Button
                  className="h-8 w-8 bg-yellow-300 border-yellow-300 hover:bg-yellow-400"
                  variant="outline"
                  size="icon"
                >
                  <Crown className="h-4 fill-yellow-400 stroke-yellow-600" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter />
    </Card>
  );
}
