import { Options as DebounceFnOptions } from 'debounce-fn';
declare type Options = Pick<DebounceFnOptions, 'wait' | 'maxWait'>;
declare type DebouncedFunc<T extends (...args: any[]) => any> = (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>;
export declare const pDebounce: <T extends (arg: any[]) => any>(input: T, options?: Options) => DebouncedFunc<T>;
export {};
