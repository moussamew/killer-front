import { useParams } from 'react-router-dom';

import { ReactComponent as PartyIcon } from '@/assets/icons/party.svg';
import { Button } from '@/components/Button';
import { t } from '@/helpers/translate';
import { useStartParty } from '@/services/room/mutations';

export function StartPartyButton(): JSX.Element {
  const { roomCode } = useParams();
  const { startParty } = useStartParty();

  const handleStartParty = async (): Promise<void> => {
    await startParty.mutateAsync(roomCode!);
  };

  return (
    <Button
      content={t('room.start_party')}
      onClick={handleStartParty}
      buttonColor="yellow"
      textColor="lightDark"
      icon={<PartyIcon />}
    />
  );
}
