import type { MockInstance } from "vitest"
import { vi } from "vitest"
import type { Config } from "@/apis/commercelayer/config"
import { log } from "./logger"

function injectConfig({
  clientId = "1234",
  scope = "market:code:usa",
  debug,
}: Partial<Config>): void {
  Object.defineProperty(window, "commercelayerConfig", {
    value: {
      clientId,
      scope,
      debug,
    },
  })
}

describe("logger", () => {
  let consoleError: MockInstance<
    (message?: any, ...optionalParams: any[]) => void
  >
  let consoleInfo: MockInstance<
    (message?: any, ...optionalParams: any[]) => void
  >
  let consoleLog: MockInstance<
    (message?: any, ...optionalParams: any[]) => void
  >
  let consoleWarn: MockInstance<
    (message?: any, ...optionalParams: any[]) => void
  >
  let consoleGroup: MockInstance<
    (message?: any, ...optionalParams: any[]) => void
  >
  let consoleGroupEnd: MockInstance<
    (message?: any, ...optionalParams: any[]) => void
  >

  beforeEach(() => {
    consoleError = vi.spyOn(console, "error").mockImplementation(() => {})
    consoleInfo = vi.spyOn(console, "info").mockImplementation(() => {})
    consoleLog = vi.spyOn(console, "log").mockImplementation(() => {})
    consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {})
    consoleGroup = vi.spyOn(console, "group").mockImplementation(() => {})
    consoleGroupEnd = vi.spyOn(console, "groupEnd").mockImplementation(() => {})
  })

  afterEach(() => {
    consoleError.mockClear()
    consoleInfo.mockClear()
    consoleLog.mockClear()
    consoleWarn.mockClear()
    consoleGroup.mockClear()
    consoleGroupEnd.mockClear()

    // // @ts-expect-error
    // delete window['commercelayerConfig']
  })

  it('should not send anything to console when debug is not define (default to "none")', () => {
    injectConfig({})

    log("error", 'This is a "error" message', "with a second argument")
    log("info", 'This is a "info" message', "with a second argument")
    log("log", 'This is a "log" message', "with a second argument")
    log("warn", 'This is a "warn" message', "with a second argument")

    expect(consoleError).toHaveBeenCalledTimes(0)
    expect(consoleInfo).toHaveBeenCalledTimes(0)
    expect(consoleLog).toHaveBeenCalledTimes(0)
    expect(consoleWarn).toHaveBeenCalledTimes(0)
    expect(consoleGroup).toHaveBeenCalledTimes(0)
    expect(consoleGroupEnd).toHaveBeenCalledTimes(0)
  })

  it('should not send anything to console when debug is set to "none"', () => {
    injectConfig({ debug: "none" })

    log("error", 'This is a "error" message', "with a second argument")
    log("info", 'This is a "info" message', "with a second argument")
    log("log", 'This is a "log" message', "with a second argument")
    log("warn", 'This is a "warn" message', "with a second argument")

    expect(consoleError).toHaveBeenCalledTimes(0)
    expect(consoleInfo).toHaveBeenCalledTimes(0)
    expect(consoleLog).toHaveBeenCalledTimes(0)
    expect(consoleWarn).toHaveBeenCalledTimes(0)
    expect(consoleGroup).toHaveBeenCalledTimes(0)
    expect(consoleGroupEnd).toHaveBeenCalledTimes(0)
  })

  describe('when debug is set to "all"', () => {
    it("should pass-through the information to console.error", () => {
      injectConfig({ debug: "all" })

      log("error", 'This is a "error" message', "with a second argument")

      expect(consoleError).toHaveBeenCalledTimes(1)
      expect(consoleInfo).toHaveBeenCalledTimes(0)
      expect(consoleLog).toHaveBeenCalledTimes(0)
      expect(consoleWarn).toHaveBeenCalledTimes(0)
      expect(consoleGroup).toHaveBeenCalledTimes(0)
      expect(consoleGroupEnd).toHaveBeenCalledTimes(0)

      expect(consoleError).toHaveBeenCalledWith(
        'This is a "error" message',
        "with a second argument",
      )
    })

    it("should pass-through the information to console.info", () => {
      injectConfig({ debug: "all" })

      log("info", 'This is a "info" message', "with a second argument")

      expect(consoleError).toHaveBeenCalledTimes(0)
      expect(consoleInfo).toHaveBeenCalledTimes(1)
      expect(consoleLog).toHaveBeenCalledTimes(0)
      expect(consoleWarn).toHaveBeenCalledTimes(0)
      expect(consoleGroup).toHaveBeenCalledTimes(0)
      expect(consoleGroupEnd).toHaveBeenCalledTimes(0)

      expect(consoleInfo).toHaveBeenCalledWith(
        'This is a "info" message',
        "with a second argument",
      )
    })

    it("should pass-through the information to console.log", () => {
      injectConfig({ debug: "all" })

      log("log", 'This is a "log" message', "with a second argument")

      expect(consoleError).toHaveBeenCalledTimes(0)
      expect(consoleInfo).toHaveBeenCalledTimes(0)
      expect(consoleLog).toHaveBeenCalledTimes(1)
      expect(consoleWarn).toHaveBeenCalledTimes(0)
      expect(consoleGroup).toHaveBeenCalledTimes(0)
      expect(consoleGroupEnd).toHaveBeenCalledTimes(0)

      expect(consoleLog).toHaveBeenCalledWith(
        'This is a "log" message',
        "with a second argument",
      )
    })

    it("should pass-through the information to console.warn", () => {
      injectConfig({ debug: "all" })

      log("warn", 'This is a "warn" message', "with a second argument")

      expect(consoleError).toHaveBeenCalledTimes(0)
      expect(consoleInfo).toHaveBeenCalledTimes(0)
      expect(consoleLog).toHaveBeenCalledTimes(0)
      expect(consoleWarn).toHaveBeenCalledTimes(1)
      expect(consoleGroup).toHaveBeenCalledTimes(0)
      expect(consoleGroupEnd).toHaveBeenCalledTimes(0)

      expect(consoleWarn).toHaveBeenCalledWith(
        'This is a "warn" message',
        "with a second argument",
      )
    })

    it("should pass-through the information to console.group", () => {
      injectConfig({ debug: "all" })

      log("group", 'This is a "group" message', "with a second argument")

      expect(consoleError).toHaveBeenCalledTimes(0)
      expect(consoleInfo).toHaveBeenCalledTimes(0)
      expect(consoleLog).toHaveBeenCalledTimes(0)
      expect(consoleWarn).toHaveBeenCalledTimes(0)
      expect(consoleGroup).toHaveBeenCalledTimes(1)
      expect(consoleGroupEnd).toHaveBeenCalledTimes(0)

      expect(consoleGroup).toHaveBeenCalledWith(
        'This is a "group" message',
        "with a second argument",
      )
    })

    it("should pass-through the information to console.groupEnd", () => {
      injectConfig({ debug: "all" })

      log("groupEnd", 'This is a "groupEnd" message', "with a second argument")

      expect(consoleError).toHaveBeenCalledTimes(0)
      expect(consoleInfo).toHaveBeenCalledTimes(0)
      expect(consoleLog).toHaveBeenCalledTimes(0)
      expect(consoleWarn).toHaveBeenCalledTimes(0)
      expect(consoleGroup).toHaveBeenCalledTimes(0)
      expect(consoleGroupEnd).toHaveBeenCalledTimes(1)

      expect(consoleGroupEnd).toHaveBeenCalledWith(
        'This is a "groupEnd" message',
        "with a second argument",
      )
    })
  })
})
