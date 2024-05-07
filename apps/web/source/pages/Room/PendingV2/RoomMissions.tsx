import { useTranslation } from '@killerparty/intl';
import Lottie from 'lottie-react';
import { FilePen, SquarePen } from 'lucide-react';
import { useState } from 'react';

import EmptyMissions from '@/assets/lotties/empty-missions.json';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { useCreateMission } from '@/services/mission/mutations';
import { useSession } from '@/services/player/queries';
import { type Room } from '@/services/room/types';

interface RoomMissionsProps {
  room?: Room;
}

export function RoomMissions({ room }: RoomMissionsProps) {
  const { t } = useTranslation();
  const { createMission } = useCreateMission();
  const { session } = useSession();
  const [mission, setMission] = useState('');

  const handleCreateMission = async (): Promise<void> => {
    await createMission.mutateAsync(mission);

    setMission('');
  };

  return (
    <Card className="bg-brand-foreground">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Missions</CardTitle>
          <CardDescription>Liste des missions pour la partie</CardDescription>
        </div>
      </CardHeader>
      {/*       <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mission</TableHead>
              <TableHead className="text-right">Créer par</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="hidden text-md text-primary font-medium md:inline">
                  Construire un Deltaplane
                </div>
              </TableCell>
              <TableCell className="text-sm text-right text-primary font-medium">
                Moussa
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent> */}
      <CardContent className="flex">
        <Lottie className="h-[200px] m-auto" animationData={EmptyMissions} />
      </CardContent>
      <CardFooter className="flex flex-col justify-center items-center">
        <p className="text-primary text-sm mb-8">{t('room.missions.empty')}</p>
        <div className="flex items-center gap-2 w-full">
          <Input
            value={mission}
            onChange={({ target }) => setMission(target.value)}
            placeholder="Construire un Deltaplane"
          />
          <Button
            size="sm"
            variant="secondary"
            disabled={!mission}
            onClick={handleCreateMission}
          >
            {t('room.create.new.mission.button')}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
