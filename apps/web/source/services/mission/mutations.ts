import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createMissionRequest, deleteMissionRequest } from './requests';
import {
  type CreateMissionMutation,
  type DeleteMissionMutation,
} from './types';

export function useCreateMission(): CreateMissionMutation {
  const queryClient = useQueryClient();

  const createMission = useMutation({
    mutationFn: createMissionRequest,
    onSuccess: () => queryClient.invalidateQueries(['session']),
  });

  return { createMission };
}

export function useDeleteMission(): DeleteMissionMutation {
  const queryClient = useQueryClient();

  const deleteMission = useMutation({
    mutationFn: deleteMissionRequest,
    onSuccess: () => queryClient.invalidateQueries(['session']),
  });

  return { deleteMission };
}
