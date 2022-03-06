export const isEmptyObject = <T>(object: T): boolean => {
  return Object.keys(object).length === 0;
};
