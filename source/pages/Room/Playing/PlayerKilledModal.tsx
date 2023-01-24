import { Fragment, useContext } from 'react';
import tw from 'twin.macro';

import { Button } from '@/components/Button';
import { ModalContext } from '@/context/modal';
import { t } from '@/helpers/translate';
import { PlayerStatus } from '@/services/player/constants';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

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

export function PlayerKilledModal(): JSX.Element {
  const { updatePlayer } = useUpdatePlayer();
  const { closeModal } = useContext(ModalContext);
  const { session } = useSession();

  const handleKillPlayer = async (): Promise<void> => {
    await updatePlayer.mutateAsync(
      { id: session?.id, status: PlayerStatus.KILLED },
      { onSuccess: closeModal },
    );
  };

  return (
    <Fragment>
      <HeadContent>
        <Title>{t('playing_room.player_killed_modal_title')}</Title>
      </HeadContent>
      <TextContent>
        <p>{t('playing_room.player_killed_modal_text')}</p>
      </TextContent>
      <Button
        content={t('playing_room.player_killed_confirmation')}
        onClick={handleKillPlayer}
      />
    </Fragment>
  );
}
