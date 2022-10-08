import { useMutation, useQueryClient } from 'react-query';

import { createRoom } from './requests';
import { CreateRoomMutation } from './types';

export function useCreateRoom(): CreateRoomMutation {
  const queryClient = useQueryClient();

  const createRoomMutation = useMutation(createRoom, {
    onSuccess: () => queryClient.invalidateQueries('playerSession'),
  });

  return { createRoomMutation };
}
