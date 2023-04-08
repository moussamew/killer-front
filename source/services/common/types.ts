import { type UseMutationResult } from '@tanstack/react-query';

export interface CreateNavigatorClipboardMutation {
  createNavigatorClipboard: UseMutationResult<void, unknown, string, unknown>;
}
