/**
 * Creates an array of elements split into groups the length of `size`. If `array` can't be split evenly, the final chunk will be the remaining elements.
 * @param array The array to process.
 * @param size The length of each chunk.
 * @returns Returns the new array of chunks.
 */
export declare function chunk<T>(array: T[], size?: number): T[][];
/**
 * Check if the value is different from `null` and `undefined`.
 * @returns `true` when `value` is different from `null` and `undefined`.
 */
export declare function isNotNullish<T>(value: T | null | undefined): value is T;
/**
 * Creates a duplicate-free version of an array.
 * @param array The array to inspect.
 * @returns Returns the new duplicate free array.
 */
export declare function uniq<T>(array: T[]): T[];
/**
 * Creates a function that memoizes the result of func.
 * @param func The function to have its output memoized.
 * @returns Returns the new memoized function.
 */
export declare const memoize: <T extends (...args: any) => any>(func: T) => (...args: Parameters<T>) => ReturnType<T>;
