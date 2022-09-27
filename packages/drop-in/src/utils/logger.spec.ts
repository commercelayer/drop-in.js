import { log } from './logger'

describe('logger', () => {
  let consoleError: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>
  let consoleInfo: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>
  let consoleLog: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>
  let consoleWarn: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => { })
    consoleInfo = jest.spyOn(console, 'info').mockImplementation(() => { })
    consoleLog = jest.spyOn(console, 'log').mockImplementation(() => { })
    consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => { })
  })

  afterEach(() => {
    consoleError.mockClear()
    consoleInfo.mockClear()
    consoleLog.mockClear()
    consoleWarn.mockClear()
  })

  it('should not send anything to console when debug is not define (default to "none")', () => {
    log('error', 'This is a "error" message', 'with a second argument')
    log('info', 'This is a "info" message', 'with a second argument')
    log('log', 'This is a "log" message', 'with a second argument')
    log('warn', 'This is a "warn" message', 'with a second argument')

    expect(consoleError).toHaveBeenCalledTimes(0)
    expect(consoleInfo).toHaveBeenCalledTimes(0)
    expect(consoleLog).toHaveBeenCalledTimes(0)
    expect(consoleWarn).toHaveBeenCalledTimes(0)
  })

  it('should not send anything to console when debug is set to "none"', () => {
    log('error', 'This is a "error" message', 'with a second argument')
    log('info', 'This is a "info" message', 'with a second argument')
    log('log', 'This is a "log" message', 'with a second argument')
    log('warn', 'This is a "warn" message', 'with a second argument')

    expect(consoleError).toHaveBeenCalledTimes(0)
    expect(consoleInfo).toHaveBeenCalledTimes(0)
    expect(consoleLog).toHaveBeenCalledTimes(0)
    expect(consoleWarn).toHaveBeenCalledTimes(0)
  })

  describe('when debug is set to "all"', () => {
    it('should pass-through the information to console.error', () => {
      // @ts-expect-error
      window.commercelayerConfig = { debug: 'all' }

      log('error', 'This is a "error" message', 'with a second argument')

      expect(consoleError).toHaveBeenCalledTimes(1)
      expect(consoleInfo).toHaveBeenCalledTimes(0)
      expect(consoleLog).toHaveBeenCalledTimes(0)
      expect(consoleWarn).toHaveBeenCalledTimes(0)

      expect(consoleError).toHaveBeenCalledWith('This is a "error" message', 'with a second argument')
    })

    it('should pass-through the information to console.info', () => {
      // @ts-expect-error
      window.commercelayerConfig = { debug: 'all' }

      log('info', 'This is a "info" message', 'with a second argument')

      expect(consoleError).toHaveBeenCalledTimes(0)
      expect(consoleInfo).toHaveBeenCalledTimes(1)
      expect(consoleLog).toHaveBeenCalledTimes(0)
      expect(consoleWarn).toHaveBeenCalledTimes(0)

      expect(consoleInfo).toHaveBeenCalledWith('This is a "info" message', 'with a second argument')
    })

    it('should pass-through the information to console.log', () => {
      // @ts-expect-error
      window.commercelayerConfig = { debug: 'all' }

      log('log', 'This is a "log" message', 'with a second argument')

      expect(consoleError).toHaveBeenCalledTimes(0)
      expect(consoleInfo).toHaveBeenCalledTimes(0)
      expect(consoleLog).toHaveBeenCalledTimes(1)
      expect(consoleWarn).toHaveBeenCalledTimes(0)

      expect(consoleLog).toHaveBeenCalledWith('This is a "log" message', 'with a second argument')
    })

    it('should pass-through the information to console.warn', () => {
      // @ts-expect-error
      window.commercelayerConfig = { debug: 'all' }

      log('warn', 'This is a "warn" message', 'with a second argument')

      expect(consoleError).toHaveBeenCalledTimes(0)
      expect(consoleInfo).toHaveBeenCalledTimes(0)
      expect(consoleLog).toHaveBeenCalledTimes(0)
      expect(consoleWarn).toHaveBeenCalledTimes(1)

      expect(consoleWarn).toHaveBeenCalledWith('This is a "warn" message', 'with a second argument')
    })
  })
})
