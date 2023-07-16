import { useTranslation } from '@killerparty/intl';
import { useRoom, useStartParty } from '@killerparty/webservices';

import { Button } from '../../components/Button';

interface Props {
  roomCode: string;
}

export function StartPartyButton({ roomCode }: Props): JSX.Element {
  const { t } = useTranslation();
  const { startParty } = useStartParty();
  const { room } = useRoom(roomCode);

  const handleStartParty = (): void => {
    startParty.mutateAsync(roomCode!);
  };

  const allPlayersHasProposedMission = room?.players.every(
    ({ hasAtLeastOneMission }) => hasAtLeastOneMission,
  );

  return (
    <Button
      onPress={handleStartParty}
      color="primary"
      disabled={
        !room?.hasEnoughMissions ||
        !room?.hasEnoughPlayers ||
        !allPlayersHasProposedMission
      }
      text={t('room.start.party.button')}
    />
  );
}
