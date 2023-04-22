import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import { useStartParty } from '@/services/room/mutations';
import { useRoom } from '@/services/room/queries';

export function StartPartyButton(): JSX.Element {
  const { roomCode } = useParams();
  const { t } = useTranslation();
  const { startParty } = useStartParty();
  const { room } = useRoom(roomCode!);

  const handleStartParty = async (): Promise<void> => {
    await startParty.mutateAsync(roomCode!);
  };

  const allPlayersHasProposedMission = room?.players.every(
    ({ hasAtLeastOneMission }) => hasAtLeastOneMission,
  );

  return (
    <Button
      onClick={handleStartParty}
      color="primary"
      disabled={
        !room?.hasEnoughMissions ||
        !room?.hasEnoughPlayers ||
        !allPlayersHasProposedMission
      }
    >
      {t('room.start.party.button')}
    </Button>
  );
}
