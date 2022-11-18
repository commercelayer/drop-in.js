import { log } from './logger'

export function validateCode(code: string | undefined): code is string {
  return typeof code === 'string' && code !== ''
}

export function logCode(host: HTMLElement, code: string | undefined): void {
  if (!validateCode(code)) {
    log('warn', '"code" should be a not empty string.', host)
  }
}

export function validateQuantity(quantity: number): boolean {
  return quantity >= 0
}

export function logQuantity(host: HTMLElement, quantity: number): void {
  if (!validateQuantity(quantity)) {
    log('warn', '"quantity" should be a number equal or greater than 0.', host)
  }
}
