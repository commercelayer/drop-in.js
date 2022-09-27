export function format(first: string| undefined, middle: string| undefined, last: string| undefined): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

/**
 * Creates an array of elements split into groups the length of `size`. If `array` can't be split evenly, the final chunk will be the remaining elements.
 * @param array The array to process.
 * @param size The length of each chunk.
 * @returns Returns the new array of chunks.
 */
export function chunk<T>(array: T[], size: number = 1): T[][] {
  if (size < 1) {
    return []
  }

  return array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / size)

    resultArray[chunkIndex] ||= []
    resultArray[chunkIndex]!.push(item)

    return resultArray
  }, [] as T[][])
}

/**
 * Check if the value is different from `null` and `undefined`.
 * @returns `true` when `value` is different from `null` and `undefined`.
 */
export function isNotNullish<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

/**
 * Creates a duplicate-free version of an array.
 * @param array The array to inspect.
 * @returns Returns the new duplicate free array.
 */
export function uniq<T>(array: T[]): T[] {
  return [...new Set(array)]
}
