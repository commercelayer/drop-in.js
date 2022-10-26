'use strict';

const promise = require('./promise-c0988a5f.js');

/**
 * Create a draft order.
 * @see https://docs.commercelayer.io/core/v/how-tos/shopping-cart/create-a-shopping-cart
 * @returns Returns the created draft order.
 */
async function createEmptyCart() {
  const client = await promise.createClient(promise.getConfig());
  const order = await client.orders.create({});
  setCartId(order.id);
  await triggerCartUpdate(order);
  return order;
}
function setCartId(cartId) {
  promise.js_cookie.set(promise.getKeyForCart(), cartId);
}
function getCartId() {
  var _a;
  return (_a = promise.js_cookie.get(promise.getKeyForCart())) !== null && _a !== void 0 ? _a : null;
}
function isValidUrl(url) {
  const cartId = getCartId();
  return cartId !== null && url.includes(`/${cartId}?`);
}
/**
 * Get the Hosted Cart url.
 * @param forceCartToExist When true it will create an empty cart if not existing before.
 * @returns Returns the Hosted Cart url.
 */
async function getCartUrl(forceCartToExist = false) {
  const config = promise.getConfig();
  const accessToken = await promise.getAccessToken(config);
  let cartId = getCartId();
  if (cartId === null && forceCartToExist) {
    const cart = await createEmptyCart();
    cartId = cart.id;
  }
  return `https://${config.slug}.commercelayer.app/cart/${cartId !== null && cartId !== void 0 ? cartId : 'null'}?accessToken=${accessToken}`;
}
async function _getCart() {
  const client = await promise.createClient(promise.getConfig());
  const orderId = getCartId();
  if (orderId === null) {
    return null;
  }
  const order = await client.orders.retrieve(orderId).catch(() => null);
  return order;
}
const getCart = promise.pDebounce(_getCart, { wait: 50, maxWait: 100 });
async function triggerCartUpdate(order) {
  order || (order = await getCart());
  if (order !== null) {
    // TODO: manage events in separate file
    window.dispatchEvent(new CustomEvent('cartUpdate', { detail: order }));
  }
}
async function addItem(sku, quantity) {
  var _a;
  const client = await promise.createClient(promise.getConfig());
  const orderId = (_a = getCartId()) !== null && _a !== void 0 ? _a : (await (await createEmptyCart()).id);
  await client.line_items.create({
    order: {
      id: orderId,
      type: 'orders'
    },
    quantity,
    sku_code: sku,
    _update_quantity: true
  });
  await triggerCartUpdate(null);
}

exports.addItem = addItem;
exports.getCartUrl = getCartUrl;
exports.isValidUrl = isValidUrl;
exports.triggerCartUpdate = triggerCartUpdate;
