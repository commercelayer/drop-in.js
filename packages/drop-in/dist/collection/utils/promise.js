import debounce from 'debounce-fn';
export const pDebounce = (input, options) => {
  const incrementalArgs = [];
  const incrementalResolve = [];
  const fn = async (resolves) => {
    const result = await input(incrementalArgs);
    resolves.forEach((resolve) => {
      resolve(result);
    });
    incrementalResolve.length = 0;
    incrementalArgs.length = 0;
  };
  const debounced = debounce(fn, options);
  return async (item) => {
    if (item !== undefined) {
      incrementalArgs.push(...item);
    }
    return await new Promise((resolve) => {
      incrementalResolve.push(resolve);
      void debounced(incrementalResolve);
    });
  };
};
