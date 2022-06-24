import { Fragment, useContext, useState } from 'react';
import tw from 'tailwind-styled-components';

import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { PlayerStatus } from '@/constants/enums';
import { ModalContext } from '@/hooks/context/modal';
import { updatePlayer } from '@/layout/services/requests';

const HeadContent = tw.div`
  flex flex-row mb-2
  items-center
`;

const Title = tw.h2`
  mb-0
`;

const TextContent = tw.div`
  mb-1
`;

export const PlayerKilledModal = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('');

  const { closeModal } = useContext(ModalContext);

  const killPlayer = (): Promise<void> =>
    updatePlayer({ status: PlayerStatus.KILLED })
      .then(closeModal)
      .catch((error) => setErrorMessage(error.message));

  return (
    <Fragment>
      <HeadContent>
        <Title>Killed by my target</Title>
      </HeadContent>
      <TextContent>
        <p>
          You will no longer be able to play the party anymore and be considered
          as dead!
        </p>
      </TextContent>
      <Button content="I've lost, kill me :(" onClick={killPlayer} />
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          closeMessage={() => setErrorMessage('')}
        />
      )}
    </Fragment>
  );
};
