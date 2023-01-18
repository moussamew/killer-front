import { useContext } from 'react';
import tw from 'twin.macro';

import { Button } from '@/components/Button';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { useUpdatePlayer } from '@/services/player/mutations';
import { usePlayerSession } from '@/services/player/queries';

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
  const { updatePlayer } = useUpdatePlayer();
  const { playerSession } = usePlayerSession();
  const { closeModal } = useContext(ModalContext);

  const handleLeaveRoom = async (): Promise<void> => {
    await updatePlayer.mutateAsync(
      { id: playerSession?.id, room: null },
      { onSuccess: closeModal },
    );
  };

  return (
    <div>
      <HeadContent>
        <Title>{t('room.leave_room')}</Title>
      </HeadContent>
      <TextContent>
        <p>{t('room.leave_room_warning')}</p>
      </TextContent>
      <Button
        content={t('room.leave_room_confirmation')}
        onClick={handleLeaveRoom}
      />
    </div>
  );
}
