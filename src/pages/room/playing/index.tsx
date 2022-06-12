import { useQuery } from 'react-query';
import tw from 'tailwind-styled-components';

import Glasses from '@/assets/images/glasses.png';
import Knife from '@/assets/images/knife.png';
import { Button } from '@/components/Button';
import { Layout } from '@/layout/Layout';

import { getPlayerMission, getPlayerTarget } from './services/requests';

const Content = tw.div`
  flex flex-col md:flex-row 
  justify-between
`;

const Section = tw.section`
  flex flex-col items-center
  text-center
`;

const PartyImage = tw.img`
  mb-2
`;

const Text = tw.p`
  font-medium
`;

const Spacer = tw.hr`
  my-1
`;

const KnifeImage = tw.img`
  h-[12rem]
`;

const Target = tw.div`
  flex flex-row items-center
`;

const PlayerToKill = tw.span`
  shadow-xl border border-black
  p-0.5 my-1 rounded-lg bg-red-400
  max-w-fit	text-3xl relative
  text-white font-medium ml-1
`;

const Mission = tw(PlayerToKill)`
  bg-yellow-200 text-lightDark ml-0
`;

export const PlayingRoomPage = (): JSX.Element => {
  const { data: playerTarget } = useQuery('playerTarget', getPlayerTarget);

  const { data: playerMission } = useQuery('playerMission', getPlayerMission);

  return (
    <Layout>
      <Content>
        <Section>
          <PartyImage alt="party" src={Glasses} />
          <h2>Try to kill your target and survive!</h2>
          <Target>
            <Text>The target to kill is..</Text>
            <PlayerToKill>{playerTarget?.name}</PlayerToKill>
          </Target>
          <Text>
            To be able to kill your target, you must be able to make him..
          </Text>
          <Mission>{playerMission?.content}</Mission>
        </Section>
        <Spacer />
        <Section>
          <KnifeImage alt="killed" src={Knife} />
          <h2>Someone managed to kill you?</h2>
          <Text>
            Click on the button above to notify other players that you have been
            killed.
          </Text>
          <Button content="I have been killed" />
        </Section>
      </Content>
    </Layout>
  );
};
