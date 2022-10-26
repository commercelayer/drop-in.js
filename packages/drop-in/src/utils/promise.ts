import debounce from 'lodash/debounce'

interface Options {
  wait: number
  maxWait: number
}

type DebouncedFunc<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => Promise<Awaited<ReturnType<T>>>

export const pDebounce = <T extends (arg: any[]) => any>(
  input: T,
  options?: Options
): DebouncedFunc<T> => {
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
    item: Array<Parameters<T>> | undefined
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
