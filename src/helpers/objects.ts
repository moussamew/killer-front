export const isEmptyObject = <T extends object>(object: T): boolean => {
  return Object.keys(object).length === 0;
};
