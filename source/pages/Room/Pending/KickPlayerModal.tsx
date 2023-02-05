import { useContext } from 'react';
import tw from 'twin.macro';

import { Button } from '@/components/Button';
import { ModalContext } from '@/context/modal';
import { useTranslation } from '@/hooks/useTranslation';
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
  const { t } = useTranslation();
  const { updatePlayer } = useUpdatePlayer();
  const { closeModal } = useContext(ModalContext);

  const handleKickPlayer = async (): Promise<void> => {
    await updatePlayer.mutateAsync(
      { id: playerId, room: null },
      { onSuccess: closeModal },
    );
  };

  return (
    <>
      <HeadContent>
        <Title>{t('room.kick.players.title')}</Title>
      </HeadContent>
      <TextContent>
        <p>{t('room.kick.players.warning', { playerName })}</p>
      </TextContent>
      <Button color="primary" onClick={handleKickPlayer}>
        {t('room.kick.players.confirm.button', { playerName })}
      </Button>
    </>
  );
}
