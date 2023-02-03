import { useNavigate, useParams } from 'react-router-dom';
import tw from 'twin.macro';

import Winner from '@/assets/images/winner.png';
import { Button } from '@/components/Button';
import { useTranslation } from '@/hooks/useTranslation';
import { PlayerStatus } from '@/services/player/constants';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';
import { useRoom } from '@/services/room/queries';

const SectionTitle = tw.div`
  text-center 
`;

const Image = tw.img`
  max-h-[80rem] m-auto
`;

export function EndedRoomPage(): JSX.Element {
  const { roomCode } = useParams();
  const { t } = useTranslation();
  const { room } = useRoom(roomCode!);
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();
  const navigate = useNavigate();

  const handleLeaveRoom = async (): Promise<void> => {
    updatePlayer.mutate(
      { id: session?.id, room: null },
      { onSuccess: () => navigate('/') },
    );
  };

  const lastManStanding = room?.players?.find(
    ({ status }) => status === PlayerStatus.ALIVE,
  );

  return (
    <div>
      <SectionTitle>
        <h1>{t('room.winner.name', { playerName: lastManStanding?.name })}</h1>
        <p>{t('room.winner.congrats')}</p>
      </SectionTitle>
      <Image alt="notFound" src={Winner} />
      <Button
        content={t('room.play.another.party.button')}
        onClick={handleLeaveRoom}
      />
    </div>
  );
}
