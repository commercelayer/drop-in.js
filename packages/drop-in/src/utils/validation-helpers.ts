import { log } from './logger'

export function validateSku(sku: string | undefined): sku is string {
  return typeof sku === 'string' && sku !== ''
}

export function logSku(host: HTMLElement, sku: string | undefined): void {
  if (!validateSku(sku)) {
    log('warn', '"sku" should be a not empty string.', host)
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
