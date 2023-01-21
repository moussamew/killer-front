import { useMutation, useQueryClient } from 'react-query';

import {
  createRoomRequest,
  deleteRoomRequest,
  startPartyRequest,
} from './requests';
import {
  CreateRoomMutation,
  DeleteRoomMutation,
  StartPartyMutation,
} from './types';

export function useCreateRoom(): CreateRoomMutation {
  const queryClient = useQueryClient();

  const createRoom = useMutation(createRoomRequest, {
    onSuccess: () => queryClient.invalidateQueries('session'),
  });

  return { createRoom };
}

export function useDeleteRoom(): DeleteRoomMutation {
  const queryClient = useQueryClient();

  const deleteRoom = useMutation(deleteRoomRequest, {
    onSuccess: () => queryClient.invalidateQueries('session'),
  });

  return { deleteRoom };
}

export function useStartParty(): StartPartyMutation {
  const startParty = useMutation(startPartyRequest);

  return { startParty };
}
