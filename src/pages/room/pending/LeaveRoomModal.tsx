import tw from 'tailwind-styled-components';

import { Button } from '@/components/Button';
import t from '@/helpers/translate';
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

export function LeaveRoomModal(): JSX.Element {
  const { updatePlayerMutation } = useUpdatePlayer();

  const leaveRoom = async (): Promise<void> => {
    updatePlayerMutation.mutate({ roomCode: null });
  };

  return (
    <div>
      <HeadContent>
        <Title>{t('room.leave_room')}</Title>
      </HeadContent>
      <TextContent>
        <p>{t('room.leave_room_warning')}</p>
      </TextContent>
      <Button content={t('room.leave_room_confirmation')} onClick={leaveRoom} />
    </div>
  );
}
