import { log } from './logger';
export function validateSku(sku) {
  return typeof sku === 'string' && sku !== '';
}
export function logSku(host, sku) {
  if (!validateSku(sku)) {
    log('warn', '"sku" should be a not empty string.', host);
  }
}
export function validateQuantity(quantity) {
  return quantity >= 0;
}
export function logQuantity(host, quantity) {
  if (!validateQuantity(quantity)) {
    log('warn', '"quantity" should be a number equal or greater than 0.', host);
  }
}
