import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { PROD_ENV } from '@/constants/app';
import { ROOM_TOPIC } from '@/constants/endpoints';
import { MercureEventType } from '@/constants/enums';
import { Layout } from '@/layout/Layout';
import { RoomPage } from '@/pages/room';
import { PlayerList } from '@/pages/room/pending/PlayerList';
import { useTargetInfos } from '@/services/mission/queries';
import { PlayerStatus } from '@/services/player/constants';
import { usePlayerSession } from '@/services/player/queries';
import { useRoomPlayers } from '@/services/room/queries';

import { PlayerKilledButton } from './PlayerKilledButton';
import { Status } from './Status';

const Content = tw.div`
  flex flex-col md:flex-row 
   ${({ $isPlayerDead }: { $isPlayerDead: boolean }): string =>
     $isPlayerDead ? 'justify-center' : 'justify-between'}
`;

const Spacer = tw.hr`
  my-1 md:my-2
`;

export function PlayingRoomPage(): JSX.Element {
  const { roomCode } = useParams();
  const { targetInfos, refetchTargetInfos } = useTargetInfos();
  const { playerSession } = usePlayerSession();
  const { refetchRoomPlayers } = useRoomPlayers(roomCode!);

  /**
   * Listen to SSE events emits in the Room page.
   * Apply corresponding side-effects.
   */
  useEffect(() => {
    const roomEventSource = new EventSource(`${ROOM_TOPIC}/${roomCode}`, {
      withCredentials: PROD_ENV,
    });

    roomEventSource.addEventListener('message', (event) => {
      const { type } = JSON.parse(event.data);

      if (type === MercureEventType.PLAYER_KILLED) {
        refetchTargetInfos().then(refetchRoomPlayers);
      }
    });

    return () => roomEventSource.close();
  }, [roomCode, refetchTargetInfos, refetchRoomPlayers]);

  const isPlayerDead = playerSession?.status === PlayerStatus.KILLED;

  return (
    <RoomPage>
      <Layout>
        <Content $isPlayerDead={isPlayerDead}>
          <Status isPlayerDead={isPlayerDead} targetInfos={targetInfos} />
          {!isPlayerDead && (
            <Fragment>
              <Spacer />
              <PlayerKilledButton />
            </Fragment>
          )}
        </Content>
        <Spacer />
        <PlayerList />
      </Layout>
    </RoomPage>
  );
}
