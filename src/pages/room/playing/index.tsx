import { Fragment, useContext } from 'react';
import tw from 'tailwind-styled-components';

import { isEmptyObject } from '@/helpers/objects';
import { TargetContext } from '@/hooks/context/target';
import { Layout } from '@/layout/Layout';

import PlayerList from '../pending/PlayerList';

import { PlayerKilledButton } from './PlayerKilledButton';
import { Status } from './Status';

const Content = tw.div<{ $isPlayerDead: boolean }>`
  flex flex-col md:flex-row 
   ${({ $isPlayerDead }): string =>
     $isPlayerDead ? 'justify-center' : 'justify-between'}
`;

const Spacer = tw.hr`
  my-1 md:my-2
`;

export const PlayingRoomPage = (): JSX.Element => {
  const { targetInfos } = useContext(TargetContext);

  const isPlayerDead = isEmptyObject(targetInfos);

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
};
