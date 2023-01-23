import { useMutation } from 'react-query';

import { createNavigatorClipboardRequest } from './requests';
import { CreateNavigatorClipboardMutation } from './types';

export function useCreateNavigatorClipboard(): CreateNavigatorClipboardMutation {
  const createNavigatorClipboard = useMutation((roomLink: string) =>
    createNavigatorClipboardRequest(roomLink),
  );

  return { createNavigatorClipboard };
}
