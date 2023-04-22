export const onEnterKey = (key: string, callback: () => void): void => {
  if (key === 'Enter') {
    callback();
  }
};
