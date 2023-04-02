import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import { useStartParty } from '@/services/room/mutations';

export function StartPartyButton(): JSX.Element {
  const { roomCode } = useParams();
  const { t } = useTranslation();
  const { startParty } = useStartParty();

  const handleStartParty = async (): Promise<void> => {
    await startParty.mutateAsync(roomCode!);
  };

  return (
    <Button onClick={handleStartParty} color="primary">
      {t('room.start.party.button')}
    </Button>
  );
}
