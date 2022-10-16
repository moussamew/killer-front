import { UseMutationResult } from 'react-query';

export interface CreateNavigatorClipboardMutation {
  createNavigatorClipboard: UseMutationResult<void, unknown, string, unknown>;
}
