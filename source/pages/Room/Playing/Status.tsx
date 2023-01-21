import tw from 'twin.macro';

import Glasses from '@/assets/images/glasses.png';
import { t } from '@/helpers/translate';
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
  const { session } = useSession();

  return (
    <Content>
      <Image alt="party" src={Glasses} />
      {session?.status === PlayerStatus.KILLED ? (
        <div>
          <h2>{t('playing_room.player_killed')}</h2>
          <Text>{t('playing_room.player_killed_resume')}</Text>
        </div>
      ) : (
        <div>
          <h2>{t('playing_room.target_section_title')}</h2>
          <TargetSection>
            <Text>{t('playing_room.target_to_kill')}</Text>
            <PlayerToKill>{session?.target?.name}</PlayerToKill>
          </TargetSection>
          <MissionSection>
            <Text>{t('playing_room.mission_to_do')}</Text>
            <Mission>{session?.assignedMission?.content}</Mission>
          </MissionSection>
        </div>
      )}
    </Content>
  );
}
