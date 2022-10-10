/**
 * Creates an array of elements split into groups the length of `size`. If `array` can't be split evenly, the final chunk will be the remaining elements.
 * @param array The array to process.
 * @param size The length of each chunk.
 * @returns Returns the new array of chunks.
 */
export function chunk(array, size = 1) {
  if (size < 1) {
    return [];
  }
  return array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / size);
    resultArray[chunkIndex] || (resultArray[chunkIndex] = []);
    // @ts-expect-error
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
}
/**
 * Check if the value is different from `null` and `undefined`.
 * @returns `true` when `value` is different from `null` and `undefined`.
 */
export function isNotNullish(value) {
  return value !== null && value !== undefined;
}
/**
 * Creates a duplicate-free version of an array.
 * @param array The array to inspect.
 * @returns Returns the new duplicate free array.
 */
export function uniq(array) {
  return [...new Set(array)];
}
/**
 * Creates a function that memoizes the result of func.
 * @param func The function to have its output memoized.
 * @returns Returns the new memoized function.
 */
export const memoize = (func) => {
  const cache = {};
  return (...args) => {
    const cacheKey = JSON.stringify(args);
    if (cache[cacheKey] === undefined) {
      cache[cacheKey] = func(...args);
    }
    return cache[cacheKey];
  };
};
