import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';

import Party from '@/assets/icons/party.svg';
import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import t from '@/helpers/translate';

import { startParty } from './services/requests';

export const StartPartyButton = (): JSX.Element => {
  const { roomCode } = useParams();

  const [errorMessage, setErrorMessage] = useState('');

  const handleStartParty = async (): Promise<void> =>
    startParty(roomCode!).catch((error) => setErrorMessage(error.message));

  return (
    <Fragment>
      <Button
        content={t('room.start_party')}
        onClick={handleStartParty}
        buttonColor="bg-yellow-200"
        textColor="text-lightDark"
        icon={Party}
      />
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          closeMessage={() => setErrorMessage('')}
        />
      )}
    </Fragment>
  );
};
