export function isEmptyObject<T extends object>(object: T): boolean {
  return Object.keys(object).length === 0;
}

export function isPromise(func: () => void | Promise<void>): boolean {
  if (func.constructor.name === 'AsyncFunction') {
    return true;
  }

  return false;
}
