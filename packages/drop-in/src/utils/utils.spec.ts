import { chunk, format, isNotNullish, uniq } from './utils'

describe('format', () => {
  it('returns empty string for no names defined', () => {
    expect(format(undefined, undefined, undefined)).toEqual('')
  })

  it('formats just first names', () => {
    expect(format('Joseph', undefined, undefined)).toEqual('Joseph')
  })

  it('formats first and last names', () => {
    expect(format('Joseph', undefined, 'Publique')).toEqual('Joseph Publique')
  })

  it('formats first, middle and last names', () => {
    expect(format('Joseph', 'Quincy', 'Publique')).toEqual('Joseph Quincy Publique')
  })
})

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
    expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([['a', 'b'], ['c', 'd']])
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
