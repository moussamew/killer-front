import { useMutation, useQueryClient } from 'react-query';

import { createMissionRequest, deleteMissionRequest } from './requests';
import { CreateMissionMutation, DeleteMissionMutation } from './types';

export function useCreateMission(): CreateMissionMutation {
  const queryClient = useQueryClient();

  const createMission = useMutation(createMissionRequest, {
    onSuccess: () => queryClient.invalidateQueries('playerMissions'),
  });

  return { createMission };
}

export function useDeleteMission(): DeleteMissionMutation {
  const queryClient = useQueryClient();

  const deleteMission = useMutation(deleteMissionRequest, {
    onSuccess: () => queryClient.invalidateQueries('playerMissions'),
  });

  return { deleteMission };
}
