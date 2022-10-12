import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import Winner from '@/assets/images/winner.png';
import { Button } from '@/components/Button';
import t from '@/helpers/translate';
import { Layout } from '@/layout/Layout';
import { RoomPage } from '@/pages/room';
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

  const handleLeaveRoom = (): void => {
    updatePlayer.mutate({ roomCode: null });
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
