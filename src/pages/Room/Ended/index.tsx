import { useNavigate, useParams } from 'react-router-dom';
import tw from 'twin.macro';

import Winner from '@/assets/images/winner.png';
import { Button } from '@/components/Button';
import t from '@/helpers/translate';
import { Layout } from '@/layout/Layout';
import { RoomPage } from '@/pages/Room';
import { PlayerStatus } from '@/services/player/constants';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useRoomPlayers } from '@/services/room/queries';

const SectionTitle = tw.div`
  text-center 
`;

const Image = tw.img`
  max-h-[80rem] m-auto
`;

export function EndedRoomPage(): JSX.Element {
  const { roomCode } = useParams();
  const { roomPlayers } = useRoomPlayers(roomCode!);
  const { updatePlayer } = useUpdatePlayer();
  const navigate = useNavigate();

  const handleLeaveRoom = async (): Promise<void> => {
    updatePlayer.mutate({ roomCode: null }, { onSuccess: () => navigate('/') });
  };

  const lastManStanding = roomPlayers?.find(
    ({ status }) => status === PlayerStatus.ALIVE,
  );

  return (
    <RoomPage>
      <Layout>
        <SectionTitle>
          <h1>
            {t('ended_room.winner', { playerName: lastManStanding?.name })}
          </h1>
          <p>{t('ended_room.good_job')}</p>
        </SectionTitle>
        <Image alt="notFound" src={Winner} />
        <Button content="Play another party!" onClick={handleLeaveRoom} />
      </Layout>
    </RoomPage>
  );
}
