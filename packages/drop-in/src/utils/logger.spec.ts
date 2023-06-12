import type { Config } from '#apis/commercelayer/config'
import { log } from './logger'

function injectConfig({
  clientId = '1234',
  slug = 'example',
  scope = 'market:123',
  debug,
  orderReturnUrl
}: Partial<Config>): void {
  Object.defineProperty(window, 'commercelayerConfig', {
    value: {
      clientId,
      slug,
      scope,
      debug,
      orderReturnUrl
    }
  })
}

describe('logger', () => {
  let consoleError: jest.SpyInstance<
    void,
    [message?: any, ...optionalParams: any[]]
  >
  let consoleInfo: jest.SpyInstance<
    void,
    [message?: any, ...optionalParams: any[]]
  >
  let consoleLog: jest.SpyInstance<
    void,
    [message?: any, ...optionalParams: any[]]
  >
  let consoleWarn: jest.SpyInstance<
    void,
    [message?: any, ...optionalParams: any[]]
  >
  let consoleGroup: jest.SpyInstance<
    void,
    [message?: any, ...optionalParams: any[]]
  >
  let consoleGroupEnd: jest.SpyInstance<
    void,
    [message?: any, ...optionalParams: any[]]
  >

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    consoleInfo = jest.spyOn(console, 'info').mockImplementation(() => {})
    consoleLog = jest.spyOn(console, 'log').mockImplementation(() => {})
    consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    consoleGroup = jest.spyOn(console, 'group').mockImplementation(() => {})
    consoleGroupEnd = jest
      .spyOn(console, 'groupEnd')
      .mockImplementation(() => {})
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

    log('error', 'This is a "error" message', 'with a second argument')
    log('info', 'This is a "info" message', 'with a second argument')
    log('log', 'This is a "log" message', 'with a second argument')
    log('warn', 'This is a "warn" message', 'with a second argument')

    expect(consoleError).toHaveBeenCalledTimes(0)
    expect(consoleInfo).toHaveBeenCalledTimes(0)
    expect(consoleLog).toHaveBeenCalledTimes(0)
    expect(consoleWarn).toHaveBeenCalledTimes(0)
    expect(consoleGroup).toHaveBeenCalledTimes(0)
    expect(consoleGroupEnd).toHaveBeenCalledTimes(0)
  })

  it('should not send anything to console when debug is set to "none"', () => {
    injectConfig({ debug: 'none' })

    log('error', 'This is a "error" message', 'with a second argument')
    log('info', 'This is a "info" message', 'with a second argument')
    log('log', 'This is a "log" message', 'with a second argument')
    log('warn', 'This is a "warn" message', 'with a second argument')

    expect(consoleError).toHaveBeenCalledTimes(0)
    expect(consoleInfo).toHaveBeenCalledTimes(0)
    expect(consoleLog).toHaveBeenCalledTimes(0)
    expect(consoleWarn).toHaveBeenCalledTimes(0)
    expect(consoleGroup).toHaveBeenCalledTimes(0)
    expect(consoleGroupEnd).toHaveBeenCalledTimes(0)
  })

  describe('when debug is set to "all"', () => {
    it('should pass-through the information to console.error', () => {
      injectConfig({ debug: 'all' })

      log('error', 'This is a "error" message', 'with a second argument')

      expect(consoleError).toHaveBeenCalledTimes(1)
      expect(consoleInfo).toHaveBeenCalledTimes(0)
      expect(consoleLog).toHaveBeenCalledTimes(0)
      expect(consoleWarn).toHaveBeenCalledTimes(0)
      expect(consoleGroup).toHaveBeenCalledTimes(0)
      expect(consoleGroupEnd).toHaveBeenCalledTimes(0)

      expect(consoleError).toHaveBeenCalledWith(
        'This is a "error" message',
        'with a second argument'
      )
    })

    it('should pass-through the information to console.info', () => {
      injectConfig({ debug: 'all' })

      log('info', 'This is a "info" message', 'with a second argument')

      expect(consoleError).toHaveBeenCalledTimes(0)
      expect(consoleInfo).toHaveBeenCalledTimes(1)
      expect(consoleLog).toHaveBeenCalledTimes(0)
      expect(consoleWarn).toHaveBeenCalledTimes(0)
      expect(consoleGroup).toHaveBeenCalledTimes(0)
      expect(consoleGroupEnd).toHaveBeenCalledTimes(0)

      expect(consoleInfo).toHaveBeenCalledWith(
        'This is a "info" message',
        'with a second argument'
      )
    })

    it('should pass-through the information to console.log', () => {
      injectConfig({ debug: 'all' })

      log('log', 'This is a "log" message', 'with a second argument')

      expect(consoleError).toHaveBeenCalledTimes(0)
      expect(consoleInfo).toHaveBeenCalledTimes(0)
      expect(consoleLog).toHaveBeenCalledTimes(1)
      expect(consoleWarn).toHaveBeenCalledTimes(0)
      expect(consoleGroup).toHaveBeenCalledTimes(0)
      expect(consoleGroupEnd).toHaveBeenCalledTimes(0)

      expect(consoleLog).toHaveBeenCalledWith(
        'This is a "log" message',
        'with a second argument'
      )
    })

    it('should pass-through the information to console.warn', () => {
      injectConfig({ debug: 'all' })

      log('warn', 'This is a "warn" message', 'with a second argument')

      expect(consoleError).toHaveBeenCalledTimes(0)
      expect(consoleInfo).toHaveBeenCalledTimes(0)
      expect(consoleLog).toHaveBeenCalledTimes(0)
      expect(consoleWarn).toHaveBeenCalledTimes(1)
      expect(consoleGroup).toHaveBeenCalledTimes(0)
      expect(consoleGroupEnd).toHaveBeenCalledTimes(0)

      expect(consoleWarn).toHaveBeenCalledWith(
        'This is a "warn" message',
        'with a second argument'
      )
    })

    it('should pass-through the information to console.group', () => {
      injectConfig({ debug: 'all' })

      log('group', 'This is a "group" message', 'with a second argument')

      expect(consoleError).toHaveBeenCalledTimes(0)
      expect(consoleInfo).toHaveBeenCalledTimes(0)
      expect(consoleLog).toHaveBeenCalledTimes(0)
      expect(consoleWarn).toHaveBeenCalledTimes(0)
      expect(consoleGroup).toHaveBeenCalledTimes(1)
      expect(consoleGroupEnd).toHaveBeenCalledTimes(0)

      expect(consoleGroup).toHaveBeenCalledWith(
        'This is a "group" message',
        'with a second argument'
      )
    })

    it('should pass-through the information to console.groupEnd', () => {
      injectConfig({ debug: 'all' })

      log('groupEnd', 'This is a "groupEnd" message', 'with a second argument')

      expect(consoleError).toHaveBeenCalledTimes(0)
      expect(consoleInfo).toHaveBeenCalledTimes(0)
      expect(consoleLog).toHaveBeenCalledTimes(0)
      expect(consoleWarn).toHaveBeenCalledTimes(0)
      expect(consoleGroup).toHaveBeenCalledTimes(0)
      expect(consoleGroupEnd).toHaveBeenCalledTimes(1)

      expect(consoleGroupEnd).toHaveBeenCalledWith(
        'This is a "groupEnd" message',
        'with a second argument'
      )
    })
  })
})
