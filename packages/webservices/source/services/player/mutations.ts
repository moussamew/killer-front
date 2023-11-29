import { useMutation, useQueryClient } from '@tanstack/react-query';

import { context } from '../../provider';
import { type RequestError } from '../../utils/request-error';

import { createPlayerRequest, updatePlayerRequest } from './requests';
import {
  type PlayerUpdateInfos,
  type CreatePlayerMutation,
  type UpdatePlayerMutation,
  type Session,
} from './types';

export function useUpdatePlayer(): UpdatePlayerMutation {
  const queryClient = useQueryClient({ context });

  const updatePlayer = useMutation<
    void,
    RequestError,
    Partial<PlayerUpdateInfos>,
    unknown
  >({
    context,
    mutationFn: updatePlayerRequest,
    onMutate: async ({ avatar }) => {
      // Optimistically update the session with the new avatar
      if (avatar) {
        await queryClient.cancelQueries({ queryKey: ['session'] });

        queryClient.setQueryData<Session>(['session'], (oldSession) => ({
          ...oldSession!,
          ...(avatar && { avatar }),
        }));
      }
    },
    onSettled: () => queryClient.invalidateQueries(['session']),
  });

  return { updatePlayer };
}

export function useCreatePlayer(): CreatePlayerMutation {
  const queryClient = useQueryClient({ context });

  const createPlayer = useMutation({
    context,
    mutationFn: createPlayerRequest,
    onSuccess: () => queryClient.resetQueries(['session']),
  });

  return { createPlayer };
}
