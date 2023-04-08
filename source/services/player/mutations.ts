import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPlayerRequest, updatePlayerRequest } from './requests';
import { type CreatePlayerMutation, type UpdatePlayerMutation } from './types';

export function useUpdatePlayer(): UpdatePlayerMutation {
  const queryClient = useQueryClient();

  const updatePlayer = useMutation({
    mutationFn: updatePlayerRequest,
    onSuccess: () => queryClient.invalidateQueries(['session']),
  });

  return { updatePlayer };
}

export function useCreatePlayer(): CreatePlayerMutation {
  const queryClient = useQueryClient();

  const createPlayer = useMutation({
    mutationFn: createPlayerRequest,
    onSuccess: () => queryClient.invalidateQueries(['session']),
  });

  return { createPlayer };
}
