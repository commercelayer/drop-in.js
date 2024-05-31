import { chunk, isNotNullish, uniq, memoize } from './utils'

describe('chunk', () => {
  it('should be able to chunk an empty array', () => {
    expect(chunk([], 0)).toEqual([])
    expect(chunk([], 10)).toEqual([])
  })

  it('should be able to chunk an array with a number of elements lower than the given size', () => {
    expect(chunk(['a', 'b', 'c', 'd'], 4)).toEqual([['a', 'b', 'c', 'd']])
    expect(chunk(['a', 'b', 'c', 'd'], 5)).toEqual([['a', 'b', 'c', 'd']])
    expect(chunk(['a', 'b', 'c', 'd'], 10)).toEqual([['a', 'b', 'c', 'd']])
  })

  it('should be able to chunk an array with a number of elements greater than the given size', () => {
    expect(chunk(['a', 'b', 'c', 'd'])).toEqual([['a'], ['b'], ['c'], ['d']])
    expect(chunk(['a', 'b', 'c', 'd'], 1)).toEqual([['a'], ['b'], ['c'], ['d']])
    expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([
      ['a', 'b'],
      ['c', 'd']
    ])
    expect(chunk(['a', 'b', 'c', 'd'], 3)).toEqual([['a', 'b', 'c'], ['d']])
  })

  it('should return an empty array when the given size is lower than 1', () => {
    expect(chunk(['a', 'b', 'c', 'd'], 0)).toEqual([])
    expect(chunk(['a', 'b', 'c', 'd'], -1)).toEqual([])
    expect(chunk(['a', 'b', 'c', 'd'], -10)).toEqual([])
  })
})

test('uniq should create a duplicate-free version of an array', () => {
  expect(uniq([2, 1, 2])).toEqual([2, 1])
  expect(uniq([2, 'a', 1, 2, 'a', 5])).toEqual([2, 'a', 1, 5])
})

test('isNotNullish should return true when the value is not nullish', () => {
  expect(isNotNullish(1)).toBe(true)
  expect(isNotNullish('a')).toBe(true)
  expect(isNotNullish(true)).toBe(true)
  expect(isNotNullish(false)).toBe(true)
  expect(isNotNullish(null)).toBe(false)
  expect(isNotNullish(undefined)).toBe(false)
})

test('memoize should returns a new memoized function', () => {
  const func = jest
    .fn()
    .mockImplementation((a: number, b: number): number => a + b)

  const memoizedFunc = memoize(func)

  expect(memoizedFunc(1, 1)).toEqual(2)

  expect(memoizedFunc(4, 4)).toEqual(8)
  expect(memoizedFunc(4, 4)).toEqual(8)
  expect(memoizedFunc(4, 4)).toEqual(8)
  expect(memoizedFunc(4, 4)).toEqual(8)

  expect(func).toHaveBeenCalledTimes(2)
})
