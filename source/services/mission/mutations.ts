import { useMutation, useQueryClient } from 'react-query';

import { createMissionRequest, deleteMissionRequest } from './requests';
import {
  type CreateMissionMutation,
  type DeleteMissionMutation,
} from './types';

export function useCreateMission(): CreateMissionMutation {
  const queryClient = useQueryClient();

  const createMission = useMutation(createMissionRequest, {
    onSuccess: () => queryClient.invalidateQueries('session'),
  });

  return { createMission };
}

export function useDeleteMission(): DeleteMissionMutation {
  const queryClient = useQueryClient();

  const deleteMission = useMutation(deleteMissionRequest, {
    onSuccess: () => queryClient.invalidateQueries('session'),
  });

  return { deleteMission };
}
