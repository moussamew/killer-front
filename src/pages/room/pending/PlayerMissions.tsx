import tw from 'tailwind-styled-components';

import Delete from '@/assets/icons/delete.svg';
import Idea from '@/assets/images/idea.png';
import t from '@/helpers/translate';
import { useDeleteMission } from '@/services/mission/mutations';
import { usePlayerMissions } from '@/services/mission/queries';

import { CreateMission } from './CreateMission';

const Container = tw.div`
  xl:w-1/2
`;

const Section = tw.div`
  flex flex-row items-center 
  mb-2
`;

const Image = tw.img`
  h-7 mr-1
`;

const Missions = tw.div`
  flex flex-wrap
`;

const MissionCard = tw.div`
  shadow-xl border border-black
  p-1 mt-1 mr-1 rounded-lg bg-yellow-200
  max-w-fit	text-3xl relative
`;

const DeleteMission = tw.img`
  absolute cursor-pointer h-2.5
  -top-1 -right-1
`;

interface Props {
  roomCode: string;
}

export function PlayerMissions({ roomCode }: Props): JSX.Element {
  const { playerMissions } = usePlayerMissions(roomCode);
  const { deleteMission } = useDeleteMission();

  const handleDeleteMission = (missionId: number) => (): void => {
    deleteMission.mutate(missionId);
  };

  return (
    <Container>
      <Section>
        <Image alt="missions" src={Idea} />
        <div>
          <h2>{t('room.manage_missions')}</h2>
          <p>{t('room.missions_description')}</p>
        </div>
      </Section>
      <hr />
      {playerMissions && (
        <Missions>
          {playerMissions.map(({ id, content }) => (
            <MissionCard key={id}>
              <span>{content}</span>
              <DeleteMission
                alt="deleteMission"
                src={Delete}
                onClick={handleDeleteMission(id)}
              />
            </MissionCard>
          ))}
        </Missions>
      )}
      <CreateMission />
    </Container>
  );
}
