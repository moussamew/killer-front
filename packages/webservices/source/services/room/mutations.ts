import { useMutation, useQueryClient } from '@tanstack/react-query';

import { context } from '../../provider';

import {
  createRoomRequest,
  deleteRoomRequest,
  startPartyRequest,
} from './requests';
import {
  type CreateRoomMutation,
  type DeleteRoomMutation,
  type StartPartyMutation,
} from './types';

export function useCreateRoom(): CreateRoomMutation {
  const queryClient = useQueryClient({ context });

  const createRoom = useMutation({
    context,
    mutationFn: createRoomRequest,
    onSuccess: () => queryClient.invalidateQueries(['session']),
  });

  return { createRoom };
}

export function useDeleteRoom(): DeleteRoomMutation {
  const queryClient = useQueryClient({ context });

  const deleteRoom = useMutation({
    context,
    mutationFn: deleteRoomRequest,
    onSuccess: () => queryClient.invalidateQueries(['session']),
  });

  return { deleteRoom };
}

export function useStartParty(): StartPartyMutation {
  const queryClient = useQueryClient({ context });

  const startParty = useMutation({
    context,
    mutationFn: startPartyRequest,
    onSuccess: () => queryClient.invalidateQueries(['session']),
  });

  return { startParty };
}
