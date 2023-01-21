import { Fragment, useContext } from 'react';
import tw from 'twin.macro';

import { Button } from '@/components/Button';
import { t } from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { useUpdatePlayer } from '@/services/player/mutations';

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

interface Props {
  playerName: string;
  playerId: number;
}

export function KickPlayerModal({ playerName, playerId }: Props): JSX.Element {
  const { updatePlayer } = useUpdatePlayer();
  const { closeModal } = useContext(ModalContext);

  const handleKickPlayer = async (): Promise<void> => {
    await updatePlayer.mutateAsync(
      { id: playerId, room: null },
      { onSuccess: closeModal },
    );
  };

  return (
    <Fragment>
      <HeadContent>
        <Title>{t('room.kick_room')}</Title>
      </HeadContent>
      <TextContent>
        <p>{t('room.kick_room_warning', { playerName })}</p>
      </TextContent>
      <Button
        content={t('room.kick_room_confirmation', { playerName })}
        onClick={handleKickPlayer}
      />
    </Fragment>
  );
}
