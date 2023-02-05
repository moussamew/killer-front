import { useParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import { useTranslation } from '@/hooks/useTranslation';
import { useStartParty } from '@/services/room/mutations';

export function StartPartyButton(): JSX.Element {
  const { roomCode } = useParams();
  const { t } = useTranslation();
  const { startParty } = useStartParty();

  const handleStartParty = async (): Promise<void> => {
    await startParty.mutateAsync(roomCode!);
  };

  return (
    <Button onClick={handleStartParty} color="secondary">
      {t('room.start.party.button')}
    </Button>
  );
}
