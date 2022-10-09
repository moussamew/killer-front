import { useMutation, useQueryClient } from 'react-query';

import { createPlayerQuery, updatePlayerQuery } from './requests';
import { CreatePlayerMutation, UpdatePlayerMutation } from './types';

export function useUpdatePlayer(): UpdatePlayerMutation {
  const queryClient = useQueryClient();

  const updatePlayer = useMutation(updatePlayerQuery, {
    onSuccess: () => queryClient.invalidateQueries('playerSession'),
  });

  return { updatePlayer };
}

export function useCreatePlayer(): CreatePlayerMutation {
  const queryClient = useQueryClient();

  const createPlayer = useMutation(createPlayerQuery, {
    onSuccess: () => queryClient.invalidateQueries('playerSession'),
  });

  return { createPlayer };
}
