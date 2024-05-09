export function isPromise(
  func: () => void | Promise<void>,
): func is () => Promise<void> {
  if (func.constructor.name === 'AsyncFunction') {
    return true;
  }

  return false;
}

export function wait(ms = 5000): Promise<void> {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
