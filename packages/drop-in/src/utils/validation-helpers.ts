import { log } from './logger'

export function validateCode(code: string | undefined): code is string {
  return typeof code === 'string' && code !== ''
}

export function logCode(host: HTMLElement, code: string | undefined): void {
  if (!validateCode(code)) {
    log('warn', '"code" attribute should be a not empty string.', host)
  }
}

export function validateQuantity(quantity: number): boolean {
  return quantity >= 0
}

export function logQuantity(host: HTMLElement, quantity: number): void {
  if (!validateQuantity(quantity)) {
    log(
      'warn',
      '"quantity" attribute should be a number equal or greater than 0.',
      host
    )
  }
}

export function isValidUnion<T extends string | undefined>(
  union: T,
  values: ReadonlyArray<NonNullable<T>>
): union is NonNullable<T> {
  return union != null && values.includes(union)
}

export function logUnion<T extends string | undefined>(
  host: HTMLElement,
  attributeName: string,
  attributeValue: T,
  validValues: ReadonlyArray<NonNullable<T>>
): void {
  if (!isValidUnion(attributeValue, validValues)) {
    log(
      'warn',
      `"${attributeName}" attribute should be one of ${validValues
        .map((v) => `"${v}"`)
        .join(', ')}. Received: "${
        attributeValue !== undefined ? attributeValue : 'undefined'
      }"`,
      host
    )
  }
}
