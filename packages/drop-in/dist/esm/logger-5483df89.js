const prefix = 'commercelayer_';
// TODO: shall we manage the country?
function getKeyForCart() {
  return `${prefix}order-id`;
}
function getKeyForAccessToken(clientCredentials) {
  var _a;
  const scope = Array.isArray(clientCredentials.scope)
    ? clientCredentials.scope.join('-')
    : (_a = clientCredentials.scope) !== null && _a !== void 0 ? _a : 'undefined';
  return `${prefix}token-${clientCredentials.clientId}-${scope}`;
}

/**
 * Creates an array of elements split into groups the length of `size`. If `array` can't be split evenly, the final chunk will be the remaining elements.
 * @param array The array to process.
 * @param size The length of each chunk.
 * @returns Returns the new array of chunks.
 */
function chunk(array, size = 1) {
  if (size < 1) {
    return [];
  }
  return array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / size);
    resultArray[chunkIndex] || (resultArray[chunkIndex] = []);
    // @ts-expect-error
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
}
/**
 * Check if the value is different from `null` and `undefined`.
 * @returns `true` when `value` is different from `null` and `undefined`.
 */
function isNotNullish(value) {
  return value !== null && value !== undefined;
}
/**
 * Creates a duplicate-free version of an array.
 * @param array The array to inspect.
 * @returns Returns the new duplicate free array.
 */
function uniq(array) {
  return [...new Set(array)];
}
/**
 * Creates a function that memoizes the result of func.
 * @param func The function to have its output memoized.
 * @returns Returns the new memoized function.
 */
const memoize = (func) => {
  const cache = {};
  return (...args) => {
    const cacheKey = JSON.stringify(args);
    if (cache[cacheKey] === undefined) {
      cache[cacheKey] = func(...args);
    }
    return cache[cacheKey];
  };
};

const _nodeResolve_empty = {};

const _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': _nodeResolve_empty
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire();
		}
	}, fn(module, module.exports), module.exports;
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

// Copyright Joyent, Inc. and other Node contributors.

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var decode = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

// Copyright Joyent, Inc. and other Node contributors.

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

var encode$1 = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).map(function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var querystring = createCommonjsModule(function (module, exports) {

exports.decode = exports.parse = decode;
exports.encode = exports.stringify = encode$1;
});

/**
 * Make a request using `XMLHttpRequest`.
 *
 * @param   {string}  method
 * @param   {string}  url
 * @param   {string}  body
 * @param   {Object}  headers
 * @returns {Promise}
 */
var browser = function request (method, url, body, headers) {
  return new Promise(function (resolve, reject) {
    var xhr = new window.XMLHttpRequest();

    xhr.open(method, url);

    xhr.onload = function () {
      return resolve({
        status: xhr.status,
        body: xhr.responseText
      })
    };

    xhr.onerror = xhr.onabort = function () {
      return reject(new Error(xhr.statusText || 'XHR aborted: ' + url))
    };

    Object.keys(headers).forEach(function (header) {
      xhr.setRequestHeader(header, headers[header]);
    });

    xhr.send(body);
  })
};

const require$$0 = /*@__PURE__*/getAugmentedNamespace(_nodeResolve_empty$1);

var Buffer$1 = require$$0.Buffer;



const DEFAULT_URL_BASE = 'https://example.org/';

var btoa$1;
if (typeof Buffer$1 === 'function') {
  btoa$1 = btoaBuffer;
} else {
  btoa$1 = window.btoa.bind(window);
}

/**
 * Export `ClientOAuth2` class.
 */
var clientOauth2 = ClientOAuth2;

/**
 * Default headers for executing OAuth 2.0 flows.
 */
var DEFAULT_HEADERS = {
  Accept: 'application/json, application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded'
};

/**
 * Format error response types to regular strings for displaying to clients.
 *
 * Reference: http://tools.ietf.org/html/rfc6749#section-4.1.2.1
 */
var ERROR_RESPONSES = {
  invalid_request: [
    'The request is missing a required parameter, includes an',
    'invalid parameter value, includes a parameter more than',
    'once, or is otherwise malformed.'
  ].join(' '),
  invalid_client: [
    'Client authentication failed (e.g., unknown client, no',
    'client authentication included, or unsupported',
    'authentication method).'
  ].join(' '),
  invalid_grant: [
    'The provided authorization grant (e.g., authorization',
    'code, resource owner credentials) or refresh token is',
    'invalid, expired, revoked, does not match the redirection',
    'URI used in the authorization request, or was issued to',
    'another client.'
  ].join(' '),
  unauthorized_client: [
    'The client is not authorized to request an authorization',
    'code using this method.'
  ].join(' '),
  unsupported_grant_type: [
    'The authorization grant type is not supported by the',
    'authorization server.'
  ].join(' '),
  access_denied: [
    'The resource owner or authorization server denied the request.'
  ].join(' '),
  unsupported_response_type: [
    'The authorization server does not support obtaining',
    'an authorization code using this method.'
  ].join(' '),
  invalid_scope: [
    'The requested scope is invalid, unknown, or malformed.'
  ].join(' '),
  server_error: [
    'The authorization server encountered an unexpected',
    'condition that prevented it from fulfilling the request.',
    '(This error code is needed because a 500 Internal Server',
    'Error HTTP status code cannot be returned to the client',
    'via an HTTP redirect.)'
  ].join(' '),
  temporarily_unavailable: [
    'The authorization server is currently unable to handle',
    'the request due to a temporary overloading or maintenance',
    'of the server.'
  ].join(' ')
};

/**
 * Support base64 in node like how it works in the browser.
 *
 * @param  {string} string
 * @return {string}
 */
function btoaBuffer (string) {
  return Buffer$1.from(string).toString('base64')
}

/**
 * Check if properties exist on an object and throw when they aren't.
 *
 * @throws {TypeError} If an expected property is missing.
 *
 * @param {Object}    obj
 * @param {...string} props
 */
function expects (obj) {
  for (var i = 1; i < arguments.length; i++) {
    var prop = arguments[i];

    if (obj[prop] == null) {
      throw new TypeError('Expected "' + prop + '" to exist')
    }
  }
}

/**
 * Pull an authentication error from the response data.
 *
 * @param  {Object} data
 * @return {string}
 */
function getAuthError (body) {
  var message = ERROR_RESPONSES[body.error] ||
    body.error_description ||
    body.error;

  if (message) {
    var err = new Error(message);
    err.body = body;
    err.code = 'EAUTH';
    return err
  }
}

/**
 * Attempt to parse response body as JSON, fall back to parsing as a query string.
 *
 * @param {string} body
 * @return {Object}
 */
function parseResponseBody (body) {
  try {
    return JSON.parse(body)
  } catch (e) {
    return querystring.parse(body)
  }
}

/**
 * Sanitize the scopes option to be a string.
 *
 * @param  {Array}  scopes
 * @return {string}
 */
function sanitizeScope (scopes) {
  return Array.isArray(scopes) ? scopes.join(' ') : toString$1(scopes)
}

/**
 * Create a request uri based on an options object and token type.
 *
 * @param  {Object} options
 * @param  {string} tokenType
 * @return {string}
 */
function createUri (options, tokenType) {
  // Check the required parameters are set.
  expects(options, 'clientId', 'authorizationUri');

  const qs = {
    client_id: options.clientId,
    redirect_uri: options.redirectUri,
    response_type: tokenType,
    state: options.state
  };
  if (options.scopes !== undefined) {
    qs.scope = sanitizeScope(options.scopes);
  }

  const sep = options.authorizationUri.includes('?') ? '&' : '?';
  return options.authorizationUri + sep + querystring.stringify(
    Object.assign(qs, options.query))
}

/**
 * Create basic auth header.
 *
 * @param  {string} username
 * @param  {string} password
 * @return {string}
 */
function auth (username, password) {
  return 'Basic ' + btoa$1(toString$1(username) + ':' + toString$1(password))
}

/**
 * Ensure a value is a string.
 *
 * @param  {string} str
 * @return {string}
 */
function toString$1 (str) {
  return str == null ? '' : String(str)
}

/**
 * Merge request options from an options object.
 */
function requestOptions (requestOptions, options) {
  return {
    url: requestOptions.url,
    method: requestOptions.method,
    body: Object.assign({}, requestOptions.body, options.body),
    query: Object.assign({}, requestOptions.query, options.query),
    headers: Object.assign({}, requestOptions.headers, options.headers)
  }
}

/**
 * Construct an object that can handle the multiple OAuth 2.0 flows.
 *
 * @param {Object} options
 */
function ClientOAuth2 (options, request) {
  this.options = options;
  this.request = request || browser;

  this.code = new CodeFlow(this);
  this.token = new TokenFlow(this);
  this.owner = new OwnerFlow(this);
  this.credentials = new CredentialsFlow(this);
  this.jwt = new JwtBearerFlow(this);
}

/**
 * Alias the token constructor.
 *
 * @type {Function}
 */
ClientOAuth2.Token = ClientOAuth2Token;

/**
 * Create a new token from existing data.
 *
 * @param  {string} access
 * @param  {string} [refresh]
 * @param  {string} [type]
 * @param  {Object} [data]
 * @return {Object}
 */
ClientOAuth2.prototype.createToken = function (access, refresh, type, data) {
  var options = Object.assign(
    {},
    data,
    typeof access === 'string' ? { access_token: access } : access,
    typeof refresh === 'string' ? { refresh_token: refresh } : refresh,
    typeof type === 'string' ? { token_type: type } : type
  );

  return new ClientOAuth2.Token(this, options)
};

/**
 * Using the built-in request method, we'll automatically attempt to parse
 * the response.
 *
 * @param  {Object}  options
 * @return {Promise}
 */
ClientOAuth2.prototype._request = function (options) {
  var url = options.url;
  var body = querystring.stringify(options.body);
  var query = querystring.stringify(options.query);

  if (query) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + query;
  }

  return this.request(options.method, url, body, options.headers)
    .then(function (res) {
      var body = parseResponseBody(res.body);
      var authErr = getAuthError(body);

      if (authErr) {
        return Promise.reject(authErr)
      }

      if (res.status < 200 || res.status >= 399) {
        var statusErr = new Error('HTTP status ' + res.status);
        statusErr.status = res.status;
        statusErr.body = res.body;
        statusErr.code = 'ESTATUS';
        return Promise.reject(statusErr)
      }

      return body
    })
};

/**
 * General purpose client token generator.
 *
 * @param {Object} client
 * @param {Object} data
 */
function ClientOAuth2Token (client, data) {
  this.client = client;
  this.data = data;
  this.tokenType = data.token_type && data.token_type.toLowerCase();
  this.accessToken = data.access_token;
  this.refreshToken = data.refresh_token;

  this.expiresIn(Number(data.expires_in));
}

/**
 * Expire the token after some time.
 *
 * @param  {number|Date} duration Seconds from now to expire, or a date to expire on.
 * @return {Date}
 */
ClientOAuth2Token.prototype.expiresIn = function (duration) {
  if (typeof duration === 'number') {
    this.expires = new Date();
    this.expires.setSeconds(this.expires.getSeconds() + duration);
  } else if (duration instanceof Date) {
    this.expires = new Date(duration.getTime());
  } else {
    throw new TypeError('Unknown duration: ' + duration)
  }

  return this.expires
};

/**
 * Sign a standardised request object with user authentication information.
 *
 * @param  {Object} requestObject
 * @return {Object}
 */
ClientOAuth2Token.prototype.sign = function (requestObject) {
  if (!this.accessToken) {
    throw new Error('Unable to sign without access token')
  }

  requestObject.headers = requestObject.headers || {};

  if (this.tokenType === 'bearer') {
    requestObject.headers.Authorization = 'Bearer ' + this.accessToken;
  } else {
    var parts = requestObject.url.split('#');
    var token = 'access_token=' + this.accessToken;
    var url = parts[0].replace(/[?&]access_token=[^&#]/, '');
    var fragment = parts[1] ? '#' + parts[1] : '';

    // Prepend the correct query string parameter to the url.
    requestObject.url = url + (url.indexOf('?') > -1 ? '&' : '?') + token + fragment;

    // Attempt to avoid storing the url in proxies, since the access token
    // is exposed in the query parameters.
    requestObject.headers.Pragma = 'no-store';
    requestObject.headers['Cache-Control'] = 'no-store';
  }

  return requestObject
};

/**
 * Refresh a user access token with the supplied token.
 *
 * @param  {Object}  opts
 * @return {Promise}
 */
ClientOAuth2Token.prototype.refresh = function (opts) {
  var self = this;
  var options = Object.assign({}, this.client.options, opts);

  if (!this.refreshToken) {
    return Promise.reject(new Error('No refresh token'))
  }

  return this.client._request(requestOptions({
    url: options.accessTokenUri,
    method: 'POST',
    headers: Object.assign({}, DEFAULT_HEADERS, {
      Authorization: auth(options.clientId, options.clientSecret)
    }),
    body: {
      refresh_token: this.refreshToken,
      grant_type: 'refresh_token'
    }
  }, options))
    .then(function (data) {
      return self.client.createToken(Object.assign({}, self.data, data))
    })
};

/**
 * Check whether the token has expired.
 *
 * @return {boolean}
 */
ClientOAuth2Token.prototype.expired = function () {
  return Date.now() > this.expires.getTime()
};

/**
 * Support resource owner password credentials OAuth 2.0 grant.
 *
 * Reference: http://tools.ietf.org/html/rfc6749#section-4.3
 *
 * @param {ClientOAuth2} client
 */
function OwnerFlow (client) {
  this.client = client;
}

/**
 * Make a request on behalf of the user credentials to get an access token.
 *
 * @param  {string}  username
 * @param  {string}  password
 * @param  {Object}  [opts]
 * @return {Promise}
 */
OwnerFlow.prototype.getToken = function (username, password, opts) {
  var self = this;
  var options = Object.assign({}, this.client.options, opts);

  const body = {
    username: username,
    password: password,
    grant_type: 'password'
  };
  if (options.scopes !== undefined) {
    body.scope = sanitizeScope(options.scopes);
  }

  return this.client._request(requestOptions({
    url: options.accessTokenUri,
    method: 'POST',
    headers: Object.assign({}, DEFAULT_HEADERS, {
      Authorization: auth(options.clientId, options.clientSecret)
    }),
    body: body
  }, options))
    .then(function (data) {
      return self.client.createToken(data)
    })
};

/**
 * Support implicit OAuth 2.0 grant.
 *
 * Reference: http://tools.ietf.org/html/rfc6749#section-4.2
 *
 * @param {ClientOAuth2} client
 */
function TokenFlow (client) {
  this.client = client;
}

/**
 * Get the uri to redirect the user to for implicit authentication.
 *
 * @param  {Object} [opts]
 * @return {string}
 */
TokenFlow.prototype.getUri = function (opts) {
  var options = Object.assign({}, this.client.options, opts);

  return createUri(options, 'token')
};

/**
 * Get the user access token from the uri.
 *
 * @param  {string|Object} uri
 * @param  {Object}        [opts]
 * @return {Promise}
 */
TokenFlow.prototype.getToken = function (uri, opts) {
  var options = Object.assign({}, this.client.options, opts);
  var url = typeof uri === 'object' ? uri : new URL(uri, DEFAULT_URL_BASE);
  var expectedUrl = new URL(options.redirectUri, DEFAULT_URL_BASE);

  if (typeof url.pathname === 'string' && url.pathname !== expectedUrl.pathname) {
    return Promise.reject(
      new TypeError('Redirected path should match configured path, but got: ' + url.pathname)
    )
  }

  // If no query string or fragment exists, we won't be able to parse
  // any useful information from the uri.
  if (!url.hash && !url.search) {
    return Promise.reject(new TypeError('Unable to process uri: ' + uri))
  }

  // Extract data from both the fragment and query string. The fragment is most
  // important, but the query string is also used because some OAuth 2.0
  // implementations (Instagram) have a bug where state is passed via query.
  var data = Object.assign(
    {},
    typeof url.search === 'string' ? querystring.parse(url.search.substr(1)) : (url.search || {}),
    typeof url.hash === 'string' ? querystring.parse(url.hash.substr(1)) : (url.hash || {})
  );

  var err = getAuthError(data);

  // Check if the query string was populated with a known error.
  if (err) {
    return Promise.reject(err)
  }

  // Check whether the state matches.
  if (options.state != null && data.state !== options.state) {
    return Promise.reject(new TypeError('Invalid state: ' + data.state))
  }

  // Initalize a new token and return.
  return Promise.resolve(this.client.createToken(data))
};

/**
 * Support client credentials OAuth 2.0 grant.
 *
 * Reference: http://tools.ietf.org/html/rfc6749#section-4.4
 *
 * @param {ClientOAuth2} client
 */
function CredentialsFlow (client) {
  this.client = client;
}

/**
 * Request an access token using the client credentials.
 *
 * @param  {Object}  [opts]
 * @return {Promise}
 */
CredentialsFlow.prototype.getToken = function (opts) {
  var self = this;
  var options = Object.assign({}, this.client.options, opts);

  expects(options, 'clientId', 'clientSecret', 'accessTokenUri');

  const body = {
    grant_type: 'client_credentials'
  };

  if (options.scopes !== undefined) {
    body.scope = sanitizeScope(options.scopes);
  }

  return this.client._request(requestOptions({
    url: options.accessTokenUri,
    method: 'POST',
    headers: Object.assign({}, DEFAULT_HEADERS, {
      Authorization: auth(options.clientId, options.clientSecret)
    }),
    body: body
  }, options))
    .then(function (data) {
      return self.client.createToken(data)
    })
};

/**
 * Support authorization code OAuth 2.0 grant.
 *
 * Reference: http://tools.ietf.org/html/rfc6749#section-4.1
 *
 * @param {ClientOAuth2} client
 */
function CodeFlow (client) {
  this.client = client;
}

/**
 * Generate the uri for doing the first redirect.
 *
 * @param  {Object} [opts]
 * @return {string}
 */
CodeFlow.prototype.getUri = function (opts) {
  var options = Object.assign({}, this.client.options, opts);

  return createUri(options, 'code')
};

/**
 * Get the code token from the redirected uri and make another request for
 * the user access token.
 *
 * @param  {string|Object} uri
 * @param  {Object}        [opts]
 * @return {Promise}
 */
CodeFlow.prototype.getToken = function (uri, opts) {
  var self = this;
  var options = Object.assign({}, this.client.options, opts);

  expects(options, 'clientId', 'accessTokenUri');

  var url = typeof uri === 'object' ? uri : new URL(uri, DEFAULT_URL_BASE);

  if (
    typeof options.redirectUri === 'string' &&
    typeof url.pathname === 'string' &&
    url.pathname !== (new URL(options.redirectUri, DEFAULT_URL_BASE)).pathname
  ) {
    return Promise.reject(
      new TypeError('Redirected path should match configured path, but got: ' + url.pathname)
    )
  }

  if (!url.search || !url.search.substr(1)) {
    return Promise.reject(new TypeError('Unable to process uri: ' + uri))
  }

  var data = typeof url.search === 'string'
    ? querystring.parse(url.search.substr(1))
    : (url.search || {});
  var err = getAuthError(data);

  if (err) {
    return Promise.reject(err)
  }

  if (options.state != null && data.state !== options.state) {
    return Promise.reject(new TypeError('Invalid state: ' + data.state))
  }

  // Check whether the response code is set.
  if (!data.code) {
    return Promise.reject(new TypeError('Missing code, unable to request token'))
  }

  var headers = Object.assign({}, DEFAULT_HEADERS);
  var body = { code: data.code, grant_type: 'authorization_code', redirect_uri: options.redirectUri };

  // `client_id`: REQUIRED, if the client is not authenticating with the
  // authorization server as described in Section 3.2.1.
  // Reference: https://tools.ietf.org/html/rfc6749#section-3.2.1
  if (options.clientSecret) {
    headers.Authorization = auth(options.clientId, options.clientSecret);
  } else {
    body.client_id = options.clientId;
  }

  return this.client._request(requestOptions({
    url: options.accessTokenUri,
    method: 'POST',
    headers: headers,
    body: body
  }, options))
    .then(function (data) {
      return self.client.createToken(data)
    })
};

/**
 * Support JSON Web Token (JWT) Bearer Token OAuth 2.0 grant.
 *
 * Reference: https://tools.ietf.org/html/draft-ietf-oauth-jwt-bearer-12#section-2.1
 *
 * @param {ClientOAuth2} client
 */
function JwtBearerFlow (client) {
  this.client = client;
}

/**
 * Request an access token using a JWT token.
 *
 * @param  {string} token     A JWT token.
 * @param  {Object} [opts]
 * @return {Promise}
 */
JwtBearerFlow.prototype.getToken = function (token, opts) {
  var self = this;
  var options = Object.assign({}, this.client.options, opts);
  var headers = Object.assign({}, DEFAULT_HEADERS);

  expects(options, 'accessTokenUri');

  // Authentication of the client is optional, as described in
  // Section 3.2.1 of OAuth 2.0 [RFC6749]
  if (options.clientId) {
    headers.Authorization = auth(options.clientId, options.clientSecret);
  }

  const body = {
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: token
  };

  if (options.scopes !== undefined) {
    body.scope = sanitizeScope(options.scopes);
  }

  return this.client._request(requestOptions({
    url: options.accessTokenUri,
    method: 'POST',
    headers: headers,
    body: body
  }, options))
    .then(function (data) {
      return self.client.createToken(data)
    })
};

const createAuth=credentials=>new clientOauth2(credentials);

const authorizationCode=async(auth,uri,code)=>{if(code)return await auth.code.getToken(code);if(!window)throw new Error("Authorization code works only in a Web context");return window.open(uri),null};

const authenticate=async({type,config,scope,code,refreshToken})=>{const auth=createAuth(config);let authRes=null;const opts={scopes:scope};if(type==="clientCredentials"&&(authRes=await auth.credentials.getToken(opts)),type==="refreshToken"&&refreshToken&&(authRes=await auth.createToken("",refreshToken,"refresh_token",{}).refresh()),type==="owner"&&(authRes=await auth.owner.getToken(config.username,config.password,opts)),type==="authorizationCode"){const uri=auth.code.getUri();authRes=await authorizationCode(auth,uri,code);}return authRes};

const salesChannel=async({clientId,endpoint,scope},user)=>{if(!scope)throw new Error("scope param is required.");const config={clientId,clientSecret:"",accessTokenUri:`${endpoint}/oauth/token`,redirectUri:void 0,username:user==null?void 0:user.username,password:user==null?void 0:user.password};return user?authenticate({type:"owner",config,scope}):authenticate({type:"clientCredentials",config,scope})};

const getSalesChannelToken=salesChannel;

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

// eslint-disable-next-line func-names
var kindOf = (function(cache) {
  // eslint-disable-next-line func-names
  return function(thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
})(Object.create(null));

function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
var isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (kindOf(val) !== 'object') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
var isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
var isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} thing The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(thing) {
  var pattern = '[object FormData]';
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) ||
    toString.call(thing) === pattern ||
    (isFunction(thing.toString) && thing.toString() === pattern)
  );
}

/**
 * Determine if a value is a URLSearchParams object
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
var isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 */

function inherits(constructor, superConstructor, props, descriptors) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function} [filter]
 * @returns {Object}
 */

function toFlatObject(sourceObj, destObj, filter) {
  var props;
  var i;
  var prop;
  var merged = {};

  destObj = destObj || {};

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}

/*
 * determines whether a string ends with the characters of a specified string
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 * @returns {boolean}
 */
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}


/**
 * Returns new array from array like object
 * @param {*} [thing]
 * @returns {Array}
 */
function toArray(thing) {
  if (!thing) return null;
  var i = thing.length;
  if (isUndefined(i)) return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}

// eslint-disable-next-line func-names
var isTypedArray = (function(TypedArray) {
  // eslint-disable-next-line func-names
  return function(thing) {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array));

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM,
  inherits: inherits,
  toFlatObject: toFlatObject,
  kindOf: kindOf,
  kindOfTest: kindOfTest,
  endsWith: endsWith,
  toArray: toArray,
  isTypedArray: isTypedArray,
  isFileList: isFileList
};

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);
  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

var prototype = AxiosError.prototype;
var descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED'
// eslint-disable-next-line func-names
].forEach(function(code) {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = function(error, code, config, request, response, customProps) {
  var axiosError = Object.create(prototype);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

var AxiosError_1 = AxiosError;

var transitional = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

/**
 * Convert a data object to FormData
 * @param {Object} obj
 * @param {?Object} [formData]
 * @returns {Object}
 **/

function toFormData(obj, formData) {
  // eslint-disable-next-line no-param-reassign
  formData = formData || new FormData();

  var stack = [];

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  function build(data, parentKey) {
    if (utils.isPlainObject(data) || utils.isArray(data)) {
      if (stack.indexOf(data) !== -1) {
        throw Error('Circular reference detected in ' + parentKey);
      }

      stack.push(data);

      utils.forEach(data, function each(value, key) {
        if (utils.isUndefined(value)) return;
        var fullKey = parentKey ? parentKey + '.' + key : key;
        var arr;

        if (value && !parentKey && typeof value === 'object') {
          if (utils.endsWith(key, '{}')) {
            // eslint-disable-next-line no-param-reassign
            value = JSON.stringify(value);
          } else if (utils.endsWith(key, '[]') && (arr = utils.toArray(value))) {
            // eslint-disable-next-line func-names
            arr.forEach(function(el) {
              !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }

        build(value, fullKey);
      });

      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data));
    }
  }

  build(obj);

  return formData;
}

var toFormData_1 = toFormData;

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError_1(
      'Request failed with status code ' + response.status,
      [AxiosError_1.ERR_BAD_REQUEST, AxiosError_1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
};

var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function CanceledError(message) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError_1.call(this, message == null ? 'canceled' : message, AxiosError_1.ERR_CANCELED);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, AxiosError_1, {
  __CANCEL__: true
});

var CanceledError_1 = CanceledError;

var parseProtocol = function parseProtocol(url) {
  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
};

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError_1('Request aborted', AxiosError_1.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError_1('Network Error', AxiosError_1.ERR_NETWORK, config, request, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional$1 = config.transitional || transitional;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError_1(
        timeoutErrorMessage,
        transitional$1.clarifyTimeoutError ? AxiosError_1.ETIMEDOUT : AxiosError_1.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new CanceledError_1() : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    var protocol = parseProtocol(fullPath);

    if (protocol && [ 'http', 'https', 'file' ].indexOf(protocol) === -1) {
      reject(new AxiosError_1('Unsupported protocol ' + protocol + ':', AxiosError_1.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData);
  });
};

// eslint-disable-next-line strict
var _null = null;

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = xhr;
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: transitional,

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    var isObjectPayload = utils.isObject(data);
    var contentType = headers && headers['Content-Type'];

    var isFileList;

    if ((isFileList = utils.isFileList(data)) || (isObjectPayload && contentType === 'multipart/form-data')) {
      var _FormData = this.env && this.env.FormData;
      return toFormData_1(isFileList ? {'files[]': data} : data, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === 'application/json') {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError_1.from(e, AxiosError_1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: _null
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  var context = this || defaults_1;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError_1();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
var mergeConfig = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'beforeRedirect': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};

var data = {
  "version": "0.27.2"
};

var VERSION = data.version;


var validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new AxiosError_1(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError_1.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError_1('options must be an object', AxiosError_1.ERR_BAD_OPTION_VALUE);
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError_1('option ' + opt + ' must be ' + result, AxiosError_1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError_1('Unknown option ' + opt, AxiosError_1.ERR_BAD_OPTION);
    }
  }
}

var validator = {
  assertOptions: assertOptions,
  validators: validators$1
};

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  var fullPath = buildFullPath(config.baseURL, config.url);
  return buildURL(fullPath, config.params, config.paramsSerializer);
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url: url,
        data: data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

var Axios_1 = Axios;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new CanceledError_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
var isAxiosError = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios$1 = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios$1.Axios = Axios_1;

// Expose Cancel & CancelToken
axios$1.CanceledError = CanceledError_1;
axios$1.CancelToken = CancelToken_1;
axios$1.isCancel = isCancel;
axios$1.VERSION = data.version;
axios$1.toFormData = toFormData_1;

// Expose AxiosError class
axios$1.AxiosError = AxiosError_1;

// alias for CanceledError for backward compatibility
axios$1.Cancel = axios$1.CanceledError;

// Expose all/spread
axios$1.all = function all(promises) {
  return Promise.all(promises);
};
axios$1.spread = spread;

// Expose isAxiosError
axios$1.isAxiosError = isAxiosError;

var axios_1 = axios$1;

// Allow use of default import syntax in TypeScript
var _default = axios$1;
axios_1.default = _default;

var axios = axios_1;

var e$7;(function(E){E.CLIENT="client",E.REQUEST="request",E.RESPONSE="response",E.GENERIC="generic",E.CANCEL="cancel";})(e$7||(e$7={}));class s$G extends Error{constructor(r){super(r.message),this.name=s$G.NAME,this.type=r.type||e$7.GENERIC;}static isSdkError(r){return r&&[s$G.NAME,t$v.NAME].includes(r.name)&&Object.values(e$7).includes(r.type)}}s$G.NAME="SdkError";class t$v extends s$G{constructor(r){super(Object.assign(Object.assign({},r),{type:e$7.RESPONSE})),this.errors=[],this.name=t$v.NAME;}static isApiError(r){return s$G.isSdkError(r)&&r.name===t$v.NAME&&r.type===e$7.RESPONSE}first(){var r;return ((r=this.errors)===null||r===void 0?void 0:r.length)>0?this.errors[0]:void 0}}t$v.NAME="ApiError";

const e$6={default:{domain:"commercelayer.io",pageNumber:1,pageSize:10},client:{timeout:15e3}};

const e$5=(t,...r)=>{};let c$6=t=>e$5;try{const t=require("debug");t&&typeof t=="function"&&(c$6=t);}catch{}const o$6="clsdk",n$2=t=>c$6(`${o$6}:${t}`);

var isBufferBrowser = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
};

var inherits_browser = createCommonjsModule(function (module) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}
});

var util = createCommonjsModule(function (module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var length = output.reduce(function(prev, cur) {
    if (cur.indexOf('\n') >= 0) ;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = isBufferBrowser;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = inherits_browser;

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
};

exports.promisify.custom = kCustomPromisifiedSymbol;

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb, null, ret); },
            function(rej) { process.nextTick(callbackifyOnRejected, rej, cb); });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;
});

var d$2=undefined&&undefined.__classPrivateFieldSet||function(r,e,t,s,a){if(s==="m")throw new TypeError("Private method is not writable");if(s==="a"&&!a)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?r!==e||!a:!e.has(r))throw new TypeError("Cannot write private member to an object whose class did not declare it");return s==="a"?a.call(r,t):a?a.value=t:e.set(r,t),t},n$1=undefined&&undefined.__classPrivateFieldGet||function(r,e,t,s){if(t==="a"&&!s)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?r!==e||!s:!e.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?s:t==="a"?s.call(r):s?s.value:e.get(r)},o$5,i$1;const c$5=n$2("client"),m=(r,e)=>`https://${r.toLowerCase()}.${e||e$6.default.domain}/api`,x=r=>{let e=new s$G({message:r.message});if(axios.isAxiosError(r))if(r.response){const t=new t$v(e);t.type=e$7.RESPONSE,t.status=r.response.status,t.code=String(t.status),t.errors=r.response.data.errors,e=t;}else r.request?(e.type=e$7.REQUEST,e.request=r.request):e.type=e$7.CLIENT;else axios.isCancel(r)?e.type=e$7.CANCEL:e.source=r;throw e};class l{constructor(e){o$5.set(this,void 0),i$1.set(this,void 0),c$5("new client instance %O",e),this.baseUrl=m(e.organization,e.domain),d$2(this,o$5,e.accessToken,"f");const t={timeout:e.timeout||e$6.client.timeout,proxy:e.proxy,httpAgent:e.httpAgent,httpsAgent:e.httpsAgent},s=Object.assign({baseURL:this.baseUrl,timeout:e$6.client.timeout,headers:{Accept:"application/vnd.api+json","Content-Type":"application/vnd.api+json",Authorization:"Bearer "+n$1(this,o$5,"f")}},t);c$5("axios options: %O",s),d$2(this,i$1,axios.create(s),"f"),this.interceptors=n$1(this,i$1,"f").interceptors;}static create(e){if(!e?.organization)throw new Error("Undefined 'organization' parameter");if(!e?.accessToken)throw new Error("Undefined 'accessToken' parameter");return new l(e)}config(e){c$5("config %o",e);const t=n$1(this,i$1,"f").defaults;e.timeout&&(t.timeout=e.timeout),e.proxy&&(t.proxy=e.proxy),e.httpAgent&&(t.httpAgent=e.httpAgent),e.httpsAgent&&(t.httpsAgent=e.httpsAgent),e.organization&&(this.baseUrl=m(e.organization,e.domain)),e.accessToken&&(d$2(this,o$5,e.accessToken,"f"),t.headers.common.Authorization="Bearer "+n$1(this,o$5,"f"));}async request(e,t,s,a){c$5("request %s %s, %O, %O",e,t,s||{},a||{});const y=s?{data:s}:void 0,v=t,A=a?.organization?m(a.organization,a.domain):void 0,w=a?.accessToken||n$1(this,o$5,"f"),E=w?{Authorization:"Bearer "+w}:void 0,g=Object.assign({method:e,baseURL:A,url:v,data:y,headers:E},a);return c$5("request params: %s",util.inspect(g,!1,null,!0)),n$1(this,i$1,"f").request(g).then(h=>h.data).catch(h=>x(h))}}o$5=new WeakMap,i$1=new WeakMap;

const p$2=s=>s&&s.type&&s.id&&resourceList.includes(s.type),t$u=s=>s&&typeof s.type<"u"&&s.type&&resourceList.includes(s.type);

const a$1=n$2("jsonapi"),p$1=e=>{let s;e.links&&delete e.links;const i=e.data,n=e.included;return i?Array.isArray(i)?s=i.map(t=>r$j(t,n)):s=r$j(i,n):s=i,s},d$1=(e,s=[])=>s.find(i=>e.id===i.id&&e.type===i.type)||e,r$j=(e,s)=>{if(a$1("denormalize resource: %O, %o",e,s||{}),!e)return e;const i=Object.assign({id:e.id,type:e.type},e.attributes);return e.relationships&&Object.keys(e.relationships).forEach(n=>{const t=e.relationships[n].data;t?Array.isArray(t)?i[n]=t.map(o=>r$j(d$1(o,s),s)):i[n]=r$j(d$1(t,s),s):t===null&&(i[n]=null);}),a$1("denormalized resource: %O",i),i},y$1=e=>{a$1("normalize resource: %O",e);const s={},i={};for(const t in e){if(["type","id"].includes(t))continue;const o=e[t];o&&t$u(o)&&o.id===null?i[t]={data:null}:o&&(p$2(o)||Array.isArray(o)&&p$2(o[0]))?i[t]={data:o}:s[t]=o;}const n={type:e.type,attributes:s,relationships:i};return p$2(e)&&(n.id=e.id),a$1("normalized resource: %O",n),n};

const a=n$2("query"),o$4=e=>e.filters||e.pageNumber||e.pageSize||e.sort,g=(e,r)=>{a("generate query string params: %O, %O",e,r);const i={};return e&&(e.include&&(i.include=e.include.join(",")),e.fields&&(Array.isArray(e.fields)&&(e.fields={[r.type||r]:e.fields}),Object.entries(e.fields).forEach(([s,t])=>{i[`fields[${s}]`]=t.join(",");})),o$4(e)&&(e.sort&&(Array.isArray(e.sort)?i.sort=e.sort.join(","):i.sort=Object.entries(e.sort).map(([s,t])=>`${t==="desc"?"-":""}${s}`).join(",")),e.pageNumber&&(i["page[number]"]=String(e.pageNumber)),e.pageSize&&(i["page[size]"]=String(e.pageSize)),e.filters&&Object.entries(e.filters).forEach(([s,t])=>{i[`filter[q][${s}]`]=String(t);})),a("query string params: %O",i)),i};

var y=undefined&&undefined.__classPrivateFieldSet||function(i,e,a,t,s){if(t==="m")throw new TypeError("Private method is not writable");if(t==="a"&&!s)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?i!==e||!s:!e.has(i))throw new TypeError("Cannot write private member to an object whose class did not declare it");return t==="a"?s.call(i,a):s?s.value=a:e.set(i,a),a},c$4=undefined&&undefined.__classPrivateFieldGet||function(i,e,a,t){if(a==="a"&&!t)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?i!==e||!t:!e.has(i))throw new TypeError("Cannot read private member from an object whose class did not declare it");return a==="m"?t:a==="a"?t.call(i):t?t.value:e.get(i)},o$3,b;const u$1=n$2("resource");class O extends Array{constructor(e,a){super(...a||[]),this.meta=e;}first(){return this.length?this[0]:void 0}last(){return this.length?this[this.length-1]:void 0}get(e){return this.length&&e>=0?this[e]:void 0}}class C{constructor(e){o$3.set(this,void 0),b.set(this,{}),y(this,o$3,l.create(e),"f"),this.localConfig(e);}get interceptors(){return c$4(this,o$3,"f").interceptors}localConfig(e){}config(e){u$1("config %o",e),this.localConfig(e),c$4(this,o$3,"f").config(e);}async singleton(e,a,t){u$1("singleton: %o, %O, %O",e,a||{},t||{});const s=g(a,e);t?.params&&Object.assign(s,t?.params);const r=await c$4(this,o$3,"f").request("get",`${e.type}`,void 0,Object.assign(Object.assign({},t),{params:s}));return p$1(r)}async retrieve(e,a,t){u$1("retrieve: %o, %O, %O",e,a||{},t||{});const s=g(a,e);t?.params&&Object.assign(s,t?.params);const r=await c$4(this,o$3,"f").request("get",`${e.type}/${e.id}`,void 0,Object.assign(Object.assign({},t),{params:s}));return p$1(r)}async list(e,a,t){var s,r;u$1("list: %o, %O, %O",e,a||{},t||{});const n=g(a,e);t?.params&&Object.assign(n,t?.params);const p=await c$4(this,o$3,"f").request("get",`${e.type}`,void 0,Object.assign(Object.assign({},t),{params:n})),l=p$1(p),m={pageCount:Number((s=p.meta)===null||s===void 0?void 0:s.page_count),recordCount:Number((r=p.meta)===null||r===void 0?void 0:r.record_count),currentPage:a?.pageNumber||e$6.default.pageNumber,recordsPerPage:a?.pageSize||e$6.default.pageSize};return new O(m,l)}async create(e,a,t){u$1("create: %o, %O, %O",e,a||{},t||{});const s=g(a,e);t?.params&&Object.assign(s,t?.params);const r=y$1(e),n=await c$4(this,o$3,"f").request("post",e.type,r,Object.assign(Object.assign({},t),{params:s}));return p$1(n)}async update(e,a,t){u$1("update: %o, %O, %O",e,a||{},t||{});const s=g(a,e);t?.params&&Object.assign(s,t?.params);const r=y$1(e),n=await c$4(this,o$3,"f").request("patch",`${e.type}/${e.id}`,r,Object.assign(Object.assign({},t),{params:s}));return p$1(n)}async delete(e,a){u$1("delete: %o, %O",e,a||{}),await c$4(this,o$3,"f").request("delete",`${e.type}/${e.id}`,void 0,a);}async fetch(e,a,t,s){var r,n;u$1("fetch: %o, %O, %O",a,t||{},s||{});const p=g(t,e);s?.params&&Object.assign(p,s?.params);const l=await c$4(this,o$3,"f").request("get",a,void 0,Object.assign(Object.assign({},s),{params:p})),m=p$1(l);if(Array.isArray(m)){const f=t,w={pageCount:Number((r=l.meta)===null||r===void 0?void 0:r.page_count),recordCount:Number((n=l.meta)===null||n===void 0?void 0:n.record_count),currentPage:f?.pageNumber||e$6.default.pageNumber,recordsPerPage:f?.pageSize||e$6.default.pageSize};return new O(w,m)}else return m}}o$3=new WeakMap,b=new WeakMap;class _$1{constructor(e){u$1("new resource instance: %s",this.type()),this.resources=e;}}

class t$t extends _$1{async list(e,r){return this.resources.list({type:t$t.TYPE},e,r)}async create(e,r,s){return this.resources.create(Object.assign(Object.assign({},e),{type:t$t.TYPE}),r,s)}async retrieve(e,r,s){return this.resources.retrieve({type:t$t.TYPE,id:e},r,s)}async update(e,r,s){return this.resources.update(Object.assign(Object.assign({},e),{type:t$t.TYPE}),r,s)}async delete(e,r){await this.resources.delete({type:t$t.TYPE,id:e},r);}async geocoder(e,r,s){const i=e.id||e;return this.resources.fetch({type:"geocoders"},`addresses/${i}/geocoder`,r,s)}isAddress(e){return e.type&&e.type===t$t.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$t.TYPE}:{id:e.id,type:t$t.TYPE}}type(){return t$t.TYPE}}t$t.TYPE="addresses";

class s$F extends _$1{async list(e,t){return this.resources.list({type:s$F.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$F.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$F.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$F.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$F.TYPE,id:e},t);}isAdjustment(e){return e.type&&e.type===s$F.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$F.TYPE}:{id:e.id,type:s$F.TYPE}}type(){return s$F.TYPE}}s$F.TYPE="adjustments";

class s$E extends _$1{async list(e,t){return this.resources.list({type:s$E.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$E.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$E.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$E.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$E.TYPE,id:e},t);}async payment_methods(e,t,r){const a=e.id||e;return this.resources.fetch({type:"payment_methods"},`adyen_gateways/${a}/payment_methods`,t,r)}async adyen_payments(e,t,r){const a=e.id||e;return this.resources.fetch({type:"adyen_payments"},`adyen_gateways/${a}/adyen_payments`,t,r)}isAdyenGateway(e){return e.type&&e.type===s$E.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$E.TYPE}:{id:e.id,type:s$E.TYPE}}type(){return s$E.TYPE}}s$E.TYPE="adyen_gateways";

class r$i extends _$1{async list(e,t){return this.resources.list({type:r$i.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:r$i.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:r$i.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:r$i.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:r$i.TYPE,id:e},t);}async order(e,t,s){const a=e.id||e;return this.resources.fetch({type:"orders"},`adyen_payments/${a}/order`,t,s)}async payment_gateway(e,t,s){const a=e.id||e;return this.resources.fetch({type:"payment_gateways"},`adyen_payments/${a}/payment_gateway`,t,s)}isAdyenPayment(e){return e.type&&e.type===r$i.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r$i.TYPE}:{id:e.id,type:r$i.TYPE}}type(){return r$i.TYPE}}r$i.TYPE="adyen_payments";

class e$4 extends _$1{async retrieve(t,i){return this.resources.singleton({type:e$4.TYPE},t,i)}isApplication(t){return t.type&&t.type===e$4.TYPE}relationship(t){return t===null||typeof t=="string"?{id:t,type:e$4.TYPE}:{id:t.id,type:e$4.TYPE}}type(){return e$4.TYPE}}e$4.TYPE="application";

class t$s extends _$1{async list(e,s){return this.resources.list({type:t$s.TYPE},e,s)}async create(e,s,r){return this.resources.create(Object.assign(Object.assign({},e),{type:t$s.TYPE}),s,r)}async retrieve(e,s,r){return this.resources.retrieve({type:t$s.TYPE,id:e},s,r)}async update(e,s,r){return this.resources.update(Object.assign(Object.assign({},e),{type:t$s.TYPE}),s,r)}async delete(e,s){await this.resources.delete({type:t$s.TYPE,id:e},s);}isAttachment(e){return e.type&&e.type===t$s.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$s.TYPE}:{id:e.id,type:t$s.TYPE}}type(){return t$s.TYPE}}t$s.TYPE="attachments";

class t$r extends _$1{async list(e,r){return this.resources.list({type:t$r.TYPE},e,r)}async retrieve(e,r,s){return this.resources.retrieve({type:t$r.TYPE,id:e},r,s)}async update(e,r,s){return this.resources.update(Object.assign(Object.assign({},e),{type:t$r.TYPE}),r,s)}async order(e,r,s){const i=e.id||e;return this.resources.fetch({type:"orders"},`authorizations/${i}/order`,r,s)}async captures(e,r,s){const i=e.id||e;return this.resources.fetch({type:"captures"},`authorizations/${i}/captures`,r,s)}async voids(e,r,s){const i=e.id||e;return this.resources.fetch({type:"voids"},`authorizations/${i}/voids`,r,s)}isAuthorization(e){return e.type&&e.type===t$r.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$r.TYPE}:{id:e.id,type:t$r.TYPE}}type(){return t$r.TYPE}}t$r.TYPE="authorizations";

class s$D extends _$1{async list(e,t){return this.resources.list({type:s$D.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$D.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$D.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$D.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$D.TYPE,id:e},t);}async tax_categories(e,t,r){const a=e.id||e;return this.resources.fetch({type:"tax_categories"},`avalara_accounts/${a}/tax_categories`,t,r)}async markets(e,t,r){const a=e.id||e;return this.resources.fetch({type:"markets"},`avalara_accounts/${a}/markets`,t,r)}async attachments(e,t,r){const a=e.id||e;return this.resources.fetch({type:"attachments"},`avalara_accounts/${a}/attachments`,t,r)}isAvalaraAccount(e){return e.type&&e.type===s$D.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$D.TYPE}:{id:e.id,type:s$D.TYPE}}type(){return s$D.TYPE}}s$D.TYPE="avalara_accounts";

class t$q extends _$1{async list(e,s){return this.resources.list({type:t$q.TYPE},e,s)}async create(e,s,r){return this.resources.create(Object.assign(Object.assign({},e),{type:t$q.TYPE}),s,r)}async retrieve(e,s,r){return this.resources.retrieve({type:t$q.TYPE,id:e},s,r)}async update(e,s,r){return this.resources.update(Object.assign(Object.assign({},e),{type:t$q.TYPE}),s,r)}async delete(e,s){await this.resources.delete({type:t$q.TYPE,id:e},s);}async market(e,s,r){const i=e.id||e;return this.resources.fetch({type:"markets"},`billing_info_validation_rules/${i}/market`,s,r)}isBillingInfoValidationRule(e){return e.type&&e.type===t$q.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$q.TYPE}:{id:e.id,type:t$q.TYPE}}type(){return t$q.TYPE}}t$q.TYPE="billing_info_validation_rules";

class s$C extends _$1{async list(e,t){return this.resources.list({type:s$C.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$C.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$C.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$C.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$C.TYPE,id:e},t);}async addresses(e,t,r){const n=e.id||e;return this.resources.fetch({type:"addresses"},`bing_geocoders/${n}/addresses`,t,r)}async attachments(e,t,r){const n=e.id||e;return this.resources.fetch({type:"attachments"},`bing_geocoders/${n}/attachments`,t,r)}isBingGeocoder(e){return e.type&&e.type===s$C.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$C.TYPE}:{id:e.id,type:s$C.TYPE}}type(){return s$C.TYPE}}s$C.TYPE="bing_geocoders";

class s$B extends _$1{async list(e,t){return this.resources.list({type:s$B.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$B.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$B.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$B.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$B.TYPE,id:e},t);}async payment_methods(e,t,r){const a=e.id||e;return this.resources.fetch({type:"payment_methods"},`braintree_gateways/${a}/payment_methods`,t,r)}async braintree_payments(e,t,r){const a=e.id||e;return this.resources.fetch({type:"braintree_payments"},`braintree_gateways/${a}/braintree_payments`,t,r)}isBraintreeGateway(e){return e.type&&e.type===s$B.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$B.TYPE}:{id:e.id,type:s$B.TYPE}}type(){return s$B.TYPE}}s$B.TYPE="braintree_gateways";

class s$A extends _$1{async list(e,t){return this.resources.list({type:s$A.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$A.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$A.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$A.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$A.TYPE,id:e},t);}async order(e,t,r){const a=e.id||e;return this.resources.fetch({type:"orders"},`braintree_payments/${a}/order`,t,r)}async payment_gateway(e,t,r){const a=e.id||e;return this.resources.fetch({type:"payment_gateways"},`braintree_payments/${a}/payment_gateway`,t,r)}isBraintreePayment(e){return e.type&&e.type===s$A.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$A.TYPE}:{id:e.id,type:s$A.TYPE}}type(){return s$A.TYPE}}s$A.TYPE="braintree_payments";

class r$h extends _$1{async list(e,s){return this.resources.list({type:r$h.TYPE},e,s)}async create(e,s,t){return this.resources.create(Object.assign(Object.assign({},e),{type:r$h.TYPE}),s,t)}async retrieve(e,s,t){return this.resources.retrieve({type:r$h.TYPE,id:e},s,t)}async update(e,s,t){return this.resources.update(Object.assign(Object.assign({},e),{type:r$h.TYPE}),s,t)}async delete(e,s){await this.resources.delete({type:r$h.TYPE,id:e},s);}async market(e,s,t){const n=e.id||e;return this.resources.fetch({type:"markets"},`bundles/${n}/market`,s,t)}async sku_list(e,s,t){const n=e.id||e;return this.resources.fetch({type:"sku_lists"},`bundles/${n}/sku_list`,s,t)}async skus(e,s,t){const n=e.id||e;return this.resources.fetch({type:"skus"},`bundles/${n}/skus`,s,t)}async attachments(e,s,t){const n=e.id||e;return this.resources.fetch({type:"attachments"},`bundles/${n}/attachments`,s,t)}isBundle(e){return e.type&&e.type===r$h.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r$h.TYPE}:{id:e.id,type:r$h.TYPE}}type(){return r$h.TYPE}}r$h.TYPE="bundles";

class t$p extends _$1{async list(e,r){return this.resources.list({type:t$p.TYPE},e,r)}async retrieve(e,r,s){return this.resources.retrieve({type:t$p.TYPE,id:e},r,s)}async update(e,r,s){return this.resources.update(Object.assign(Object.assign({},e),{type:t$p.TYPE}),r,s)}async order(e,r,s){const n=e.id||e;return this.resources.fetch({type:"orders"},`captures/${n}/order`,r,s)}async reference_authorization(e,r,s){const n=e.id||e;return this.resources.fetch({type:"authorizations"},`captures/${n}/reference_authorization`,r,s)}async refunds(e,r,s){const n=e.id||e;return this.resources.fetch({type:"refunds"},`captures/${n}/refunds`,r,s)}isCapture(e){return e.type&&e.type===t$p.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$p.TYPE}:{id:e.id,type:t$p.TYPE}}type(){return t$p.TYPE}}t$p.TYPE="captures";

class e$3 extends _$1{async list(t,r){return this.resources.list({type:e$3.TYPE},t,r)}async retrieve(t,r,s){return this.resources.retrieve({type:e$3.TYPE,id:t},r,s)}async market(t,r,s){const c=t.id||t;return this.resources.fetch({type:"markets"},`carrier_accounts/${c}/market`,r,s)}async attachments(t,r,s){const c=t.id||t;return this.resources.fetch({type:"attachments"},`carrier_accounts/${c}/attachments`,r,s)}isCarrierAccount(t){return t.type&&t.type===e$3.TYPE}relationship(t){return t===null||typeof t=="string"?{id:t,type:e$3.TYPE}:{id:t.id,type:e$3.TYPE}}type(){return e$3.TYPE}}e$3.TYPE="carrier_accounts";

class s$z extends _$1{async list(e,t){return this.resources.list({type:s$z.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$z.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$z.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$z.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$z.TYPE,id:e},t);}async payment_methods(e,t,r){const c=e.id||e;return this.resources.fetch({type:"payment_methods"},`checkout_com_gateways/${c}/payment_methods`,t,r)}async checkout_com_payments(e,t,r){const c=e.id||e;return this.resources.fetch({type:"checkout_com_payments"},`checkout_com_gateways/${c}/checkout_com_payments`,t,r)}isCheckoutComGateway(e){return e.type&&e.type===s$z.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$z.TYPE}:{id:e.id,type:s$z.TYPE}}type(){return s$z.TYPE}}s$z.TYPE="checkout_com_gateways";

class r$g extends _$1{async list(e,t){return this.resources.list({type:r$g.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:r$g.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:r$g.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:r$g.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:r$g.TYPE,id:e},t);}async order(e,t,s){const c=e.id||e;return this.resources.fetch({type:"orders"},`checkout_com_payments/${c}/order`,t,s)}async payment_gateway(e,t,s){const c=e.id||e;return this.resources.fetch({type:"payment_gateways"},`checkout_com_payments/${c}/payment_gateway`,t,s)}isCheckoutComPayment(e){return e.type&&e.type===r$g.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r$g.TYPE}:{id:e.id,type:r$g.TYPE}}type(){return r$g.TYPE}}r$g.TYPE="checkout_com_payments";

class t$o extends _$1{async list(e,r){return this.resources.list({type:t$o.TYPE},e,r)}async create(e,r,s){return this.resources.create(Object.assign(Object.assign({},e),{type:t$o.TYPE}),r,s)}async retrieve(e,r,s){return this.resources.retrieve({type:t$o.TYPE,id:e},r,s)}async update(e,r,s){return this.resources.update(Object.assign(Object.assign({},e),{type:t$o.TYPE}),r,s)}async delete(e,r){await this.resources.delete({type:t$o.TYPE,id:e},r);}async coupons(e,r,s){const o=e.id||e;return this.resources.fetch({type:"coupons"},`coupon_codes_promotion_rules/${o}/coupons`,r,s)}isCouponCodesPromotionRule(e){return e.type&&e.type===t$o.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$o.TYPE}:{id:e.id,type:t$o.TYPE}}type(){return t$o.TYPE}}t$o.TYPE="coupon_codes_promotion_rules";

class r$f extends _$1{async list(e,t){return this.resources.list({type:r$f.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:r$f.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:r$f.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:r$f.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:r$f.TYPE,id:e},t);}async customer(e,t,s){const c=e.id||e;return this.resources.fetch({type:"customers"},`coupon_recipients/${c}/customer`,t,s)}async attachments(e,t,s){const c=e.id||e;return this.resources.fetch({type:"attachments"},`coupon_recipients/${c}/attachments`,t,s)}isCouponRecipient(e){return e.type&&e.type===r$f.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r$f.TYPE}:{id:e.id,type:r$f.TYPE}}type(){return r$f.TYPE}}r$f.TYPE="coupon_recipients";

class t$n extends _$1{async list(e,r){return this.resources.list({type:t$n.TYPE},e,r)}async create(e,r,s){return this.resources.create(Object.assign(Object.assign({},e),{type:t$n.TYPE}),r,s)}async retrieve(e,r,s){return this.resources.retrieve({type:t$n.TYPE,id:e},r,s)}async update(e,r,s){return this.resources.update(Object.assign(Object.assign({},e),{type:t$n.TYPE}),r,s)}async delete(e,r){await this.resources.delete({type:t$n.TYPE,id:e},r);}async promotion_rule(e,r,s){const o=e.id||e;return this.resources.fetch({type:"coupon_codes_promotion_rules"},`coupons/${o}/promotion_rule`,r,s)}isCoupon(e){return e.type&&e.type===t$n.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$n.TYPE}:{id:e.id,type:t$n.TYPE}}type(){return t$n.TYPE}}t$n.TYPE="coupons";

class r$e extends _$1{async list(e,s){return this.resources.list({type:r$e.TYPE},e,s)}async create(e,s,t){return this.resources.create(Object.assign(Object.assign({},e),{type:r$e.TYPE}),s,t)}async retrieve(e,s,t){return this.resources.retrieve({type:r$e.TYPE,id:e},s,t)}async update(e,s,t){return this.resources.update(Object.assign(Object.assign({},e),{type:r$e.TYPE}),s,t)}async delete(e,s){await this.resources.delete({type:r$e.TYPE,id:e},s);}async customer(e,s,t){const c=e.id||e;return this.resources.fetch({type:"customers"},`customer_addresses/${c}/customer`,s,t)}async address(e,s,t){const c=e.id||e;return this.resources.fetch({type:"addresses"},`customer_addresses/${c}/address`,s,t)}async events(e,s,t){const c=e.id||e;return this.resources.fetch({type:"events"},`customer_addresses/${c}/events`,s,t)}isCustomerAddress(e){return e.type&&e.type===r$e.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r$e.TYPE}:{id:e.id,type:r$e.TYPE}}type(){return r$e.TYPE}}r$e.TYPE="customer_addresses";

class s$y extends _$1{async list(e,t){return this.resources.list({type:s$y.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$y.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$y.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$y.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$y.TYPE,id:e},t);}async customers(e,t,r){const c=e.id||e;return this.resources.fetch({type:"customers"},`customer_groups/${c}/customers`,t,r)}async markets(e,t,r){const c=e.id||e;return this.resources.fetch({type:"markets"},`customer_groups/${c}/markets`,t,r)}async attachments(e,t,r){const c=e.id||e;return this.resources.fetch({type:"attachments"},`customer_groups/${c}/attachments`,t,r)}isCustomerGroup(e){return e.type&&e.type===s$y.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$y.TYPE}:{id:e.id,type:s$y.TYPE}}type(){return s$y.TYPE}}s$y.TYPE="customer_groups";

class t$m extends _$1{async list(e,s){return this.resources.list({type:t$m.TYPE},e,s)}async create(e,s,r){return this.resources.create(Object.assign(Object.assign({},e),{type:t$m.TYPE}),s,r)}async retrieve(e,s,r){return this.resources.retrieve({type:t$m.TYPE,id:e},s,r)}async update(e,s,r){return this.resources.update(Object.assign(Object.assign({},e),{type:t$m.TYPE}),s,r)}async delete(e,s){await this.resources.delete({type:t$m.TYPE,id:e},s);}async customer(e,s,r){const c=e.id||e;return this.resources.fetch({type:"customers"},`customer_password_resets/${c}/customer`,s,r)}async events(e,s,r){const c=e.id||e;return this.resources.fetch({type:"events"},`customer_password_resets/${c}/events`,s,r)}isCustomerPasswordReset(e){return e.type&&e.type===t$m.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$m.TYPE}:{id:e.id,type:t$m.TYPE}}type(){return t$m.TYPE}}t$m.TYPE="customer_password_resets";

class t$l extends _$1{async list(e,r){return this.resources.list({type:t$l.TYPE},e,r)}async create(e,r,s){return this.resources.create(Object.assign(Object.assign({},e),{type:t$l.TYPE}),r,s)}async retrieve(e,r,s){return this.resources.retrieve({type:t$l.TYPE,id:e},r,s)}async update(e,r,s){return this.resources.update(Object.assign(Object.assign({},e),{type:t$l.TYPE}),r,s)}async delete(e,r){await this.resources.delete({type:t$l.TYPE,id:e},r);}async customer(e,r,s){const c=e.id||e;return this.resources.fetch({type:"customers"},`customer_payment_sources/${c}/customer`,r,s)}isCustomerPaymentSource(e){return e.type&&e.type===t$l.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$l.TYPE}:{id:e.id,type:t$l.TYPE}}type(){return t$l.TYPE}}t$l.TYPE="customer_payment_sources";

class s$x extends _$1{async list(e,t){return this.resources.list({type:s$x.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$x.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$x.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$x.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$x.TYPE,id:e},t);}async customer(e,t,r){const c=e.id||e;return this.resources.fetch({type:"customers"},`customer_subscriptions/${c}/customer`,t,r)}async events(e,t,r){const c=e.id||e;return this.resources.fetch({type:"events"},`customer_subscriptions/${c}/events`,t,r)}isCustomerSubscription(e){return e.type&&e.type===s$x.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$x.TYPE}:{id:e.id,type:s$x.TYPE}}type(){return s$x.TYPE}}s$x.TYPE="customer_subscriptions";

class c$3 extends _$1{async list(e,s){return this.resources.list({type:c$3.TYPE},e,s)}async create(e,s,t){return this.resources.create(Object.assign(Object.assign({},e),{type:c$3.TYPE}),s,t)}async retrieve(e,s,t){return this.resources.retrieve({type:c$3.TYPE,id:e},s,t)}async update(e,s,t){return this.resources.update(Object.assign(Object.assign({},e),{type:c$3.TYPE}),s,t)}async delete(e,s){await this.resources.delete({type:c$3.TYPE,id:e},s);}async customer_group(e,s,t){const r=e.id||e;return this.resources.fetch({type:"customer_groups"},`customers/${r}/customer_group`,s,t)}async customer_addresses(e,s,t){const r=e.id||e;return this.resources.fetch({type:"customer_addresses"},`customers/${r}/customer_addresses`,s,t)}async customer_payment_sources(e,s,t){const r=e.id||e;return this.resources.fetch({type:"customer_payment_sources"},`customers/${r}/customer_payment_sources`,s,t)}async customer_subscriptions(e,s,t){const r=e.id||e;return this.resources.fetch({type:"customer_subscriptions"},`customers/${r}/customer_subscriptions`,s,t)}async orders(e,s,t){const r=e.id||e;return this.resources.fetch({type:"orders"},`customers/${r}/orders`,s,t)}async order_subscriptions(e,s,t){const r=e.id||e;return this.resources.fetch({type:"order_subscriptions"},`customers/${r}/order_subscriptions`,s,t)}async returns(e,s,t){const r=e.id||e;return this.resources.fetch({type:"returns"},`customers/${r}/returns`,s,t)}async attachments(e,s,t){const r=e.id||e;return this.resources.fetch({type:"attachments"},`customers/${r}/attachments`,s,t)}async events(e,s,t){const r=e.id||e;return this.resources.fetch({type:"events"},`customers/${r}/events`,s,t)}isCustomer(e){return e.type&&e.type===c$3.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:c$3.TYPE}:{id:e.id,type:c$3.TYPE}}type(){return c$3.TYPE}}c$3.TYPE="customers";

class s$w extends _$1{async list(e,t){return this.resources.list({type:s$w.TYPE},e,t)}async create(e,t,i){return this.resources.create(Object.assign(Object.assign({},e),{type:s$w.TYPE}),t,i)}async retrieve(e,t,i){return this.resources.retrieve({type:s$w.TYPE,id:e},t,i)}async update(e,t,i){return this.resources.update(Object.assign(Object.assign({},e),{type:s$w.TYPE}),t,i)}async delete(e,t){await this.resources.delete({type:s$w.TYPE,id:e},t);}async stock_location(e,t,i){const r=e.id||e;return this.resources.fetch({type:"stock_locations"},`delivery_lead_times/${r}/stock_location`,t,i)}async shipping_method(e,t,i){const r=e.id||e;return this.resources.fetch({type:"shipping_methods"},`delivery_lead_times/${r}/shipping_method`,t,i)}async attachments(e,t,i){const r=e.id||e;return this.resources.fetch({type:"attachments"},`delivery_lead_times/${r}/attachments`,t,i)}isDeliveryLeadTime(e){return e.type&&e.type===s$w.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$w.TYPE}:{id:e.id,type:s$w.TYPE}}type(){return s$w.TYPE}}s$w.TYPE="delivery_lead_times";

class t$k extends _$1{async list(e,s){return this.resources.list({type:t$k.TYPE},e,s)}async retrieve(e,s,r){return this.resources.retrieve({type:t$k.TYPE,id:e},s,r)}async webhook(e,s,r){const i=e.id||e;return this.resources.fetch({type:"webhooks"},`event_callbacks/${i}/webhook`,s,r)}isEventCallback(e){return e.type&&e.type===t$k.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$k.TYPE}:{id:e.id,type:t$k.TYPE}}type(){return t$k.TYPE}}t$k.TYPE="event_callbacks";

class t$j extends _$1{async list(e,s){return this.resources.list({type:t$j.TYPE},e,s)}async retrieve(e,s,r){return this.resources.retrieve({type:t$j.TYPE,id:e},s,r)}async last_event_callbacks(e,s,r){const n=e.id||e;return this.resources.fetch({type:"event_callbacks"},`events/${n}/last_event_callbacks`,s,r)}async webhooks(e,s,r){const n=e.id||e;return this.resources.fetch({type:"webhooks"},`events/${n}/webhooks`,s,r)}isEvent(e){return e.type&&e.type===t$j.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$j.TYPE}:{id:e.id,type:t$j.TYPE}}type(){return t$j.TYPE}}t$j.TYPE="events";

class t$i extends _$1{async list(e,s){return this.resources.list({type:t$i.TYPE},e,s)}async create(e,s,r){return this.resources.create(Object.assign(Object.assign({},e),{type:t$i.TYPE}),s,r)}async retrieve(e,s,r){return this.resources.retrieve({type:t$i.TYPE,id:e},s,r)}async delete(e,s){await this.resources.delete({type:t$i.TYPE,id:e},s);}async events(e,s,r){const i=e.id||e;return this.resources.fetch({type:"events"},`exports/${i}/events`,s,r)}isExport(e){return e.type&&e.type===t$i.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$i.TYPE}:{id:e.id,type:t$i.TYPE}}type(){return t$i.TYPE}}t$i.TYPE="exports";

class s$v extends _$1{async list(e,t){return this.resources.list({type:s$v.TYPE},e,t)}async create(e,t,a){return this.resources.create(Object.assign(Object.assign({},e),{type:s$v.TYPE}),t,a)}async retrieve(e,t,a){return this.resources.retrieve({type:s$v.TYPE,id:e},t,a)}async update(e,t,a){return this.resources.update(Object.assign(Object.assign({},e),{type:s$v.TYPE}),t,a)}async delete(e,t){await this.resources.delete({type:s$v.TYPE,id:e},t);}async payment_methods(e,t,a){const r=e.id||e;return this.resources.fetch({type:"payment_methods"},`external_gateways/${r}/payment_methods`,t,a)}async external_payments(e,t,a){const r=e.id||e;return this.resources.fetch({type:"external_payments"},`external_gateways/${r}/external_payments`,t,a)}isExternalGateway(e){return e.type&&e.type===s$v.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$v.TYPE}:{id:e.id,type:s$v.TYPE}}type(){return s$v.TYPE}}s$v.TYPE="external_gateways";

class s$u extends _$1{async list(e,t){return this.resources.list({type:s$u.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$u.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$u.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$u.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$u.TYPE,id:e},t);}async order(e,t,r){const a=e.id||e;return this.resources.fetch({type:"orders"},`external_payments/${a}/order`,t,r)}async payment_gateway(e,t,r){const a=e.id||e;return this.resources.fetch({type:"payment_gateways"},`external_payments/${a}/payment_gateway`,t,r)}async wallet(e,t,r){const a=e.id||e;return this.resources.fetch({type:"customer_payment_sources"},`external_payments/${a}/wallet`,t,r)}isExternalPayment(e){return e.type&&e.type===s$u.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$u.TYPE}:{id:e.id,type:s$u.TYPE}}type(){return s$u.TYPE}}s$u.TYPE="external_payments";

class s$t extends _$1{async list(e,t){return this.resources.list({type:s$t.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$t.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$t.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$t.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$t.TYPE,id:e},t);}async market(e,t,r){const o=e.id||e;return this.resources.fetch({type:"markets"},`external_promotions/${o}/market`,t,r)}async order_amount_promotion_rule(e,t,r){const o=e.id||e;return this.resources.fetch({type:"order_amount_promotion_rules"},`external_promotions/${o}/order_amount_promotion_rule`,t,r)}async sku_list_promotion_rule(e,t,r){const o=e.id||e;return this.resources.fetch({type:"sku_list_promotion_rules"},`external_promotions/${o}/sku_list_promotion_rule`,t,r)}async coupon_codes_promotion_rule(e,t,r){const o=e.id||e;return this.resources.fetch({type:"coupon_codes_promotion_rules"},`external_promotions/${o}/coupon_codes_promotion_rule`,t,r)}async attachments(e,t,r){const o=e.id||e;return this.resources.fetch({type:"attachments"},`external_promotions/${o}/attachments`,t,r)}isExternalPromotion(e){return e.type&&e.type===s$t.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$t.TYPE}:{id:e.id,type:s$t.TYPE}}type(){return s$t.TYPE}}s$t.TYPE="external_promotions";

class s$s extends _$1{async list(e,t){return this.resources.list({type:s$s.TYPE},e,t)}async create(e,t,a){return this.resources.create(Object.assign(Object.assign({},e),{type:s$s.TYPE}),t,a)}async retrieve(e,t,a){return this.resources.retrieve({type:s$s.TYPE,id:e},t,a)}async update(e,t,a){return this.resources.update(Object.assign(Object.assign({},e),{type:s$s.TYPE}),t,a)}async delete(e,t){await this.resources.delete({type:s$s.TYPE,id:e},t);}async tax_categories(e,t,a){const r=e.id||e;return this.resources.fetch({type:"tax_categories"},`external_tax_calculators/${r}/tax_categories`,t,a)}async markets(e,t,a){const r=e.id||e;return this.resources.fetch({type:"markets"},`external_tax_calculators/${r}/markets`,t,a)}async attachments(e,t,a){const r=e.id||e;return this.resources.fetch({type:"attachments"},`external_tax_calculators/${r}/attachments`,t,a)}isExternalTaxCalculator(e){return e.type&&e.type===s$s.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$s.TYPE}:{id:e.id,type:s$s.TYPE}}type(){return s$s.TYPE}}s$s.TYPE="external_tax_calculators";

class s$r extends _$1{async list(e,t){return this.resources.list({type:s$r.TYPE},e,t)}async create(e,t,o){return this.resources.create(Object.assign(Object.assign({},e),{type:s$r.TYPE}),t,o)}async retrieve(e,t,o){return this.resources.retrieve({type:s$r.TYPE,id:e},t,o)}async update(e,t,o){return this.resources.update(Object.assign(Object.assign({},e),{type:s$r.TYPE}),t,o)}async delete(e,t){await this.resources.delete({type:s$r.TYPE,id:e},t);}async market(e,t,o){const r=e.id||e;return this.resources.fetch({type:"markets"},`fixed_amount_promotions/${r}/market`,t,o)}async order_amount_promotion_rule(e,t,o){const r=e.id||e;return this.resources.fetch({type:"order_amount_promotion_rules"},`fixed_amount_promotions/${r}/order_amount_promotion_rule`,t,o)}async sku_list_promotion_rule(e,t,o){const r=e.id||e;return this.resources.fetch({type:"sku_list_promotion_rules"},`fixed_amount_promotions/${r}/sku_list_promotion_rule`,t,o)}async coupon_codes_promotion_rule(e,t,o){const r=e.id||e;return this.resources.fetch({type:"coupon_codes_promotion_rules"},`fixed_amount_promotions/${r}/coupon_codes_promotion_rule`,t,o)}async attachments(e,t,o){const r=e.id||e;return this.resources.fetch({type:"attachments"},`fixed_amount_promotions/${r}/attachments`,t,o)}isFixedAmountPromotion(e){return e.type&&e.type===s$r.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$r.TYPE}:{id:e.id,type:s$r.TYPE}}type(){return s$r.TYPE}}s$r.TYPE="fixed_amount_promotions";

class o$2 extends _$1{async list(e,t){return this.resources.list({type:o$2.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:o$2.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:o$2.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:o$2.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:o$2.TYPE,id:e},t);}async market(e,t,s){const r=e.id||e;return this.resources.fetch({type:"markets"},`fixed_price_promotions/${r}/market`,t,s)}async order_amount_promotion_rule(e,t,s){const r=e.id||e;return this.resources.fetch({type:"order_amount_promotion_rules"},`fixed_price_promotions/${r}/order_amount_promotion_rule`,t,s)}async sku_list_promotion_rule(e,t,s){const r=e.id||e;return this.resources.fetch({type:"sku_list_promotion_rules"},`fixed_price_promotions/${r}/sku_list_promotion_rule`,t,s)}async coupon_codes_promotion_rule(e,t,s){const r=e.id||e;return this.resources.fetch({type:"coupon_codes_promotion_rules"},`fixed_price_promotions/${r}/coupon_codes_promotion_rule`,t,s)}async attachments(e,t,s){const r=e.id||e;return this.resources.fetch({type:"attachments"},`fixed_price_promotions/${r}/attachments`,t,s)}async sku_list(e,t,s){const r=e.id||e;return this.resources.fetch({type:"sku_lists"},`fixed_price_promotions/${r}/sku_list`,t,s)}async skus(e,t,s){const r=e.id||e;return this.resources.fetch({type:"skus"},`fixed_price_promotions/${r}/skus`,t,s)}isFixedPricePromotion(e){return e.type&&e.type===o$2.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:o$2.TYPE}:{id:e.id,type:o$2.TYPE}}type(){return o$2.TYPE}}o$2.TYPE="fixed_price_promotions";

class o$1 extends _$1{async list(e,s){return this.resources.list({type:o$1.TYPE},e,s)}async create(e,s,t){return this.resources.create(Object.assign(Object.assign({},e),{type:o$1.TYPE}),s,t)}async retrieve(e,s,t){return this.resources.retrieve({type:o$1.TYPE,id:e},s,t)}async update(e,s,t){return this.resources.update(Object.assign(Object.assign({},e),{type:o$1.TYPE}),s,t)}async delete(e,s){await this.resources.delete({type:o$1.TYPE,id:e},s);}async market(e,s,t){const r=e.id||e;return this.resources.fetch({type:"markets"},`free_gift_promotions/${r}/market`,s,t)}async order_amount_promotion_rule(e,s,t){const r=e.id||e;return this.resources.fetch({type:"order_amount_promotion_rules"},`free_gift_promotions/${r}/order_amount_promotion_rule`,s,t)}async sku_list_promotion_rule(e,s,t){const r=e.id||e;return this.resources.fetch({type:"sku_list_promotion_rules"},`free_gift_promotions/${r}/sku_list_promotion_rule`,s,t)}async coupon_codes_promotion_rule(e,s,t){const r=e.id||e;return this.resources.fetch({type:"coupon_codes_promotion_rules"},`free_gift_promotions/${r}/coupon_codes_promotion_rule`,s,t)}async attachments(e,s,t){const r=e.id||e;return this.resources.fetch({type:"attachments"},`free_gift_promotions/${r}/attachments`,s,t)}async sku_list(e,s,t){const r=e.id||e;return this.resources.fetch({type:"sku_lists"},`free_gift_promotions/${r}/sku_list`,s,t)}async skus(e,s,t){const r=e.id||e;return this.resources.fetch({type:"skus"},`free_gift_promotions/${r}/skus`,s,t)}isFreeGiftPromotion(e){return e.type&&e.type===o$1.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:o$1.TYPE}:{id:e.id,type:o$1.TYPE}}type(){return o$1.TYPE}}o$1.TYPE="free_gift_promotions";

class s$q extends _$1{async list(e,t){return this.resources.list({type:s$q.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$q.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$q.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$q.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$q.TYPE,id:e},t);}async market(e,t,r){const o=e.id||e;return this.resources.fetch({type:"markets"},`free_shipping_promotions/${o}/market`,t,r)}async order_amount_promotion_rule(e,t,r){const o=e.id||e;return this.resources.fetch({type:"order_amount_promotion_rules"},`free_shipping_promotions/${o}/order_amount_promotion_rule`,t,r)}async sku_list_promotion_rule(e,t,r){const o=e.id||e;return this.resources.fetch({type:"sku_list_promotion_rules"},`free_shipping_promotions/${o}/sku_list_promotion_rule`,t,r)}async coupon_codes_promotion_rule(e,t,r){const o=e.id||e;return this.resources.fetch({type:"coupon_codes_promotion_rules"},`free_shipping_promotions/${o}/coupon_codes_promotion_rule`,t,r)}async attachments(e,t,r){const o=e.id||e;return this.resources.fetch({type:"attachments"},`free_shipping_promotions/${o}/attachments`,t,r)}isFreeShippingPromotion(e){return e.type&&e.type===s$q.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$q.TYPE}:{id:e.id,type:s$q.TYPE}}type(){return s$q.TYPE}}s$q.TYPE="free_shipping_promotions";

class t$h extends _$1{async list(e,r){return this.resources.list({type:t$h.TYPE},e,r)}async retrieve(e,r,s){return this.resources.retrieve({type:t$h.TYPE,id:e},r,s)}async addresses(e,r,s){const c=e.id||e;return this.resources.fetch({type:"addresses"},`geocoders/${c}/addresses`,r,s)}async attachments(e,r,s){const c=e.id||e;return this.resources.fetch({type:"attachments"},`geocoders/${c}/attachments`,r,s)}isGeocoder(e){return e.type&&e.type===t$h.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$h.TYPE}:{id:e.id,type:t$h.TYPE}}type(){return t$h.TYPE}}t$h.TYPE="geocoders";

class s$p extends _$1{async list(e,t){return this.resources.list({type:s$p.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$p.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$p.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$p.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$p.TYPE,id:e},t);}async customer(e,t,r){const i=e.id||e;return this.resources.fetch({type:"customers"},`gift_card_recipients/${i}/customer`,t,r)}async attachments(e,t,r){const i=e.id||e;return this.resources.fetch({type:"attachments"},`gift_card_recipients/${i}/attachments`,t,r)}isGiftCardRecipient(e){return e.type&&e.type===s$p.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$p.TYPE}:{id:e.id,type:s$p.TYPE}}type(){return s$p.TYPE}}s$p.TYPE="gift_card_recipients";

class r$d extends _$1{async list(e,t){return this.resources.list({type:r$d.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:r$d.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:r$d.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:r$d.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:r$d.TYPE,id:e},t);}async market(e,t,s){const c=e.id||e;return this.resources.fetch({type:"markets"},`gift_cards/${c}/market`,t,s)}async gift_card_recipient(e,t,s){const c=e.id||e;return this.resources.fetch({type:"gift_card_recipients"},`gift_cards/${c}/gift_card_recipient`,t,s)}async attachments(e,t,s){const c=e.id||e;return this.resources.fetch({type:"attachments"},`gift_cards/${c}/attachments`,t,s)}async events(e,t,s){const c=e.id||e;return this.resources.fetch({type:"events"},`gift_cards/${c}/events`,t,s)}isGiftCard(e){return e.type&&e.type===r$d.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r$d.TYPE}:{id:e.id,type:r$d.TYPE}}type(){return r$d.TYPE}}r$d.TYPE="gift_cards";

class s$o extends _$1{async list(e,t){return this.resources.list({type:s$o.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$o.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$o.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$o.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$o.TYPE,id:e},t);}async addresses(e,t,r){const c=e.id||e;return this.resources.fetch({type:"addresses"},`google_geocoders/${c}/addresses`,t,r)}async attachments(e,t,r){const c=e.id||e;return this.resources.fetch({type:"attachments"},`google_geocoders/${c}/attachments`,t,r)}isGoogleGeocoder(e){return e.type&&e.type===s$o.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$o.TYPE}:{id:e.id,type:s$o.TYPE}}type(){return s$o.TYPE}}s$o.TYPE="google_geocoders";

class t$g extends _$1{async list(e,s){return this.resources.list({type:t$g.TYPE},e,s)}async create(e,s,r){return this.resources.create(Object.assign(Object.assign({},e),{type:t$g.TYPE}),s,r)}async retrieve(e,s,r){return this.resources.retrieve({type:t$g.TYPE,id:e},s,r)}async delete(e,s){await this.resources.delete({type:t$g.TYPE,id:e},s);}async events(e,s,r){const i=e.id||e;return this.resources.fetch({type:"events"},`imports/${i}/events`,s,r)}isImport(e){return e.type&&e.type===t$g.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$g.TYPE}:{id:e.id,type:t$g.TYPE}}type(){return t$g.TYPE}}t$g.TYPE="imports";

class r$c extends _$1{async list(e,t){return this.resources.list({type:r$c.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:r$c.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:r$c.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:r$c.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:r$c.TYPE,id:e},t);}async market(e,t,s){const c=e.id||e;return this.resources.fetch({type:"markets"},`in_stock_subscriptions/${c}/market`,t,s)}async customer(e,t,s){const c=e.id||e;return this.resources.fetch({type:"customers"},`in_stock_subscriptions/${c}/customer`,t,s)}async sku(e,t,s){const c=e.id||e;return this.resources.fetch({type:"skus"},`in_stock_subscriptions/${c}/sku`,t,s)}async events(e,t,s){const c=e.id||e;return this.resources.fetch({type:"events"},`in_stock_subscriptions/${c}/events`,t,s)}isInStockSubscription(e){return e.type&&e.type===r$c.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r$c.TYPE}:{id:e.id,type:r$c.TYPE}}type(){return r$c.TYPE}}r$c.TYPE="in_stock_subscriptions";

class s$n extends _$1{async list(t,e){return this.resources.list({type:s$n.TYPE},t,e)}async create(t,e,r){return this.resources.create(Object.assign(Object.assign({},t),{type:s$n.TYPE}),e,r)}async retrieve(t,e,r){return this.resources.retrieve({type:s$n.TYPE,id:t},e,r)}async update(t,e,r){return this.resources.update(Object.assign(Object.assign({},t),{type:s$n.TYPE}),e,r)}async delete(t,e){await this.resources.delete({type:s$n.TYPE,id:t},e);}async inventory_stock_locations(t,e,r){const n=t.id||t;return this.resources.fetch({type:"inventory_stock_locations"},`inventory_models/${n}/inventory_stock_locations`,e,r)}async inventory_return_locations(t,e,r){const n=t.id||t;return this.resources.fetch({type:"inventory_return_locations"},`inventory_models/${n}/inventory_return_locations`,e,r)}async attachments(t,e,r){const n=t.id||t;return this.resources.fetch({type:"attachments"},`inventory_models/${n}/attachments`,e,r)}isInventoryModel(t){return t.type&&t.type===s$n.TYPE}relationship(t){return t===null||typeof t=="string"?{id:t,type:s$n.TYPE}:{id:t.id,type:s$n.TYPE}}type(){return s$n.TYPE}}s$n.TYPE="inventory_models";

class s$m extends _$1{async list(e,t){return this.resources.list({type:s$m.TYPE},e,t)}async create(e,t,n){return this.resources.create(Object.assign(Object.assign({},e),{type:s$m.TYPE}),t,n)}async retrieve(e,t,n){return this.resources.retrieve({type:s$m.TYPE,id:e},t,n)}async update(e,t,n){return this.resources.update(Object.assign(Object.assign({},e),{type:s$m.TYPE}),t,n)}async delete(e,t){await this.resources.delete({type:s$m.TYPE,id:e},t);}async stock_location(e,t,n){const r=e.id||e;return this.resources.fetch({type:"stock_locations"},`inventory_return_locations/${r}/stock_location`,t,n)}async inventory_model(e,t,n){const r=e.id||e;return this.resources.fetch({type:"inventory_models"},`inventory_return_locations/${r}/inventory_model`,t,n)}isInventoryReturnLocation(e){return e.type&&e.type===s$m.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$m.TYPE}:{id:e.id,type:s$m.TYPE}}type(){return s$m.TYPE}}s$m.TYPE="inventory_return_locations";

class s$l extends _$1{async list(e,t){return this.resources.list({type:s$l.TYPE},e,t)}async create(e,t,n){return this.resources.create(Object.assign(Object.assign({},e),{type:s$l.TYPE}),t,n)}async retrieve(e,t,n){return this.resources.retrieve({type:s$l.TYPE,id:e},t,n)}async update(e,t,n){return this.resources.update(Object.assign(Object.assign({},e),{type:s$l.TYPE}),t,n)}async delete(e,t){await this.resources.delete({type:s$l.TYPE,id:e},t);}async stock_location(e,t,n){const o=e.id||e;return this.resources.fetch({type:"stock_locations"},`inventory_stock_locations/${o}/stock_location`,t,n)}async inventory_model(e,t,n){const o=e.id||e;return this.resources.fetch({type:"inventory_models"},`inventory_stock_locations/${o}/inventory_model`,t,n)}isInventoryStockLocation(e){return e.type&&e.type===s$l.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$l.TYPE}:{id:e.id,type:s$l.TYPE}}type(){return s$l.TYPE}}s$l.TYPE="inventory_stock_locations";

class s$k extends _$1{async list(e,t){return this.resources.list({type:s$k.TYPE},e,t)}async create(e,t,a){return this.resources.create(Object.assign(Object.assign({},e),{type:s$k.TYPE}),t,a)}async retrieve(e,t,a){return this.resources.retrieve({type:s$k.TYPE,id:e},t,a)}async update(e,t,a){return this.resources.update(Object.assign(Object.assign({},e),{type:s$k.TYPE}),t,a)}async delete(e,t){await this.resources.delete({type:s$k.TYPE,id:e},t);}async payment_methods(e,t,a){const r=e.id||e;return this.resources.fetch({type:"payment_methods"},`klarna_gateways/${r}/payment_methods`,t,a)}async klarna_payments(e,t,a){const r=e.id||e;return this.resources.fetch({type:"klarna_payments"},`klarna_gateways/${r}/klarna_payments`,t,a)}isKlarnaGateway(e){return e.type&&e.type===s$k.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$k.TYPE}:{id:e.id,type:s$k.TYPE}}type(){return s$k.TYPE}}s$k.TYPE="klarna_gateways";

class r$b extends _$1{async list(e,t){return this.resources.list({type:r$b.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:r$b.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:r$b.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:r$b.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:r$b.TYPE,id:e},t);}async order(e,t,s){const a=e.id||e;return this.resources.fetch({type:"orders"},`klarna_payments/${a}/order`,t,s)}async payment_gateway(e,t,s){const a=e.id||e;return this.resources.fetch({type:"payment_gateways"},`klarna_payments/${a}/payment_gateway`,t,s)}isKlarnaPayment(e){return e.type&&e.type===r$b.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r$b.TYPE}:{id:e.id,type:r$b.TYPE}}type(){return r$b.TYPE}}r$b.TYPE="klarna_payments";

class s$j extends _$1{async list(e,t){return this.resources.list({type:s$j.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$j.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$j.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$j.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$j.TYPE,id:e},t);}async line_item(e,t,r){const i=e.id||e;return this.resources.fetch({type:"line_items"},`line_item_options/${i}/line_item`,t,r)}async sku_option(e,t,r){const i=e.id||e;return this.resources.fetch({type:"sku_options"},`line_item_options/${i}/sku_option`,t,r)}isLineItemOption(e){return e.type&&e.type===s$j.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$j.TYPE}:{id:e.id,type:s$j.TYPE}}type(){return s$j.TYPE}}s$j.TYPE="line_item_options";

class r$a extends _$1{async list(e,t){return this.resources.list({type:r$a.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:r$a.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:r$a.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:r$a.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:r$a.TYPE,id:e},t);}async order(e,t,s){const i=e.id||e;return this.resources.fetch({type:"orders"},`line_items/${i}/order`,t,s)}async line_item_options(e,t,s){const i=e.id||e;return this.resources.fetch({type:"line_item_options"},`line_items/${i}/line_item_options`,t,s)}async stock_line_items(e,t,s){const i=e.id||e;return this.resources.fetch({type:"stock_line_items"},`line_items/${i}/stock_line_items`,t,s)}async stock_transfers(e,t,s){const i=e.id||e;return this.resources.fetch({type:"stock_transfers"},`line_items/${i}/stock_transfers`,t,s)}isLineItem(e){return e.type&&e.type===r$a.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r$a.TYPE}:{id:e.id,type:r$a.TYPE}}type(){return r$a.TYPE}}r$a.TYPE="line_items";

class t$f extends _$1{async list(e,s){return this.resources.list({type:t$f.TYPE},e,s)}async create(e,s,r){return this.resources.create(Object.assign(Object.assign({},e),{type:t$f.TYPE}),s,r)}async retrieve(e,s,r){return this.resources.retrieve({type:t$f.TYPE,id:e},s,r)}async update(e,s,r){return this.resources.update(Object.assign(Object.assign({},e),{type:t$f.TYPE}),s,r)}async delete(e,s){await this.resources.delete({type:t$f.TYPE,id:e},s);}async payment_methods(e,s,r){const a=e.id||e;return this.resources.fetch({type:"payment_methods"},`manual_gateways/${a}/payment_methods`,s,r)}isManualGateway(e){return e.type&&e.type===t$f.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$f.TYPE}:{id:e.id,type:t$f.TYPE}}type(){return t$f.TYPE}}t$f.TYPE="manual_gateways";

class r$9 extends _$1{async list(e,t){return this.resources.list({type:r$9.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:r$9.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:r$9.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:r$9.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:r$9.TYPE,id:e},t);}async tax_categories(e,t,s){const a=e.id||e;return this.resources.fetch({type:"tax_categories"},`manual_tax_calculators/${a}/tax_categories`,t,s)}async markets(e,t,s){const a=e.id||e;return this.resources.fetch({type:"markets"},`manual_tax_calculators/${a}/markets`,t,s)}async attachments(e,t,s){const a=e.id||e;return this.resources.fetch({type:"attachments"},`manual_tax_calculators/${a}/attachments`,t,s)}async tax_rules(e,t,s){const a=e.id||e;return this.resources.fetch({type:"tax_rules"},`manual_tax_calculators/${a}/tax_rules`,t,s)}isManualTaxCalculator(e){return e.type&&e.type===r$9.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r$9.TYPE}:{id:e.id,type:r$9.TYPE}}type(){return r$9.TYPE}}r$9.TYPE="manual_tax_calculators";

class r$8 extends _$1{async list(e,t){return this.resources.list({type:r$8.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:r$8.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:r$8.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:r$8.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:r$8.TYPE,id:e},t);}async merchant(e,t,s){const c=e.id||e;return this.resources.fetch({type:"merchants"},`markets/${c}/merchant`,t,s)}async price_list(e,t,s){const c=e.id||e;return this.resources.fetch({type:"price_lists"},`markets/${c}/price_list`,t,s)}async inventory_model(e,t,s){const c=e.id||e;return this.resources.fetch({type:"inventory_models"},`markets/${c}/inventory_model`,t,s)}async tax_calculator(e,t,s){const c=e.id||e;return this.resources.fetch({type:"tax_calculators"},`markets/${c}/tax_calculator`,t,s)}async customer_group(e,t,s){const c=e.id||e;return this.resources.fetch({type:"customer_groups"},`markets/${c}/customer_group`,t,s)}async attachments(e,t,s){const c=e.id||e;return this.resources.fetch({type:"attachments"},`markets/${c}/attachments`,t,s)}isMarket(e){return e.type&&e.type===r$8.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r$8.TYPE}:{id:e.id,type:r$8.TYPE}}type(){return r$8.TYPE}}r$8.TYPE="markets";

class s$i extends _$1{async list(e,t){return this.resources.list({type:s$i.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$i.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$i.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$i.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$i.TYPE,id:e},t);}async address(e,t,r){const a=e.id||e;return this.resources.fetch({type:"addresses"},`merchants/${a}/address`,t,r)}async attachments(e,t,r){const a=e.id||e;return this.resources.fetch({type:"attachments"},`merchants/${a}/attachments`,t,r)}isMerchant(e){return e.type&&e.type===s$i.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$i.TYPE}:{id:e.id,type:s$i.TYPE}}type(){return s$i.TYPE}}s$i.TYPE="merchants";

class t$e extends _$1{async list(e,s){return this.resources.list({type:t$e.TYPE},e,s)}async create(e,s,r){return this.resources.create(Object.assign(Object.assign({},e),{type:t$e.TYPE}),s,r)}async retrieve(e,s,r){return this.resources.retrieve({type:t$e.TYPE,id:e},s,r)}async update(e,s,r){return this.resources.update(Object.assign(Object.assign({},e),{type:t$e.TYPE}),s,r)}async delete(e,s){await this.resources.delete({type:t$e.TYPE,id:e},s);}isOrderAmountPromotionRule(e){return e.type&&e.type===t$e.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$e.TYPE}:{id:e.id,type:t$e.TYPE}}type(){return t$e.TYPE}}t$e.TYPE="order_amount_promotion_rules";

class s$h extends _$1{async list(e,r){return this.resources.list({type:s$h.TYPE},e,r)}async create(e,r,t){return this.resources.create(Object.assign(Object.assign({},e),{type:s$h.TYPE}),r,t)}async retrieve(e,r,t){return this.resources.retrieve({type:s$h.TYPE,id:e},r,t)}async delete(e,r){await this.resources.delete({type:s$h.TYPE,id:e},r);}async source_order(e,r,t){const c=e.id||e;return this.resources.fetch({type:"orders"},`order_copies/${c}/source_order`,r,t)}async target_order(e,r,t){const c=e.id||e;return this.resources.fetch({type:"orders"},`order_copies/${c}/target_order`,r,t)}async order_subscription(e,r,t){const c=e.id||e;return this.resources.fetch({type:"order_subscriptions"},`order_copies/${c}/order_subscription`,r,t)}async events(e,r,t){const c=e.id||e;return this.resources.fetch({type:"events"},`order_copies/${c}/events`,r,t)}isOrderCopy(e){return e.type&&e.type===s$h.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$h.TYPE}:{id:e.id,type:s$h.TYPE}}type(){return s$h.TYPE}}s$h.TYPE="order_copies";

class t$d extends _$1{async list(e,r){return this.resources.list({type:t$d.TYPE},e,r)}async create(e,r,s){return this.resources.create(Object.assign(Object.assign({},e),{type:t$d.TYPE}),r,s)}async retrieve(e,r,s){return this.resources.retrieve({type:t$d.TYPE,id:e},r,s)}async update(e,r,s){return this.resources.update(Object.assign(Object.assign({},e),{type:t$d.TYPE}),r,s)}async delete(e,r){await this.resources.delete({type:t$d.TYPE,id:e},r);}async market(e,r,s){const c=e.id||e;return this.resources.fetch({type:"markets"},`order_subscriptions/${c}/market`,r,s)}async source_order(e,r,s){const c=e.id||e;return this.resources.fetch({type:"orders"},`order_subscriptions/${c}/source_order`,r,s)}async customer(e,r,s){const c=e.id||e;return this.resources.fetch({type:"customers"},`order_subscriptions/${c}/customer`,r,s)}async order_copies(e,r,s){const c=e.id||e;return this.resources.fetch({type:"order_copies"},`order_subscriptions/${c}/order_copies`,r,s)}async orders(e,r,s){const c=e.id||e;return this.resources.fetch({type:"orders"},`order_subscriptions/${c}/orders`,r,s)}async events(e,r,s){const c=e.id||e;return this.resources.fetch({type:"events"},`order_subscriptions/${c}/events`,r,s)}isOrderSubscription(e){return e.type&&e.type===t$d.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$d.TYPE}:{id:e.id,type:t$d.TYPE}}type(){return t$d.TYPE}}t$d.TYPE="order_subscriptions";

class t$c extends _$1{async list(e,r){return this.resources.list({type:t$c.TYPE},e,r)}async retrieve(e,r,s){return this.resources.retrieve({type:t$c.TYPE,id:e},r,s)}async market(e,r,s){const i=e.id||e;return this.resources.fetch({type:"markets"},`order_validation_rules/${i}/market`,r,s)}isOrderValidationRule(e){return e.type&&e.type===t$c.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$c.TYPE}:{id:e.id,type:t$c.TYPE}}type(){return t$c.TYPE}}t$c.TYPE="order_validation_rules";

class c$2 extends _$1{async list(e,s){return this.resources.list({type:c$2.TYPE},e,s)}async create(e,s,t){return this.resources.create(Object.assign(Object.assign({},e),{type:c$2.TYPE}),s,t)}async retrieve(e,s,t){return this.resources.retrieve({type:c$2.TYPE,id:e},s,t)}async update(e,s,t){return this.resources.update(Object.assign(Object.assign({},e),{type:c$2.TYPE}),s,t)}async delete(e,s){await this.resources.delete({type:c$2.TYPE,id:e},s);}async market(e,s,t){const r=e.id||e;return this.resources.fetch({type:"markets"},`orders/${r}/market`,s,t)}async customer(e,s,t){const r=e.id||e;return this.resources.fetch({type:"customers"},`orders/${r}/customer`,s,t)}async shipping_address(e,s,t){const r=e.id||e;return this.resources.fetch({type:"addresses"},`orders/${r}/shipping_address`,s,t)}async billing_address(e,s,t){const r=e.id||e;return this.resources.fetch({type:"addresses"},`orders/${r}/billing_address`,s,t)}async available_payment_methods(e,s,t){const r=e.id||e;return this.resources.fetch({type:"payment_methods"},`orders/${r}/available_payment_methods`,s,t)}async available_customer_payment_sources(e,s,t){const r=e.id||e;return this.resources.fetch({type:"customer_payment_sources"},`orders/${r}/available_customer_payment_sources`,s,t)}async available_free_skus(e,s,t){const r=e.id||e;return this.resources.fetch({type:"skus"},`orders/${r}/available_free_skus`,s,t)}async available_free_bundles(e,s,t){const r=e.id||e;return this.resources.fetch({type:"bundles"},`orders/${r}/available_free_bundles`,s,t)}async payment_method(e,s,t){const r=e.id||e;return this.resources.fetch({type:"payment_methods"},`orders/${r}/payment_method`,s,t)}async line_items(e,s,t){const r=e.id||e;return this.resources.fetch({type:"line_items"},`orders/${r}/line_items`,s,t)}async shipments(e,s,t){const r=e.id||e;return this.resources.fetch({type:"shipments"},`orders/${r}/shipments`,s,t)}async authorizations(e,s,t){const r=e.id||e;return this.resources.fetch({type:"authorizations"},`orders/${r}/authorizations`,s,t)}async captures(e,s,t){const r=e.id||e;return this.resources.fetch({type:"captures"},`orders/${r}/captures`,s,t)}async voids(e,s,t){const r=e.id||e;return this.resources.fetch({type:"voids"},`orders/${r}/voids`,s,t)}async refunds(e,s,t){const r=e.id||e;return this.resources.fetch({type:"refunds"},`orders/${r}/refunds`,s,t)}async order_subscriptions(e,s,t){const r=e.id||e;return this.resources.fetch({type:"order_subscriptions"},`orders/${r}/order_subscriptions`,s,t)}async order_copies(e,s,t){const r=e.id||e;return this.resources.fetch({type:"order_copies"},`orders/${r}/order_copies`,s,t)}async attachments(e,s,t){const r=e.id||e;return this.resources.fetch({type:"attachments"},`orders/${r}/attachments`,s,t)}async events(e,s,t){const r=e.id||e;return this.resources.fetch({type:"events"},`orders/${r}/events`,s,t)}isOrder(e){return e.type&&e.type===c$2.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:c$2.TYPE}:{id:e.id,type:c$2.TYPE}}type(){return c$2.TYPE}}c$2.TYPE="orders";

class e$2 extends _$1{async retrieve(t,i){return this.resources.singleton({type:e$2.TYPE},t,i)}isOrganization(t){return t.type&&t.type===e$2.TYPE}relationship(t){return t===null||typeof t=="string"?{id:t,type:e$2.TYPE}:{id:t.id,type:e$2.TYPE}}type(){return e$2.TYPE}}e$2.TYPE="organization";

class s$g extends _$1{async list(e,t){return this.resources.list({type:s$g.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$g.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$g.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$g.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$g.TYPE,id:e},t);}async stock_location(e,t,r){const c=e.id||e;return this.resources.fetch({type:"stock_locations"},`packages/${c}/stock_location`,t,r)}async parcels(e,t,r){const c=e.id||e;return this.resources.fetch({type:"parcels"},`packages/${c}/parcels`,t,r)}async attachments(e,t,r){const c=e.id||e;return this.resources.fetch({type:"attachments"},`packages/${c}/attachments`,t,r)}isPackage(e){return e.type&&e.type===s$g.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$g.TYPE}:{id:e.id,type:s$g.TYPE}}type(){return s$g.TYPE}}s$g.TYPE="packages";

class s$f extends _$1{async list(e,t){return this.resources.list({type:s$f.TYPE},e,t)}async create(e,t,i){return this.resources.create(Object.assign(Object.assign({},e),{type:s$f.TYPE}),t,i)}async retrieve(e,t,i){return this.resources.retrieve({type:s$f.TYPE,id:e},t,i)}async update(e,t,i){return this.resources.update(Object.assign(Object.assign({},e),{type:s$f.TYPE}),t,i)}async delete(e,t){await this.resources.delete({type:s$f.TYPE,id:e},t);}async parcel(e,t,i){const r=e.id||e;return this.resources.fetch({type:"parcels"},`parcel_line_items/${r}/parcel`,t,i)}async stock_line_item(e,t,i){const r=e.id||e;return this.resources.fetch({type:"stock_line_items"},`parcel_line_items/${r}/stock_line_item`,t,i)}isParcelLineItem(e){return e.type&&e.type===s$f.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$f.TYPE}:{id:e.id,type:s$f.TYPE}}type(){return s$f.TYPE}}s$f.TYPE="parcel_line_items";

class c$1 extends _$1{async list(e,t){return this.resources.list({type:c$1.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:c$1.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:c$1.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:c$1.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:c$1.TYPE,id:e},t);}async shipment(e,t,s){const r=e.id||e;return this.resources.fetch({type:"shipments"},`parcels/${r}/shipment`,t,s)}async package(e,t,s){const r=e.id||e;return this.resources.fetch({type:"packages"},`parcels/${r}/package`,t,s)}async parcel_line_items(e,t,s){const r=e.id||e;return this.resources.fetch({type:"parcel_line_items"},`parcels/${r}/parcel_line_items`,t,s)}async attachments(e,t,s){const r=e.id||e;return this.resources.fetch({type:"attachments"},`parcels/${r}/attachments`,t,s)}async events(e,t,s){const r=e.id||e;return this.resources.fetch({type:"events"},`parcels/${r}/events`,t,s)}isParcel(e){return e.type&&e.type===c$1.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:c$1.TYPE}:{id:e.id,type:c$1.TYPE}}type(){return c$1.TYPE}}c$1.TYPE="parcels";

class t$b extends _$1{async list(e,r){return this.resources.list({type:t$b.TYPE},e,r)}async retrieve(e,r,s){return this.resources.retrieve({type:t$b.TYPE,id:e},r,s)}async payment_methods(e,r,s){const y=e.id||e;return this.resources.fetch({type:"payment_methods"},`payment_gateways/${y}/payment_methods`,r,s)}isPaymentGateway(e){return e.type&&e.type===t$b.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$b.TYPE}:{id:e.id,type:t$b.TYPE}}type(){return t$b.TYPE}}t$b.TYPE="payment_gateways";

class s$e extends _$1{async list(e,t){return this.resources.list({type:s$e.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$e.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$e.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$e.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$e.TYPE,id:e},t);}async market(e,t,r){const a=e.id||e;return this.resources.fetch({type:"markets"},`payment_methods/${a}/market`,t,r)}async payment_gateway(e,t,r){const a=e.id||e;return this.resources.fetch({type:"payment_gateways"},`payment_methods/${a}/payment_gateway`,t,r)}async attachments(e,t,r){const a=e.id||e;return this.resources.fetch({type:"attachments"},`payment_methods/${a}/attachments`,t,r)}isPaymentMethod(e){return e.type&&e.type===s$e.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$e.TYPE}:{id:e.id,type:s$e.TYPE}}type(){return s$e.TYPE}}s$e.TYPE="payment_methods";

class s$d extends _$1{async list(e,t){return this.resources.list({type:s$d.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$d.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$d.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$d.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$d.TYPE,id:e},t);}async payment_methods(e,t,r){const a=e.id||e;return this.resources.fetch({type:"payment_methods"},`paypal_gateways/${a}/payment_methods`,t,r)}async paypal_payments(e,t,r){const a=e.id||e;return this.resources.fetch({type:"paypal_payments"},`paypal_gateways/${a}/paypal_payments`,t,r)}isPaypalGateway(e){return e.type&&e.type===s$d.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$d.TYPE}:{id:e.id,type:s$d.TYPE}}type(){return s$d.TYPE}}s$d.TYPE="paypal_gateways";

class r$7 extends _$1{async list(e,t){return this.resources.list({type:r$7.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:r$7.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:r$7.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:r$7.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:r$7.TYPE,id:e},t);}async order(e,t,s){const a=e.id||e;return this.resources.fetch({type:"orders"},`paypal_payments/${a}/order`,t,s)}async payment_gateway(e,t,s){const a=e.id||e;return this.resources.fetch({type:"payment_gateways"},`paypal_payments/${a}/payment_gateway`,t,s)}isPaypalPayment(e){return e.type&&e.type===r$7.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r$7.TYPE}:{id:e.id,type:r$7.TYPE}}type(){return r$7.TYPE}}r$7.TYPE="paypal_payments";

class o extends _$1{async list(e,t){return this.resources.list({type:o.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:o.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:o.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:o.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:o.TYPE,id:e},t);}async market(e,t,s){const r=e.id||e;return this.resources.fetch({type:"markets"},`percentage_discount_promotions/${r}/market`,t,s)}async order_amount_promotion_rule(e,t,s){const r=e.id||e;return this.resources.fetch({type:"order_amount_promotion_rules"},`percentage_discount_promotions/${r}/order_amount_promotion_rule`,t,s)}async sku_list_promotion_rule(e,t,s){const r=e.id||e;return this.resources.fetch({type:"sku_list_promotion_rules"},`percentage_discount_promotions/${r}/sku_list_promotion_rule`,t,s)}async coupon_codes_promotion_rule(e,t,s){const r=e.id||e;return this.resources.fetch({type:"coupon_codes_promotion_rules"},`percentage_discount_promotions/${r}/coupon_codes_promotion_rule`,t,s)}async attachments(e,t,s){const r=e.id||e;return this.resources.fetch({type:"attachments"},`percentage_discount_promotions/${r}/attachments`,t,s)}async sku_list(e,t,s){const r=e.id||e;return this.resources.fetch({type:"sku_lists"},`percentage_discount_promotions/${r}/sku_list`,t,s)}async skus(e,t,s){const r=e.id||e;return this.resources.fetch({type:"skus"},`percentage_discount_promotions/${r}/skus`,t,s)}isPercentageDiscountPromotion(e){return e.type&&e.type===o.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:o.TYPE}:{id:e.id,type:o.TYPE}}type(){return o.TYPE}}o.TYPE="percentage_discount_promotions";

class s$c extends _$1{async list(e,t){return this.resources.list({type:s$c.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$c.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$c.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$c.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$c.TYPE,id:e},t);}async prices(e,t,r){const i=e.id||e;return this.resources.fetch({type:"prices"},`price_lists/${i}/prices`,t,r)}async attachments(e,t,r){const i=e.id||e;return this.resources.fetch({type:"attachments"},`price_lists/${i}/attachments`,t,r)}isPriceList(e){return e.type&&e.type===s$c.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$c.TYPE}:{id:e.id,type:s$c.TYPE}}type(){return s$c.TYPE}}s$c.TYPE="price_lists";

class t$a extends _$1{async list(e,r){return this.resources.list({type:t$a.TYPE},e,r)}async retrieve(e,r,s){return this.resources.retrieve({type:t$a.TYPE,id:e},r,s)}async price(e,r,s){const i=e.id||e;return this.resources.fetch({type:"prices"},`price_tiers/${i}/price`,r,s)}async attachments(e,r,s){const i=e.id||e;return this.resources.fetch({type:"attachments"},`price_tiers/${i}/attachments`,r,s)}isPriceTier(e){return e.type&&e.type===t$a.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$a.TYPE}:{id:e.id,type:t$a.TYPE}}type(){return t$a.TYPE}}t$a.TYPE="price_tiers";

class s$b extends _$1{async list(e,t){return this.resources.list({type:s$b.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$b.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$b.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$b.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$b.TYPE,id:e},t);}async price(e,t,r){const i=e.id||e;return this.resources.fetch({type:"prices"},`price_volume_tiers/${i}/price`,t,r)}async attachments(e,t,r){const i=e.id||e;return this.resources.fetch({type:"attachments"},`price_volume_tiers/${i}/attachments`,t,r)}isPriceVolumeTier(e){return e.type&&e.type===s$b.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$b.TYPE}:{id:e.id,type:s$b.TYPE}}type(){return s$b.TYPE}}s$b.TYPE="price_volume_tiers";

class r$6 extends _$1{async list(e,t){return this.resources.list({type:r$6.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:r$6.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:r$6.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:r$6.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:r$6.TYPE,id:e},t);}async price_list(e,t,s){const c=e.id||e;return this.resources.fetch({type:"price_lists"},`prices/${c}/price_list`,t,s)}async sku(e,t,s){const c=e.id||e;return this.resources.fetch({type:"skus"},`prices/${c}/sku`,t,s)}async price_tiers(e,t,s){const c=e.id||e;return this.resources.fetch({type:"price_tiers"},`prices/${c}/price_tiers`,t,s)}async price_volume_tiers(e,t,s){const c=e.id||e;return this.resources.fetch({type:"price_volume_tiers"},`prices/${c}/price_volume_tiers`,t,s)}async attachments(e,t,s){const c=e.id||e;return this.resources.fetch({type:"attachments"},`prices/${c}/attachments`,t,s)}isPrice(e){return e.type&&e.type===r$6.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r$6.TYPE}:{id:e.id,type:r$6.TYPE}}type(){return r$6.TYPE}}r$6.TYPE="prices";

class t$9 extends _$1{async list(e,r){return this.resources.list({type:t$9.TYPE},e,r)}async retrieve(e,r,i){return this.resources.retrieve({type:t$9.TYPE,id:e},r,i)}isPromotionRule(e){return e.type&&e.type===t$9.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$9.TYPE}:{id:e.id,type:t$9.TYPE}}type(){return t$9.TYPE}}t$9.TYPE="promotion_rules";

class s$a extends _$1{async list(t,r){return this.resources.list({type:s$a.TYPE},t,r)}async retrieve(t,r,e){return this.resources.retrieve({type:s$a.TYPE,id:t},r,e)}async market(t,r,e){const o=t.id||t;return this.resources.fetch({type:"markets"},`promotions/${o}/market`,r,e)}async order_amount_promotion_rule(t,r,e){const o=t.id||t;return this.resources.fetch({type:"order_amount_promotion_rules"},`promotions/${o}/order_amount_promotion_rule`,r,e)}async sku_list_promotion_rule(t,r,e){const o=t.id||t;return this.resources.fetch({type:"sku_list_promotion_rules"},`promotions/${o}/sku_list_promotion_rule`,r,e)}async coupon_codes_promotion_rule(t,r,e){const o=t.id||t;return this.resources.fetch({type:"coupon_codes_promotion_rules"},`promotions/${o}/coupon_codes_promotion_rule`,r,e)}async attachments(t,r,e){const o=t.id||t;return this.resources.fetch({type:"attachments"},`promotions/${o}/attachments`,r,e)}isPromotion(t){return t.type&&t.type===s$a.TYPE}relationship(t){return t===null||typeof t=="string"?{id:t,type:s$a.TYPE}:{id:t.id,type:s$a.TYPE}}type(){return s$a.TYPE}}s$a.TYPE="promotions";

class t$8 extends _$1{async list(e,r){return this.resources.list({type:t$8.TYPE},e,r)}async retrieve(e,r,s){return this.resources.retrieve({type:t$8.TYPE,id:e},r,s)}async order(e,r,s){const n=e.id||e;return this.resources.fetch({type:"orders"},`refunds/${n}/order`,r,s)}async reference_capture(e,r,s){const n=e.id||e;return this.resources.fetch({type:"captures"},`refunds/${n}/reference_capture`,r,s)}async events(e,r,s){const n=e.id||e;return this.resources.fetch({type:"events"},`refunds/${n}/events`,r,s)}isRefund(e){return e.type&&e.type===t$8.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$8.TYPE}:{id:e.id,type:t$8.TYPE}}type(){return t$8.TYPE}}t$8.TYPE="refunds";

class r$5 extends _$1{async list(e,t){return this.resources.list({type:r$5.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:r$5.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:r$5.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:r$5.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:r$5.TYPE,id:e},t);}async return(e,t,s){const i=e.id||e;return this.resources.fetch({type:"returns"},`return_line_items/${i}/return`,t,s)}async line_item(e,t,s){const i=e.id||e;return this.resources.fetch({type:"line_items"},`return_line_items/${i}/line_item`,t,s)}isReturnLineItem(e){return e.type&&e.type===r$5.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r$5.TYPE}:{id:e.id,type:r$5.TYPE}}type(){return r$5.TYPE}}r$5.TYPE="return_line_items";

class n extends _$1{async list(e,t){return this.resources.list({type:n.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:n.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:n.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:n.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:n.TYPE,id:e},t);}async order(e,t,s){const r=e.id||e;return this.resources.fetch({type:"orders"},`returns/${r}/order`,t,s)}async customer(e,t,s){const r=e.id||e;return this.resources.fetch({type:"customers"},`returns/${r}/customer`,t,s)}async stock_location(e,t,s){const r=e.id||e;return this.resources.fetch({type:"stock_locations"},`returns/${r}/stock_location`,t,s)}async origin_address(e,t,s){const r=e.id||e;return this.resources.fetch({type:"addresses"},`returns/${r}/origin_address`,t,s)}async destination_address(e,t,s){const r=e.id||e;return this.resources.fetch({type:"addresses"},`returns/${r}/destination_address`,t,s)}async return_line_items(e,t,s){const r=e.id||e;return this.resources.fetch({type:"return_line_items"},`returns/${r}/return_line_items`,t,s)}async attachments(e,t,s){const r=e.id||e;return this.resources.fetch({type:"attachments"},`returns/${r}/attachments`,t,s)}async events(e,t,s){const r=e.id||e;return this.resources.fetch({type:"events"},`returns/${r}/events`,t,s)}isReturn(e){return e.type&&e.type===n.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:n.TYPE}:{id:e.id,type:n.TYPE}}type(){return n.TYPE}}n.TYPE="returns";

class i extends _$1{async list(s,e){return this.resources.list({type:i.TYPE},s,e)}async retrieve(s,e,t){return this.resources.retrieve({type:i.TYPE,id:s},e,t)}async update(s,e,t){return this.resources.update(Object.assign(Object.assign({},s),{type:i.TYPE}),e,t)}async order(s,e,t){const r=s.id||s;return this.resources.fetch({type:"orders"},`shipments/${r}/order`,e,t)}async shipping_category(s,e,t){const r=s.id||s;return this.resources.fetch({type:"shipping_categories"},`shipments/${r}/shipping_category`,e,t)}async stock_location(s,e,t){const r=s.id||s;return this.resources.fetch({type:"stock_locations"},`shipments/${r}/stock_location`,e,t)}async origin_address(s,e,t){const r=s.id||s;return this.resources.fetch({type:"addresses"},`shipments/${r}/origin_address`,e,t)}async shipping_address(s,e,t){const r=s.id||s;return this.resources.fetch({type:"addresses"},`shipments/${r}/shipping_address`,e,t)}async shipping_method(s,e,t){const r=s.id||s;return this.resources.fetch({type:"shipping_methods"},`shipments/${r}/shipping_method`,e,t)}async delivery_lead_time(s,e,t){const r=s.id||s;return this.resources.fetch({type:"delivery_lead_times"},`shipments/${r}/delivery_lead_time`,e,t)}async stock_line_items(s,e,t){const r=s.id||s;return this.resources.fetch({type:"stock_line_items"},`shipments/${r}/stock_line_items`,e,t)}async stock_transfers(s,e,t){const r=s.id||s;return this.resources.fetch({type:"stock_transfers"},`shipments/${r}/stock_transfers`,e,t)}async available_shipping_methods(s,e,t){const r=s.id||s;return this.resources.fetch({type:"shipping_methods"},`shipments/${r}/available_shipping_methods`,e,t)}async carrier_accounts(s,e,t){const r=s.id||s;return this.resources.fetch({type:"carrier_accounts"},`shipments/${r}/carrier_accounts`,e,t)}async parcels(s,e,t){const r=s.id||s;return this.resources.fetch({type:"parcels"},`shipments/${r}/parcels`,e,t)}async attachments(s,e,t){const r=s.id||s;return this.resources.fetch({type:"attachments"},`shipments/${r}/attachments`,e,t)}async events(s,e,t){const r=s.id||s;return this.resources.fetch({type:"events"},`shipments/${r}/events`,e,t)}isShipment(s){return s.type&&s.type===i.TYPE}relationship(s){return s===null||typeof s=="string"?{id:s,type:i.TYPE}:{id:s.id,type:i.TYPE}}type(){return i.TYPE}}i.TYPE="shipments";

class s$9 extends _$1{async list(e,t){return this.resources.list({type:s$9.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$9.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$9.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$9.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$9.TYPE,id:e},t);}async skus(e,t,r){const i=e.id||e;return this.resources.fetch({type:"skus"},`shipping_categories/${i}/skus`,t,r)}async attachments(e,t,r){const i=e.id||e;return this.resources.fetch({type:"attachments"},`shipping_categories/${i}/attachments`,t,r)}isShippingCategory(e){return e.type&&e.type===s$9.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$9.TYPE}:{id:e.id,type:s$9.TYPE}}type(){return s$9.TYPE}}s$9.TYPE="shipping_categories";

class e$1 extends _$1{async list(t,s){return this.resources.list({type:e$1.TYPE},t,s)}async retrieve(t,s,i){return this.resources.retrieve({type:e$1.TYPE,id:t},s,i)}async shipping_method(t,s,i){const r=t.id||t;return this.resources.fetch({type:"shipping_methods"},`shipping_method_tiers/${r}/shipping_method`,s,i)}async attachments(t,s,i){const r=t.id||t;return this.resources.fetch({type:"attachments"},`shipping_method_tiers/${r}/attachments`,s,i)}isShippingMethodTier(t){return t.type&&t.type===e$1.TYPE}relationship(t){return t===null||typeof t=="string"?{id:t,type:e$1.TYPE}:{id:t.id,type:e$1.TYPE}}type(){return e$1.TYPE}}e$1.TYPE="shipping_method_tiers";

class r$4 extends _$1{async list(e,t){return this.resources.list({type:r$4.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:r$4.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:r$4.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:r$4.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:r$4.TYPE,id:e},t);}async market(e,t,s){const i=e.id||e;return this.resources.fetch({type:"markets"},`shipping_methods/${i}/market`,t,s)}async shipping_zone(e,t,s){const i=e.id||e;return this.resources.fetch({type:"shipping_zones"},`shipping_methods/${i}/shipping_zone`,t,s)}async shipping_category(e,t,s){const i=e.id||e;return this.resources.fetch({type:"shipping_categories"},`shipping_methods/${i}/shipping_category`,t,s)}async stock_location(e,t,s){const i=e.id||e;return this.resources.fetch({type:"stock_locations"},`shipping_methods/${i}/stock_location`,t,s)}async delivery_lead_time_for_shipment(e,t,s){const i=e.id||e;return this.resources.fetch({type:"delivery_lead_times"},`shipping_methods/${i}/delivery_lead_time_for_shipment`,t,s)}async shipping_method_tiers(e,t,s){const i=e.id||e;return this.resources.fetch({type:"shipping_method_tiers"},`shipping_methods/${i}/shipping_method_tiers`,t,s)}async shipping_weight_tiers(e,t,s){const i=e.id||e;return this.resources.fetch({type:"shipping_weight_tiers"},`shipping_methods/${i}/shipping_weight_tiers`,t,s)}async attachments(e,t,s){const i=e.id||e;return this.resources.fetch({type:"attachments"},`shipping_methods/${i}/attachments`,t,s)}isShippingMethod(e){return e.type&&e.type===r$4.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r$4.TYPE}:{id:e.id,type:r$4.TYPE}}type(){return r$4.TYPE}}r$4.TYPE="shipping_methods";

class s$8 extends _$1{async list(e,t){return this.resources.list({type:s$8.TYPE},e,t)}async create(e,t,i){return this.resources.create(Object.assign(Object.assign({},e),{type:s$8.TYPE}),t,i)}async retrieve(e,t,i){return this.resources.retrieve({type:s$8.TYPE,id:e},t,i)}async update(e,t,i){return this.resources.update(Object.assign(Object.assign({},e),{type:s$8.TYPE}),t,i)}async delete(e,t){await this.resources.delete({type:s$8.TYPE,id:e},t);}async shipping_method(e,t,i){const r=e.id||e;return this.resources.fetch({type:"shipping_methods"},`shipping_weight_tiers/${r}/shipping_method`,t,i)}async attachments(e,t,i){const r=e.id||e;return this.resources.fetch({type:"attachments"},`shipping_weight_tiers/${r}/attachments`,t,i)}isShippingWeightTier(e){return e.type&&e.type===s$8.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$8.TYPE}:{id:e.id,type:s$8.TYPE}}type(){return s$8.TYPE}}s$8.TYPE="shipping_weight_tiers";

class t$7 extends _$1{async list(e,s){return this.resources.list({type:t$7.TYPE},e,s)}async create(e,s,r){return this.resources.create(Object.assign(Object.assign({},e),{type:t$7.TYPE}),s,r)}async retrieve(e,s,r){return this.resources.retrieve({type:t$7.TYPE,id:e},s,r)}async update(e,s,r){return this.resources.update(Object.assign(Object.assign({},e),{type:t$7.TYPE}),s,r)}async delete(e,s){await this.resources.delete({type:t$7.TYPE,id:e},s);}async attachments(e,s,r){const i=e.id||e;return this.resources.fetch({type:"attachments"},`shipping_zones/${i}/attachments`,s,r)}isShippingZone(e){return e.type&&e.type===t$7.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$7.TYPE}:{id:e.id,type:t$7.TYPE}}type(){return t$7.TYPE}}t$7.TYPE="shipping_zones";

class t$6 extends _$1{async list(e,s){return this.resources.list({type:t$6.TYPE},e,s)}async create(e,s,r){return this.resources.create(Object.assign(Object.assign({},e),{type:t$6.TYPE}),s,r)}async retrieve(e,s,r){return this.resources.retrieve({type:t$6.TYPE,id:e},s,r)}async update(e,s,r){return this.resources.update(Object.assign(Object.assign({},e),{type:t$6.TYPE}),s,r)}async delete(e,s){await this.resources.delete({type:t$6.TYPE,id:e},s);}async sku_list(e,s,r){const i=e.id||e;return this.resources.fetch({type:"sku_lists"},`sku_list_items/${i}/sku_list`,s,r)}async sku(e,s,r){const i=e.id||e;return this.resources.fetch({type:"skus"},`sku_list_items/${i}/sku`,s,r)}isSkuListItem(e){return e.type&&e.type===t$6.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$6.TYPE}:{id:e.id,type:t$6.TYPE}}type(){return t$6.TYPE}}t$6.TYPE="sku_list_items";

class t$5 extends _$1{async list(e,s){return this.resources.list({type:t$5.TYPE},e,s)}async create(e,s,r){return this.resources.create(Object.assign(Object.assign({},e),{type:t$5.TYPE}),s,r)}async retrieve(e,s,r){return this.resources.retrieve({type:t$5.TYPE,id:e},s,r)}async update(e,s,r){return this.resources.update(Object.assign(Object.assign({},e),{type:t$5.TYPE}),s,r)}async delete(e,s){await this.resources.delete({type:t$5.TYPE,id:e},s);}async sku_list(e,s,r){const i=e.id||e;return this.resources.fetch({type:"sku_lists"},`sku_list_promotion_rules/${i}/sku_list`,s,r)}async skus(e,s,r){const i=e.id||e;return this.resources.fetch({type:"skus"},`sku_list_promotion_rules/${i}/skus`,s,r)}isSkuListPromotionRule(e){return e.type&&e.type===t$5.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$5.TYPE}:{id:e.id,type:t$5.TYPE}}type(){return t$5.TYPE}}t$5.TYPE="sku_list_promotion_rules";

class t$4 extends _$1{async list(e,s){return this.resources.list({type:t$4.TYPE},e,s)}async create(e,s,r){return this.resources.create(Object.assign(Object.assign({},e),{type:t$4.TYPE}),s,r)}async retrieve(e,s,r){return this.resources.retrieve({type:t$4.TYPE,id:e},s,r)}async update(e,s,r){return this.resources.update(Object.assign(Object.assign({},e),{type:t$4.TYPE}),s,r)}async delete(e,s){await this.resources.delete({type:t$4.TYPE,id:e},s);}async skus(e,s,r){const i=e.id||e;return this.resources.fetch({type:"skus"},`sku_lists/${i}/skus`,s,r)}async sku_list_items(e,s,r){const i=e.id||e;return this.resources.fetch({type:"sku_list_items"},`sku_lists/${i}/sku_list_items`,s,r)}async bundles(e,s,r){const i=e.id||e;return this.resources.fetch({type:"bundles"},`sku_lists/${i}/bundles`,s,r)}isSkuList(e){return e.type&&e.type===t$4.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$4.TYPE}:{id:e.id,type:t$4.TYPE}}type(){return t$4.TYPE}}t$4.TYPE="sku_lists";

class s$7 extends _$1{async list(e,t){return this.resources.list({type:s$7.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$7.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$7.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$7.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$7.TYPE,id:e},t);}async market(e,t,r){const i=e.id||e;return this.resources.fetch({type:"markets"},`sku_options/${i}/market`,t,r)}async attachments(e,t,r){const i=e.id||e;return this.resources.fetch({type:"attachments"},`sku_options/${i}/attachments`,t,r)}isSkuOption(e){return e.type&&e.type===s$7.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$7.TYPE}:{id:e.id,type:s$7.TYPE}}type(){return s$7.TYPE}}s$7.TYPE="sku_options";

class r$3 extends _$1{async list(e,t){return this.resources.list({type:r$3.TYPE},e,t)}async create(e,t,s){return this.resources.create(Object.assign(Object.assign({},e),{type:r$3.TYPE}),t,s)}async retrieve(e,t,s){return this.resources.retrieve({type:r$3.TYPE,id:e},t,s)}async update(e,t,s){return this.resources.update(Object.assign(Object.assign({},e),{type:r$3.TYPE}),t,s)}async delete(e,t){await this.resources.delete({type:r$3.TYPE,id:e},t);}async shipping_category(e,t,s){const c=e.id||e;return this.resources.fetch({type:"shipping_categories"},`skus/${c}/shipping_category`,t,s)}async prices(e,t,s){const c=e.id||e;return this.resources.fetch({type:"prices"},`skus/${c}/prices`,t,s)}async stock_items(e,t,s){const c=e.id||e;return this.resources.fetch({type:"stock_items"},`skus/${c}/stock_items`,t,s)}async delivery_lead_times(e,t,s){const c=e.id||e;return this.resources.fetch({type:"delivery_lead_times"},`skus/${c}/delivery_lead_times`,t,s)}async sku_options(e,t,s){const c=e.id||e;return this.resources.fetch({type:"sku_options"},`skus/${c}/sku_options`,t,s)}async attachments(e,t,s){const c=e.id||e;return this.resources.fetch({type:"attachments"},`skus/${c}/attachments`,t,s)}isSku(e){return e.type&&e.type===r$3.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r$3.TYPE}:{id:e.id,type:r$3.TYPE}}type(){return r$3.TYPE}}r$3.TYPE="skus";

class s$6 extends _$1{async list(e,t){return this.resources.list({type:s$6.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$6.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$6.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$6.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$6.TYPE,id:e},t);}async stock_location(e,t,r){const c=e.id||e;return this.resources.fetch({type:"stock_locations"},`stock_items/${c}/stock_location`,t,r)}async sku(e,t,r){const c=e.id||e;return this.resources.fetch({type:"skus"},`stock_items/${c}/sku`,t,r)}async attachments(e,t,r){const c=e.id||e;return this.resources.fetch({type:"attachments"},`stock_items/${c}/attachments`,t,r)}isStockItem(e){return e.type&&e.type===s$6.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$6.TYPE}:{id:e.id,type:s$6.TYPE}}type(){return s$6.TYPE}}s$6.TYPE="stock_items";

class s$5 extends _$1{async list(e,t){return this.resources.list({type:s$5.TYPE},e,t)}async retrieve(e,t,r){return this.resources.retrieve({type:s$5.TYPE,id:e},t,r)}async shipment(e,t,r){const i=e.id||e;return this.resources.fetch({type:"shipments"},`stock_line_items/${i}/shipment`,t,r)}async line_item(e,t,r){const i=e.id||e;return this.resources.fetch({type:"line_items"},`stock_line_items/${i}/line_item`,t,r)}async stock_item(e,t,r){const i=e.id||e;return this.resources.fetch({type:"stock_items"},`stock_line_items/${i}/stock_item`,t,r)}isStockLineItem(e){return e.type&&e.type===s$5.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$5.TYPE}:{id:e.id,type:s$5.TYPE}}type(){return s$5.TYPE}}s$5.TYPE="stock_line_items";

class c extends _$1{async list(t,s){return this.resources.list({type:c.TYPE},t,s)}async create(t,s,e){return this.resources.create(Object.assign(Object.assign({},t),{type:c.TYPE}),s,e)}async retrieve(t,s,e){return this.resources.retrieve({type:c.TYPE,id:t},s,e)}async update(t,s,e){return this.resources.update(Object.assign(Object.assign({},t),{type:c.TYPE}),s,e)}async delete(t,s){await this.resources.delete({type:c.TYPE,id:t},s);}async address(t,s,e){const r=t.id||t;return this.resources.fetch({type:"addresses"},`stock_locations/${r}/address`,s,e)}async inventory_stock_locations(t,s,e){const r=t.id||t;return this.resources.fetch({type:"inventory_stock_locations"},`stock_locations/${r}/inventory_stock_locations`,s,e)}async inventory_return_locations(t,s,e){const r=t.id||t;return this.resources.fetch({type:"inventory_return_locations"},`stock_locations/${r}/inventory_return_locations`,s,e)}async stock_items(t,s,e){const r=t.id||t;return this.resources.fetch({type:"stock_items"},`stock_locations/${r}/stock_items`,s,e)}async stock_transfers(t,s,e){const r=t.id||t;return this.resources.fetch({type:"stock_transfers"},`stock_locations/${r}/stock_transfers`,s,e)}async attachments(t,s,e){const r=t.id||t;return this.resources.fetch({type:"attachments"},`stock_locations/${r}/attachments`,s,e)}isStockLocation(t){return t.type&&t.type===c.TYPE}relationship(t){return t===null||typeof t=="string"?{id:t,type:c.TYPE}:{id:t.id,type:c.TYPE}}type(){return c.TYPE}}c.TYPE="stock_locations";

class r$2 extends _$1{async list(t,s){return this.resources.list({type:r$2.TYPE},t,s)}async create(t,s,e){return this.resources.create(Object.assign(Object.assign({},t),{type:r$2.TYPE}),s,e)}async retrieve(t,s,e){return this.resources.retrieve({type:r$2.TYPE,id:t},s,e)}async update(t,s,e){return this.resources.update(Object.assign(Object.assign({},t),{type:r$2.TYPE}),s,e)}async delete(t,s){await this.resources.delete({type:r$2.TYPE,id:t},s);}async sku(t,s,e){const c=t.id||t;return this.resources.fetch({type:"skus"},`stock_transfers/${c}/sku`,s,e)}async origin_stock_location(t,s,e){const c=t.id||t;return this.resources.fetch({type:"stock_locations"},`stock_transfers/${c}/origin_stock_location`,s,e)}async destination_stock_location(t,s,e){const c=t.id||t;return this.resources.fetch({type:"stock_locations"},`stock_transfers/${c}/destination_stock_location`,s,e)}async shipment(t,s,e){const c=t.id||t;return this.resources.fetch({type:"shipments"},`stock_transfers/${c}/shipment`,s,e)}async line_item(t,s,e){const c=t.id||t;return this.resources.fetch({type:"line_items"},`stock_transfers/${c}/line_item`,s,e)}async events(t,s,e){const c=t.id||t;return this.resources.fetch({type:"events"},`stock_transfers/${c}/events`,s,e)}isStockTransfer(t){return t.type&&t.type===r$2.TYPE}relationship(t){return t===null||typeof t=="string"?{id:t,type:r$2.TYPE}:{id:t.id,type:r$2.TYPE}}type(){return r$2.TYPE}}r$2.TYPE="stock_transfers";

class s$4 extends _$1{async list(e,t){return this.resources.list({type:s$4.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$4.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$4.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$4.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$4.TYPE,id:e},t);}async payment_methods(e,t,r){const i=e.id||e;return this.resources.fetch({type:"payment_methods"},`stripe_gateways/${i}/payment_methods`,t,r)}async stripe_payments(e,t,r){const i=e.id||e;return this.resources.fetch({type:"stripe_payments"},`stripe_gateways/${i}/stripe_payments`,t,r)}isStripeGateway(e){return e.type&&e.type===s$4.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$4.TYPE}:{id:e.id,type:s$4.TYPE}}type(){return s$4.TYPE}}s$4.TYPE="stripe_gateways";

class s$3 extends _$1{async list(e,t){return this.resources.list({type:s$3.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$3.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$3.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$3.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$3.TYPE,id:e},t);}async order(e,t,r){const a=e.id||e;return this.resources.fetch({type:"orders"},`stripe_payments/${a}/order`,t,r)}async payment_gateway(e,t,r){const a=e.id||e;return this.resources.fetch({type:"payment_gateways"},`stripe_payments/${a}/payment_gateway`,t,r)}isStripePayment(e){return e.type&&e.type===s$3.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$3.TYPE}:{id:e.id,type:s$3.TYPE}}type(){return s$3.TYPE}}s$3.TYPE="stripe_payments";

class r$1 extends _$1{async list(t,e){return this.resources.list({type:r$1.TYPE},t,e)}async retrieve(t,e,a){return this.resources.retrieve({type:r$1.TYPE,id:t},e,a)}async tax_categories(t,e,a){const s=t.id||t;return this.resources.fetch({type:"tax_categories"},`tax_calculators/${s}/tax_categories`,e,a)}async markets(t,e,a){const s=t.id||t;return this.resources.fetch({type:"markets"},`tax_calculators/${s}/markets`,e,a)}async attachments(t,e,a){const s=t.id||t;return this.resources.fetch({type:"attachments"},`tax_calculators/${s}/attachments`,e,a)}isTaxCalculator(t){return t.type&&t.type===r$1.TYPE}relationship(t){return t===null||typeof t=="string"?{id:t,type:r$1.TYPE}:{id:t.id,type:r$1.TYPE}}type(){return r$1.TYPE}}r$1.TYPE="tax_calculators";

class s$2 extends _$1{async list(e,t){return this.resources.list({type:s$2.TYPE},e,t)}async create(e,t,r){return this.resources.create(Object.assign(Object.assign({},e),{type:s$2.TYPE}),t,r)}async retrieve(e,t,r){return this.resources.retrieve({type:s$2.TYPE,id:e},t,r)}async update(e,t,r){return this.resources.update(Object.assign(Object.assign({},e),{type:s$2.TYPE}),t,r)}async delete(e,t){await this.resources.delete({type:s$2.TYPE,id:e},t);}async sku(e,t,r){const a=e.id||e;return this.resources.fetch({type:"skus"},`tax_categories/${a}/sku`,t,r)}async attachments(e,t,r){const a=e.id||e;return this.resources.fetch({type:"attachments"},`tax_categories/${a}/attachments`,t,r)}isTaxCategory(e){return e.type&&e.type===s$2.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$2.TYPE}:{id:e.id,type:s$2.TYPE}}type(){return s$2.TYPE}}s$2.TYPE="tax_categories";

class t$3 extends _$1{async list(e,s){return this.resources.list({type:t$3.TYPE},e,s)}async create(e,s,r){return this.resources.create(Object.assign(Object.assign({},e),{type:t$3.TYPE}),s,r)}async retrieve(e,s,r){return this.resources.retrieve({type:t$3.TYPE,id:e},s,r)}async update(e,s,r){return this.resources.update(Object.assign(Object.assign({},e),{type:t$3.TYPE}),s,r)}async delete(e,s){await this.resources.delete({type:t$3.TYPE,id:e},s);}async manual_tax_calculator(e,s,r){const a=e.id||e;return this.resources.fetch({type:"manual_tax_calculators"},`tax_rules/${a}/manual_tax_calculator`,s,r)}isTaxRule(e){return e.type&&e.type===t$3.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$3.TYPE}:{id:e.id,type:t$3.TYPE}}type(){return t$3.TYPE}}t$3.TYPE="tax_rules";

class s$1 extends _$1{async list(e,t){return this.resources.list({type:s$1.TYPE},e,t)}async create(e,t,a){return this.resources.create(Object.assign(Object.assign({},e),{type:s$1.TYPE}),t,a)}async retrieve(e,t,a){return this.resources.retrieve({type:s$1.TYPE,id:e},t,a)}async update(e,t,a){return this.resources.update(Object.assign(Object.assign({},e),{type:s$1.TYPE}),t,a)}async delete(e,t){await this.resources.delete({type:s$1.TYPE,id:e},t);}async tax_categories(e,t,a){const r=e.id||e;return this.resources.fetch({type:"tax_categories"},`taxjar_accounts/${r}/tax_categories`,t,a)}async markets(e,t,a){const r=e.id||e;return this.resources.fetch({type:"markets"},`taxjar_accounts/${r}/markets`,t,a)}async attachments(e,t,a){const r=e.id||e;return this.resources.fetch({type:"attachments"},`taxjar_accounts/${r}/attachments`,t,a)}isTaxjarAccount(e){return e.type&&e.type===s$1.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:s$1.TYPE}:{id:e.id,type:s$1.TYPE}}type(){return s$1.TYPE}}s$1.TYPE="taxjar_accounts";

class e extends _$1{async list(r,t){return this.resources.list({type:e.TYPE},r,t)}async retrieve(r,t,s){return this.resources.retrieve({type:e.TYPE,id:r},t,s)}async order(r,t,s){const i=r.id||r;return this.resources.fetch({type:"orders"},`transactions/${i}/order`,t,s)}isTransaction(r){return r.type&&r.type===e.TYPE}relationship(r){return r===null||typeof r=="string"?{id:r,type:e.TYPE}:{id:r.id,type:e.TYPE}}type(){return e.TYPE}}e.TYPE="transactions";

class r extends _$1{async list(e,t){return this.resources.list({type:r.TYPE},e,t)}async retrieve(e,t,s){return this.resources.retrieve({type:r.TYPE,id:e},t,s)}async order(e,t,s){const i=e.id||e;return this.resources.fetch({type:"orders"},`voids/${i}/order`,t,s)}async reference_authorization(e,t,s){const i=e.id||e;return this.resources.fetch({type:"authorizations"},`voids/${i}/reference_authorization`,t,s)}isVoid(e){return e.type&&e.type===r.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:r.TYPE}:{id:e.id,type:r.TYPE}}type(){return r.TYPE}}r.TYPE="voids";

class t$2 extends _$1{async list(e,s){return this.resources.list({type:t$2.TYPE},e,s)}async create(e,s,r){return this.resources.create(Object.assign(Object.assign({},e),{type:t$2.TYPE}),s,r)}async retrieve(e,s,r){return this.resources.retrieve({type:t$2.TYPE,id:e},s,r)}async update(e,s,r){return this.resources.update(Object.assign(Object.assign({},e),{type:t$2.TYPE}),s,r)}async delete(e,s){await this.resources.delete({type:t$2.TYPE,id:e},s);}async last_event_callbacks(e,s,r){const a=e.id||e;return this.resources.fetch({type:"event_callbacks"},`webhooks/${a}/last_event_callbacks`,s,r)}isWebhook(e){return e.type&&e.type===t$2.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$2.TYPE}:{id:e.id,type:t$2.TYPE}}type(){return t$2.TYPE}}t$2.TYPE="webhooks";

class t$1 extends _$1{async list(e,s){return this.resources.list({type:t$1.TYPE},e,s)}async create(e,s,r){return this.resources.create(Object.assign(Object.assign({},e),{type:t$1.TYPE}),s,r)}async retrieve(e,s,r){return this.resources.retrieve({type:t$1.TYPE,id:e},s,r)}async update(e,s,r){return this.resources.update(Object.assign(Object.assign({},e),{type:t$1.TYPE}),s,r)}async delete(e,s){await this.resources.delete({type:t$1.TYPE,id:e},s);}async order(e,s,r){const i=e.id||e;return this.resources.fetch({type:"orders"},`wire_transfers/${i}/order`,s,r)}isWireTransfer(e){return e.type&&e.type===t$1.TYPE}relationship(e){return e===null||typeof e=="string"?{id:e,type:t$1.TYPE}:{id:e.id,type:t$1.TYPE}}type(){return t$1.TYPE}}t$1.TYPE="wire_transfers";

const resourceList=["addresses","adjustments","adyen_gateways","adyen_payments","application","attachments","authorizations","avalara_accounts","billing_info_validation_rules","bing_geocoders","braintree_gateways","braintree_payments","bundles","captures","carrier_accounts","checkout_com_gateways","checkout_com_payments","coupon_codes_promotion_rules","coupon_recipients","coupons","customer_addresses","customer_groups","customer_password_resets","customer_payment_sources","customer_subscriptions","customers","delivery_lead_times","event_callbacks","events","exports","external_gateways","external_payments","external_promotions","external_tax_calculators","fixed_amount_promotions","fixed_price_promotions","free_gift_promotions","free_shipping_promotions","geocoders","gift_card_recipients","gift_cards","google_geocoders","imports","in_stock_subscriptions","inventory_models","inventory_return_locations","inventory_stock_locations","klarna_gateways","klarna_payments","line_item_options","line_items","manual_gateways","manual_tax_calculators","markets","merchants","order_amount_promotion_rules","order_copies","order_subscriptions","order_validation_rules","orders","organization","packages","parcel_line_items","parcels","payment_gateways","payment_methods","paypal_gateways","paypal_payments","percentage_discount_promotions","price_lists","price_tiers","price_volume_tiers","prices","promotion_rules","promotions","refunds","return_line_items","returns","shipments","shipping_categories","shipping_method_tiers","shipping_methods","shipping_weight_tiers","shipping_zones","sku_list_items","sku_list_promotion_rules","sku_lists","sku_options","skus","stock_items","stock_line_items","stock_locations","stock_transfers","stripe_gateways","stripe_payments","tax_calculators","tax_categories","tax_rules","taxjar_accounts","transactions","voids","webhooks","wire_transfers"];

const CommerceLayerStatic={resources:()=>resourceList,isSdkError:r=>s$G.isSdkError(r),isApiError:r=>t$v.isApiError(r),init:r=>d(r)};

var f=undefined&&undefined.__classPrivateFieldSet||function(r,i,n,o,a){if(o==="m")throw new TypeError("Private method is not writable");if(o==="a"&&!a)throw new TypeError("Private accessor was defined without a setter");if(typeof i=="function"?r!==i||!a:!i.has(r))throw new TypeError("Cannot write private member to an object whose class did not declare it");return o==="a"?a.call(r,n):a?a.value=n:i.set(r,n),n},s=undefined&&undefined.__classPrivateFieldGet||function(r,i,n,o){if(n==="a"&&!o)throw new TypeError("Private accessor was defined without a getter");if(typeof i=="function"?r!==i||!o:!i.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return n==="m"?o:n==="a"?o.call(r):o?o.value:i.get(r)},t,h;const p=n$2("commercelayer"),u="3.0.0";class _{constructor(i$1){this.openApiSchemaVersion=u,t.set(this,void 0),h.set(this,void 0),p("new commercelayer instance %O",i$1),f(this,t,new C(i$1),"f"),f(this,h,i$1.organization,"f"),this.addresses=new t$t(s(this,t,"f")),this.adjustments=new s$F(s(this,t,"f")),this.adyen_gateways=new s$E(s(this,t,"f")),this.adyen_payments=new r$i(s(this,t,"f")),this.application=new e$4(s(this,t,"f")),this.attachments=new t$s(s(this,t,"f")),this.authorizations=new t$r(s(this,t,"f")),this.avalara_accounts=new s$D(s(this,t,"f")),this.billing_info_validation_rules=new t$q(s(this,t,"f")),this.bing_geocoders=new s$C(s(this,t,"f")),this.braintree_gateways=new s$B(s(this,t,"f")),this.braintree_payments=new s$A(s(this,t,"f")),this.bundles=new r$h(s(this,t,"f")),this.captures=new t$p(s(this,t,"f")),this.carrier_accounts=new e$3(s(this,t,"f")),this.checkout_com_gateways=new s$z(s(this,t,"f")),this.checkout_com_payments=new r$g(s(this,t,"f")),this.coupon_codes_promotion_rules=new t$o(s(this,t,"f")),this.coupon_recipients=new r$f(s(this,t,"f")),this.coupons=new t$n(s(this,t,"f")),this.customer_addresses=new r$e(s(this,t,"f")),this.customer_groups=new s$y(s(this,t,"f")),this.customer_password_resets=new t$m(s(this,t,"f")),this.customer_payment_sources=new t$l(s(this,t,"f")),this.customer_subscriptions=new s$x(s(this,t,"f")),this.customers=new c$3(s(this,t,"f")),this.delivery_lead_times=new s$w(s(this,t,"f")),this.event_callbacks=new t$k(s(this,t,"f")),this.events=new t$j(s(this,t,"f")),this.exports=new t$i(s(this,t,"f")),this.external_gateways=new s$v(s(this,t,"f")),this.external_payments=new s$u(s(this,t,"f")),this.external_promotions=new s$t(s(this,t,"f")),this.external_tax_calculators=new s$s(s(this,t,"f")),this.fixed_amount_promotions=new s$r(s(this,t,"f")),this.fixed_price_promotions=new o$2(s(this,t,"f")),this.free_gift_promotions=new o$1(s(this,t,"f")),this.free_shipping_promotions=new s$q(s(this,t,"f")),this.geocoders=new t$h(s(this,t,"f")),this.gift_card_recipients=new s$p(s(this,t,"f")),this.gift_cards=new r$d(s(this,t,"f")),this.google_geocoders=new s$o(s(this,t,"f")),this.imports=new t$g(s(this,t,"f")),this.in_stock_subscriptions=new r$c(s(this,t,"f")),this.inventory_models=new s$n(s(this,t,"f")),this.inventory_return_locations=new s$m(s(this,t,"f")),this.inventory_stock_locations=new s$l(s(this,t,"f")),this.klarna_gateways=new s$k(s(this,t,"f")),this.klarna_payments=new r$b(s(this,t,"f")),this.line_item_options=new s$j(s(this,t,"f")),this.line_items=new r$a(s(this,t,"f")),this.manual_gateways=new t$f(s(this,t,"f")),this.manual_tax_calculators=new r$9(s(this,t,"f")),this.markets=new r$8(s(this,t,"f")),this.merchants=new s$i(s(this,t,"f")),this.order_amount_promotion_rules=new t$e(s(this,t,"f")),this.order_copies=new s$h(s(this,t,"f")),this.order_subscriptions=new t$d(s(this,t,"f")),this.order_validation_rules=new t$c(s(this,t,"f")),this.orders=new c$2(s(this,t,"f")),this.organization=new e$2(s(this,t,"f")),this.packages=new s$g(s(this,t,"f")),this.parcel_line_items=new s$f(s(this,t,"f")),this.parcels=new c$1(s(this,t,"f")),this.payment_gateways=new t$b(s(this,t,"f")),this.payment_methods=new s$e(s(this,t,"f")),this.paypal_gateways=new s$d(s(this,t,"f")),this.paypal_payments=new r$7(s(this,t,"f")),this.percentage_discount_promotions=new o(s(this,t,"f")),this.price_lists=new s$c(s(this,t,"f")),this.price_tiers=new t$a(s(this,t,"f")),this.price_volume_tiers=new s$b(s(this,t,"f")),this.prices=new r$6(s(this,t,"f")),this.promotion_rules=new t$9(s(this,t,"f")),this.promotions=new s$a(s(this,t,"f")),this.refunds=new t$8(s(this,t,"f")),this.return_line_items=new r$5(s(this,t,"f")),this.returns=new n(s(this,t,"f")),this.shipments=new i(s(this,t,"f")),this.shipping_categories=new s$9(s(this,t,"f")),this.shipping_method_tiers=new e$1(s(this,t,"f")),this.shipping_methods=new r$4(s(this,t,"f")),this.shipping_weight_tiers=new s$8(s(this,t,"f")),this.shipping_zones=new t$7(s(this,t,"f")),this.sku_list_items=new t$6(s(this,t,"f")),this.sku_list_promotion_rules=new t$5(s(this,t,"f")),this.sku_lists=new t$4(s(this,t,"f")),this.sku_options=new s$7(s(this,t,"f")),this.skus=new r$3(s(this,t,"f")),this.stock_items=new s$6(s(this,t,"f")),this.stock_line_items=new s$5(s(this,t,"f")),this.stock_locations=new c(s(this,t,"f")),this.stock_transfers=new r$2(s(this,t,"f")),this.stripe_gateways=new s$4(s(this,t,"f")),this.stripe_payments=new s$3(s(this,t,"f")),this.tax_calculators=new r$1(s(this,t,"f")),this.tax_categories=new s$2(s(this,t,"f")),this.tax_rules=new t$3(s(this,t,"f")),this.taxjar_accounts=new s$1(s(this,t,"f")),this.transactions=new e(s(this,t,"f")),this.voids=new r(s(this,t,"f")),this.webhooks=new t$2(s(this,t,"f")),this.wire_transfers=new t$1(s(this,t,"f"));}static get openApiSchemaVersion(){return u}get currentOrganization(){return s(this,h,"f")}localConfig(i){i.organization&&f(this,h,i.organization,"f");}config(i){p("config %o",i),this.localConfig(i),i.organization||(i.organization=this.currentOrganization),s(this,t,"f").config(i);}resources(){return CommerceLayerStatic.resources()}isApiError(i){return CommerceLayerStatic.isApiError(i)}addRequestInterceptor(i,n){return s(this,t,"f").interceptors.request.use(i,n)}addResponseInterceptor(i,n){return s(this,t,"f").interceptors.response.use(i,n)}removeInterceptor(i,n){return s(this,t,"f").interceptors[i].eject(n)}addRawResponseReader(i){const n={id:void 0,rawResponse:void 0,headers:void 0};function o(c){return n.rawResponse=c?.data,i?.headers&&(n.headers=c.headers),c}const a=this.addResponseInterceptor(o);return n.id=a,n}removeRawResponseReader(i){const n=typeof i=="number"?i:i?.id;if(n&&n>=0)return this.removeInterceptor("response",n)}}t=new WeakMap,h=new WeakMap;const d=r=>new _(r);

var js_cookie = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  module.exports = factory() ;
}(commonjsGlobal, (function () {
  /* eslint-disable no-var */
  function assign (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target
  }
  /* eslint-enable no-var */

  /* eslint-disable no-var */
  var defaultConverter = {
    read: function (value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
    },
    write: function (value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      )
    }
  };
  /* eslint-enable no-var */

  /* eslint-disable no-var */

  function init (converter, defaultAttributes) {
    function set (key, value, attributes) {
      if (typeof document === 'undefined') {
        return
      }

      attributes = assign({}, defaultAttributes, attributes);

      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }

      key = encodeURIComponent(key)
        .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
        .replace(/[()]/g, escape);

      var stringifiedAttributes = '';
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue
        }

        stringifiedAttributes += '; ' + attributeName;

        if (attributes[attributeName] === true) {
          continue
        }

        // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...
        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }

      return (document.cookie =
        key + '=' + converter.write(value, key) + stringifiedAttributes)
    }

    function get (key) {
      if (typeof document === 'undefined' || (arguments.length && !key)) {
        return
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var value = parts.slice(1).join('=');

        try {
          var foundKey = decodeURIComponent(parts[0]);
          jar[foundKey] = converter.read(value, foundKey);

          if (key === foundKey) {
            break
          }
        } catch (e) {}
      }

      return key ? jar[key] : jar
    }

    return Object.create(
      {
        set: set,
        get: get,
        remove: function (key, attributes) {
          set(
            key,
            '',
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function (attributes) {
          return init(this.converter, assign({}, this.attributes, attributes))
        },
        withConverter: function (converter) {
          return init(assign({}, this.converter, converter), this.attributes)
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    )
  }

  var api = init(defaultConverter, { path: '/' });
  /* eslint-enable no-var */

  return api;

})));
});

const getAccessToken = memoize(async function (clientCredentials) {
  const name = getKeyForAccessToken(clientCredentials);
  const value = js_cookie.get(name);
  if (value !== undefined) {
    return value;
  }
  const salesChannelToken = await getSalesChannelToken(clientCredentials);
  if (salesChannelToken == null) {
    // TODO: define a proper error message
    throw new Error('Cannot get a token');
  }
  const { accessToken, expires } = salesChannelToken;
  js_cookie.set(getKeyForAccessToken(clientCredentials), accessToken, {
    expires
  });
  return accessToken;
});
async function createClient(clientCredentials) {
  var _a;
  const accessToken = await getAccessToken(clientCredentials);
  const { hostname } = new URL(clientCredentials.endpoint);
  const [, organization, domain] = (_a = hostname.match(/^(.*).(commercelayer.(co|io))$/)) !== null && _a !== void 0 ? _a : [];
  if (organization === undefined) {
    // TODO: define a proper error message
    throw new Error('Organization is missing');
  }
  return d({ accessToken, organization, domain });
}

// TODO: update all error messages with a proper link to documentation
function getConfig() {
  var _a;
  if (!('commercelayerConfig' in window)) {
    throw new Error(`"window.commercelayerConfig" is required.\nLink to doc here.`);
  }
  // @ts-expect-error
  const commercelayerConfig = window.commercelayerConfig;
  if (typeof commercelayerConfig.clientId !== 'string') {
    throw new Error(`"window.commercelayerConfig.clientId" is required.\nLink to doc here.`);
  }
  if (typeof commercelayerConfig.slug !== 'string') {
    throw new Error(`"window.commercelayerConfig.slug" is required.\nLink to doc here.`);
  }
  if (typeof commercelayerConfig.scope !== 'string') {
    throw new Error(`"window.commercelayerConfig.scope" is required.\nLink to doc here.`);
  }
  if (![undefined, 'none', 'all'].includes(commercelayerConfig.debug)) {
    throw new Error(`"window.commercelayerConfig.debug" should one of 'none' (default) or 'all'.\nLink to doc here.`);
  }
  const debug = (_a = commercelayerConfig.debug) !== null && _a !== void 0 ? _a : 'none';
  const endpoint = `https://${commercelayerConfig.slug}.commercelayer.io`;
  return Object.assign(Object.assign({}, commercelayerConfig), { debug,
    endpoint });
}

const log = (type, ...message) => {
  const { debug } = getConfig();
  if (debug === 'all') {
    console[type](...message);
  }
};

export { createClient as a, getKeyForCart as b, chunk as c, getAccessToken as d, getConfig as g, isNotNullish as i, js_cookie as j, log as l, uniq as u };
