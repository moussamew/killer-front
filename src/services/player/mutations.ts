import { useMutation, useQueryClient } from 'react-query';

import { createPlayer, updatePlayer } from './requests';
import { CreatePlayerMutation, UpdatePlayerMutation } from './types';

export function useUpdatePlayer(): UpdatePlayerMutation {
  const queryClient = useQueryClient();

  const updatePlayerMutation = useMutation(updatePlayer, {
    onSuccess: () => queryClient.invalidateQueries('playerSession'),
  });

  return { updatePlayerMutation };
}

export function useCreatePlayer(): CreatePlayerMutation {
  const queryClient = useQueryClient();

  const createPlayerMutation = useMutation(createPlayer, {
    onSuccess: () => queryClient.invalidateQueries('playerSession'),
  });

  return { createPlayerMutation };
}
