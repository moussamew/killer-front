import tw from 'tailwind-styled-components';

import { Layout } from '@/layout/Layout';

import PlayerList from '../pending/PlayerList';

import { PlayerKilledButton } from './PlayerKilledButton';
import { TargetInfos } from './TargetInfos';

const Content = tw.div`
  flex flex-col md:flex-row 
  justify-between
`;

const Spacer = tw.hr`
  my-1 md:my-2
`;

export const PlayingRoomPage = (): JSX.Element => (
  <Layout>
    <Content>
      <TargetInfos />
      <Spacer />
      <PlayerKilledButton />
    </Content>
    <Spacer />
    <PlayerList />
  </Layout>
);
