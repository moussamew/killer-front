export function createNavigatorClipboardRequest(
  clipboardText: string,
): Promise<void> {
  return navigator.clipboard.writeText(clipboardText);
}
