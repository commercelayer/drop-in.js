interface Options {
  wait: number;
  maxWait: number;
}
declare type DebouncedFunc<T extends (...args: any[]) => any> = (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>;
export declare const pDebounce: <T extends (arg: any[]) => any>(input: T, options?: Options) => DebouncedFunc<T>;
export {};
