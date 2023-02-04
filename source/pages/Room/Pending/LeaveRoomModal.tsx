import { useContext } from 'react';
import tw from 'twin.macro';

import { Button } from '@/components/Button';
import { ModalContext } from '@/context/modal';
import { useTranslation } from '@/hooks/useTranslation';
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

export function LeaveRoomModal(): JSX.Element {
  const { t } = useTranslation();
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();
  const { closeModal } = useContext(ModalContext);

  const handleLeaveRoom = async (): Promise<void> => {
    await updatePlayer.mutateAsync(
      { id: session?.id, room: null },
      { onSuccess: closeModal },
    );
  };

  return (
    <>
      <HeadContent>
        <Title>{t('room.leave.title')}</Title>
      </HeadContent>
      <TextContent>
        <p>{t('room.leave.warning')}</p>
      </TextContent>
      <Button
        content={t('room.leave.confirm.button')}
        onClick={handleLeaveRoom}
      />
    </>
  );
}
