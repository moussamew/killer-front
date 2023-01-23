import { useMutation, useQueryClient } from 'react-query';

import { createPlayerRequest, updatePlayerRequest } from './requests';
import { CreatePlayerMutation, UpdatePlayerMutation } from './types';

export function useUpdatePlayer(): UpdatePlayerMutation {
  const queryClient = useQueryClient();

  const updatePlayer = useMutation(updatePlayerRequest, {
    onSuccess: () => queryClient.invalidateQueries('session'),
  });

  return { updatePlayer };
}

export function useCreatePlayer(): CreatePlayerMutation {
  const queryClient = useQueryClient();

  const createPlayer = useMutation(createPlayerRequest, {
    onSuccess: () => queryClient.invalidateQueries('session'),
  });

  return { createPlayer };
}
