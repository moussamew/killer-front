import { useTranslation } from '@killerparty/intl';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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
import { useCreateMission } from '@/services/mission/mutations';

import { MissionsTable } from './MissionsTable';

export function RoomMissions() {
  const { t } = useTranslation();
  const { createMission } = useCreateMission();
  const [mission, setMission] = useState('');

  const handleCreateMission = async (): Promise<void> => {
    await createMission.mutateAsync(mission);

    toast.success(t('toast.mission.created'));

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
      <CardContent>
        <MissionsTable />
      </CardContent>
      <CardFooter className="flex flex-col justify-center items-center">
        <div className="flex items-center gap-2 w-full">
          <Input
            value={mission}
            onChange={({ target }) => setMission(target.value)}
            placeholder={t('room.mission.placeholder')}
          />
          <Button
            size="sm"
            variant="secondary"
            disabled={!mission || createMission.isPending}
            onClick={handleCreateMission}
          >
            {createMission.isPending ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Création en cours..
              </>
            ) : (
              t('room.create.new.mission.button')
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
