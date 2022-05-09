import { useQuery } from 'react-query';
import tw from 'tailwind-styled-components';

import Delete from '@/assets/icons/delete.svg';
import Idea from '@/assets/images/idea.png';
import t from '@/helpers/translate';

import CreateMission from './CreateMission';
import { deleteMission, getPlayerMissions } from './services/requests';

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

const PlayerMissions = (): JSX.Element | null => {
  const { data: playerMissions, refetch: refetchPlayerMissions } = useQuery(
    'playerMissions',
    () => getPlayerMissions(),
  );

  const removeMission = async (missionId: number): Promise<void> => {
    await deleteMission(missionId);
    await refetchPlayerMissions();
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
                onClick={() => removeMission(id)}
              />
            </MissionCard>
          ))}
        </Missions>
      )}
      <CreateMission refetchPlayerMissions={refetchPlayerMissions} />
    </Container>
  );
};

export default PlayerMissions;
