export function isPromise(
  func: () => void | Promise<void>,
): func is () => Promise<void> {
  if (func.constructor.name === 'AsyncFunction') {
    return true;
  }

  return false;
}
