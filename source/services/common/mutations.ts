import { useMutation } from '@tanstack/react-query';

import { createNavigatorClipboardRequest } from './requests';
import { type CreateNavigatorClipboardMutation } from './types';

export function useCreateNavigatorClipboard(): CreateNavigatorClipboardMutation {
  const createNavigatorClipboard = useMutation({
    mutationFn: createNavigatorClipboardRequest,
  });

  return { createNavigatorClipboard };
}
