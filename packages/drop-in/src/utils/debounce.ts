import type { DebounceSettings, DebouncedFunc } from "lodash"
import debounce from "lodash/debounce"
import memoize from "lodash/memoize"

interface Options {
  wait: number
  maxWait: number
}

type PromiseDebouncedFunc<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => Promise<Awaited<ReturnType<T>>>

export const pDebounce = <T extends (arg: any[]) => any>(
  input: T,
  options?: Options,
): PromiseDebouncedFunc<T> => {
  const incrementalArgs: Array<Parameters<T>> = []
  const incrementalResolve: any[] = []

  const fn = async (resolves: any[]): Promise<void> => {
    const result = await input(incrementalArgs)
    resolves.forEach((resolve) => {
      resolve(result)
    })
    incrementalResolve.length = 0
    incrementalArgs.length = 0
  }

  const debounced = debounce(fn, options?.wait, { maxWait: options?.maxWait })

  return async (
    item: Array<Parameters<T>> | undefined,
  ): Promise<Awaited<ReturnType<T>>> => {
    if (item !== undefined) {
      incrementalArgs.push(...item)
    }
    return await new Promise((resolve) => {
      incrementalResolve.push(resolve)
      void debounced(incrementalResolve)
    })
  }
}

/**
 * Creates a memoized-debounced function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time the memoized-debounced function was invoked.
 *
 * The function is also **memoized** using all arguments as the map cache key. You can override this
 * default by providing a `resolver` function.
 * @param func The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @param options The options object.
 * @param resolver The function to resolve the cache key (for memoized function).
 * @returns Returns the new memoized function debounced.
 */
export function memoDebounce<F extends (...args: any[]) => any>(
  func: F,
  wait = 0,
  options: DebounceSettings = {},
  resolver: (...args: Parameters<F>) => unknown = (...args: Parameters<F>) =>
    JSON.stringify(args),
): DebouncedFunc<F> {
  const debounceMemo = memoize<(...args: Parameters<F>) => DebouncedFunc<F>>(
    (..._args: Parameters<F>) => debounce(func, wait, options),
    resolver,
  )

  function wrappedFunction(...args: Parameters<F>): ReturnType<F> | undefined {
    return debounceMemo(...args)(...args)
  }

  wrappedFunction.flush = (
    ...args: Parameters<F>
  ): ReturnType<F> | undefined => {
    return debounceMemo(...args).flush()
  }

  wrappedFunction.cancel = (...args: Parameters<F>): void => {
    debounceMemo(...args).cancel()
  }

  return wrappedFunction
}
