import { useParams } from 'react-router-dom';

import Party from '@/assets/icons/party.svg';
import { Button } from '@/components/Button';
import t from '@/helpers/translate';

import { startParty } from './services/requests';

export const StartPartyButton = (): JSX.Element => {
  const { roomCode } = useParams();

  const handleStartParty = async (): Promise<void> => startParty(roomCode!);

  return (
    <Button
      content={t('room.start_party')}
      onClick={handleStartParty}
      buttonColor="bg-yellow-200"
      textColor="text-lightDark"
      icon={Party}
    />
  );
};
