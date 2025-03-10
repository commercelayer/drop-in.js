import { memoDebounce } from "./debounce"

describe("debounce", () => {
  describe("memoDebounce", () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it("should debounce the function given the same list of arguments (expect 1 dispatch)", () => {
      const fn = jest.fn()
      const dfn = memoDebounce(fn, 10, { leading: true, trailing: false })
      setTimeout(() => dfn(1, "a", {}), 0)
      setTimeout(() => dfn(1, "a", {}), 8)
      setTimeout(() => dfn(1, "a", {}), 18)
      setTimeout(() => dfn(1, "a", {}), 25)
      jest.advanceTimersByTime(50)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it("should debounce the function given the same list of arguments (expect 2 dispatches)", () => {
      const fn = jest.fn()
      const dfn = memoDebounce(fn, 10, { leading: true, trailing: false })
      setTimeout(() => dfn(), 0)
      setTimeout(() => dfn(), 8)
      setTimeout(() => dfn(), 19) // 11ms after
      setTimeout(() => dfn(), 25)
      jest.advanceTimersByTime(50)
      expect(fn).toHaveBeenCalledTimes(2)
    })

    it("should debounce the function given a list of different arguments", () => {
      const fn = jest.fn()
      const dfn = memoDebounce(fn, 10, { leading: true, trailing: false })
      setTimeout(() => dfn("arg1"), 0)
      setTimeout(() => dfn("arg1"), 10)
      setTimeout(() => dfn("something else"), 1)
      setTimeout(() => dfn("arg1", "arg2"), 3)
      setTimeout(() => dfn("arg1", { name: "M" }), 3)
      setTimeout(() => dfn("arg1", { name: "M" }), 10)
      setTimeout(() => dfn("arg1", { name: "L" }), 3)
      setTimeout(() => dfn("arg1", { name: "L" }), 10)
      jest.advanceTimersByTime(30)
      expect(fn).toHaveBeenCalledTimes(5)
    })
  })
})
