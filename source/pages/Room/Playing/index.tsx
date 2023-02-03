import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { PROD_ENV } from '@/constants/app';
import { ROOM_TOPIC } from '@/constants/endpoints';
import { MercureEventType } from '@/constants/enums';
import { PlayerList } from '@/pages/Room/Pending/PlayerList';
import { PlayerStatus } from '@/services/player/constants';
import { useSession } from '@/services/player/queries';

import { PlayerKilledButton } from './PlayerKilledButton';
import { Status } from './Status';

const Content = styled.div<{ isPlayerDead: boolean }>`
  flex flex-col md:flex-row 
   ${({ isPlayerDead }) =>
     isPlayerDead ? tw`justify-center` : `justify-between`}
`;

const Spacer = tw.hr`
  my-1 md:my-2
`;

export function PlayingRoomPage(): JSX.Element {
  const { roomCode } = useParams();
  const { session, refetchSession } = useSession();

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
        refetchSession();
      }
    });

    return () => roomEventSource.close();
  }, [roomCode, refetchSession]);

  return (
    <div>
      <Content isPlayerDead={session?.status === PlayerStatus.KILLED}>
        <Status />
        {session?.status === PlayerStatus.ALIVE && (
          <Fragment>
            <Spacer />
            <PlayerKilledButton />
          </Fragment>
        )}
      </Content>
      <Spacer />
      <PlayerList />
    </div>
  );
}
