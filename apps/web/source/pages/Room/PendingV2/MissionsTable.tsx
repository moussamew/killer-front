import { useTranslation } from '@killerparty/intl';
import Lottie from 'lottie-react';
import { Loader2, LoaderCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import EmptyMissions from '@/assets/lotties/empty-missions.json';
import { avatarList } from '@/components/Gallery';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { useDeleteMission } from '@/services/mission/mutations';
import { useSession } from '@/services/player/queries';
import { type Session } from '@/services/player/types';

import styles from './MissionsTable.module.css';

function Placeholder() {
  return (
    <Table>
      <TableHeader className="w-full">
        <TableRow>
          <TableHead>Description de la mission</TableHead>
          <TableHead className="text-right">Créer par</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3].map((value) => (
          <TableRow key={value}>
            <TableCell>
              <div className="hidden text-md text-primary font-medium md:inline">
                <Skeleton className="h-2 w-2/3" />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-8 ml-auto mr-4 rounded-full" />
            </TableCell>
            <TableCell className="flex justify-end items-center gap-2">
              <Skeleton className="h-8 w-8 mr-2" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function MissionsTable() {
  const { t } = useTranslation();
  const { deleteMission } = useDeleteMission();
  const { session, isLoading } = useSession();
  const [deletedMissionId, setDeletedMissionId] = useState<number | null>(null);

  const handleDeleteMission = async (missionId: number) => {
    setDeletedMissionId(missionId);

    await deleteMission.mutateAsync(missionId);

    setDeletedMissionId(null);

    toast.success(t('toast.mission.deleted'));
  };

  if (!session || isLoading) {
    return <Placeholder />;
  }

  if (!session.authoredMissions.length) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Lottie
          className="h-[150px] lg:h-[200px]"
          animationData={EmptyMissions}
        />
        <p className="text-primary text-sm mb-8">{t('room.missions.empty')}</p>
      </div>
    );
  }

  return (
    <div className="h-[275px] overflow-y-auto">
      <Table>
        <TableHeader className="w-full">
          <TableRow>
            <TableHead>Description de la mission</TableHead>
            <TableHead className="text-right">Créer par</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {session.authoredMissions.map((mission) => (
            <TableRow key={mission.id}>
              <TableCell>
                <div className="hidden text-md text-primary font-medium md:inline">
                  {mission.content}
                </div>
              </TableCell>
              <TableCell>
                <div className={styles.avatar}>
                  {avatarList[session.avatar]}
                </div>
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button
                  disabled={deleteMission.isPending}
                  onClick={() => handleDeleteMission(mission.id)}
                  className="h-8 w-8 mr-2"
                  variant="destructive"
                  size="icon"
                >
                  {deleteMission.isPending &&
                  deletedMissionId === mission.id ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
