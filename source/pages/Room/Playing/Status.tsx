import tw from 'twin.macro';

import Glasses from '@/assets/images/glasses.png';
import { useTranslation } from '@/hooks/useTranslation';
import { PlayerStatus } from '@/services/player/constants';
import { useSession } from '@/services/player/queries';

const Content = tw.section`
  flex flex-col items-center
  text-center
`;

const Image = tw.img`
  mb-2
`;

const TargetSection = tw.section`
  flex flex-row items-center justify-center
`;

const MissionSection = tw.section`
  flex flex-col items-center justify-center
`;

const Text = tw.p`
  font-medium
`;

const PlayerToKill = tw.div`
  shadow-xl border border-black
  p-0.5 my-1 rounded-lg bg-red-400
  max-w-[fit-content]	text-3xl relative
  text-white font-medium ml-1
`;

const Mission = tw(PlayerToKill)`
  bg-yellow-200 text-lightDark
`;

export function Status(): JSX.Element {
  const { t } = useTranslation();
  const { session } = useSession();

  return (
    <Content>
      <Image alt="party" src={Glasses} />
      {session?.status === PlayerStatus.KILLED ? (
        <>
          <h2>{t('room.player.killed.title')}</h2>
          <Text>{t('room.player.killed.resume')}</Text>
        </>
      ) : (
        <>
          <h2>{t('room.target.title')}</h2>
          <TargetSection>
            <Text>{t('room.target.to.kill')}</Text>
            <PlayerToKill>{session?.target?.name}</PlayerToKill>
          </TargetSection>
          <MissionSection>
            <Text>{t('room.target.mission')}</Text>
            <Mission>{session?.assignedMission?.content}</Mission>
          </MissionSection>
        </>
      )}
    </Content>
  );
}
