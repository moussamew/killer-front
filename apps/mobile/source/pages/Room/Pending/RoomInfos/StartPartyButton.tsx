import { useTranslation } from '@killerparty/intl';
import { useRoom, useStartParty } from '@killerparty/webservices';

import { Button } from '../../../../components/Button';

interface Props {
  roomCode: string;
}

export function StartPartyButton({ roomCode }: Props): JSX.Element {
  const { t } = useTranslation();
  const { startParty } = useStartParty();
  const { room } = useRoom(roomCode);

  const handleStartParty = async (): Promise<void> => {
    await startParty.mutateAsync(roomCode);
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
      onPress={handleStartParty}
      color="primary"
      disabled={shouldDisableStartPartyButton()}
      text={t('room.start.party.button')}
      isAsyncAction
    />
  );
}
