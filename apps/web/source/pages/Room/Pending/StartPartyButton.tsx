import { useTranslation } from '@killerparty/intl';
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

  const shouldDisableStartPartyButton = (): boolean => {
    const { hasEnoughMissions, hasEnoughPlayers, isGameMastered, players } =
      room ?? {};

    if (isGameMastered) {
      return !hasEnoughPlayers || !hasEnoughMissions;
    }

    const allPlayersHasProposedMission = players?.every(
      ({ hasAtLeastOneMission }) => hasAtLeastOneMission,
    );

    return (
      !hasEnoughPlayers || !hasEnoughMissions || !allPlayersHasProposedMission
    );
  };

  return (
    <Button
      onClick={handleStartParty}
      color="primary"
      disabled={shouldDisableStartPartyButton()}
    >
      {t('room.start.party.button')}
    </Button>
  );
}
