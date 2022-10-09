import { useMutation, useQueryClient } from 'react-query';

import { createRoomRequest } from './requests';
import { CreateRoomMutation } from './types';

export function useCreateRoom(): CreateRoomMutation {
  const queryClient = useQueryClient();

  const createRoom = useMutation(createRoomRequest, {
    onSuccess: () => queryClient.invalidateQueries('playerSession'),
  });

  return { createRoom };
}
