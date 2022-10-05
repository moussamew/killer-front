import { useContext } from 'react';
import tw from 'tailwind-styled-components';

import Winner from '@/assets/images/winner.png';
import { Button } from '@/components/Button';
import { PlayerStatus } from '@/constants/enums';
import t from '@/helpers/translate';
import { PlayerContext } from '@/hooks/context/player';
import { RoomContext } from '@/hooks/context/room';
import { Layout } from '@/layout/Layout';
import { updatePlayer } from '@/layout/services/requests';

const SectionTitle = tw.div`
  text-center 
`;

const Image = tw.img`
  max-h-[80rem] m-auto
`;

export const EndedRoomPage = (): JSX.Element => {
  const { roomPlayers } = useContext(RoomContext);
  const { refreshPlayerSession } = useContext(PlayerContext);

  const lastManStanding = roomPlayers.find(
    ({ status }) => status === PlayerStatus.ALIVE,
  );

  const leaveCurrentRoom = async (): Promise<void> =>
    updatePlayer({ roomCode: null }).then(refreshPlayerSession);

  return (
    <Layout>
      <SectionTitle>
        <h1>{t('ended_room.winner', { playerName: lastManStanding?.name })}</h1>
        <p>{t('ended_room.good_job')}</p>
      </SectionTitle>
      <Image alt="notFound" src={Winner} />
      <Button content="Play another party!" onClick={leaveCurrentRoom} />
    </Layout>
  );
};
