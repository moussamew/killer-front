import { useMutation, useQueryClient } from 'react-query';

import {
  createPlayerRequest,
  kickPlayerRequest,
  updatePlayerRequest,
} from './requests';
import {
  CreatePlayerMutation,
  KickPlayerMutation,
  Player,
  UpdatePlayerMutation,
} from './types';

export function useUpdatePlayer(): UpdatePlayerMutation {
  const queryClient = useQueryClient();

  const updatePlayer = useMutation(updatePlayerRequest, {
    onSuccess: () => queryClient.invalidateQueries('playerSession'),
  });

  return { updatePlayer };
}

export function useCreatePlayer(): CreatePlayerMutation {
  const queryClient = useQueryClient();

  const createPlayer = useMutation(createPlayerRequest, {
    onSuccess: () => queryClient.invalidateQueries('playerSession'),
  });

  return { createPlayer };
}

export function useKickPlayer(): KickPlayerMutation {
  const queryClient = useQueryClient();

  const kickPlayer = useMutation(
    ({ id, roomCode }: Pick<Player, 'id' | 'roomCode'>) =>
      kickPlayerRequest({ id, roomCode }),
    { onSuccess: () => queryClient.invalidateQueries('playerSession') },
  );

  return { kickPlayer };
}
