import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { type Room } from '@/services/room/types';

function Placeholder() {
  return (
    <Card className="w-1/3 bg-brand-foreground">
      <CardHeader className="pb-2">
        <CardDescription>
          <Skeleton className="h-2 w-2/3 mt-2" />
        </CardDescription>
        <CardTitle className="text-4xl">
          <Skeleton className="h-8 w-full mt-2" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-3/4 mt-2" />
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full mt-1" />
      </CardFooter>
    </Card>
  );
}

interface MissionsProgressProps {
  room?: Room;
}

export function MissionProgress({ room }: MissionsProgressProps) {
  if (!room) return <Placeholder />;

  const percentage = (room.missions.length / room.players.length) * 100;

  return (
    <Card className="w-1/3 bg-brand-foreground">
      <CardHeader className="pb-2">
        <CardDescription>Nombre de missions</CardDescription>
        <CardTitle className="text-4xl">
          {room?.missions.length} missions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          Il faut au minimum le même nombre de missions que de joueurs
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {room.missions.length >= room.players.length ? (
          <Progress value={percentage} aria-label={`${percentage}%`} />
        ) : (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Progress value={percentage} aria-label={`${percentage}%`} />
              </TooltipTrigger>
              <TooltipContent>
                {room.missions.length < room.players.length && (
                  <p className="text-xs text-muted-foreground">
                    {`${room.missions.length} / ${room.players.length} missions
                    ajoutées`}
                  </p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardFooter>
    </Card>
  );
}
