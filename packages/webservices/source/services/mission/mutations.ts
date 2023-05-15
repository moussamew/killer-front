import { useMutation, useQueryClient } from '@tanstack/react-query';

import { context } from '../../provider';

import { createMissionRequest, deleteMissionRequest } from './requests';
import {
  type CreateMissionMutation,
  type DeleteMissionMutation,
} from './types';

export function useCreateMission(): CreateMissionMutation {
  const queryClient = useQueryClient({ context });

  const createMission = useMutation({
    context,
    mutationFn: createMissionRequest,
    onSuccess: () => queryClient.invalidateQueries(['session']),
  });

  return { createMission };
}

export function useDeleteMission(): DeleteMissionMutation {
  const queryClient = useQueryClient({ context });

  const deleteMission = useMutation({
    context,
    mutationFn: deleteMissionRequest,
    onSuccess: () => queryClient.invalidateQueries(['session']),
  });

  return { deleteMission };
}
