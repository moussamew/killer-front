import { Fragment } from 'react';
import tw from 'tailwind-styled-components';

import { Layout } from '@/layout/Layout';
import { PlayerList } from '@/pages/room/pending/PlayerList';
import { useTargetInfos } from '@/services/mission/queries';
import { PlayerStatus } from '@/services/player/constants';
import { usePlayerSession } from '@/services/player/queries';

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
  const { targetInfos } = useTargetInfos();
  const { playerSession } = usePlayerSession();

  const isPlayerDead = playerSession?.status === PlayerStatus.KILLED;

  return (
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
  );
}
