/**
 * airloy v0.9.2
 * (c) 2016 Layman
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('md5'), require('base-64')) :
  typeof define === 'function' && define.amd ? define(['exports', 'md5', 'base-64'], factory) :
  (factory((global.airloy = global.airloy || {}),global.md5,global.base64));
}(this, (function (exports,md5,base64) { 'use strict';

md5 = 'default' in md5 ? md5['default'] : md5;
base64 = 'default' in base64 ? base64['default'] : base64;

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var Config = function Config() {
  classCallCheck(this, Config);

  this.server = 'api.asfun.cn';
  this.useHttps = false;
  this.apiVersion = 'v1';
  this.appKey = 'Delight';
  this.appSecret = 'test';
};

var Device = function () {
  function Device(args) {
    classCallCheck(this, Device);

    this._identifier = null;
  }

  createClass(Device, [{
    key: 'getIdentifier',
    value: function getIdentifier() {
      console.error('[airloy] please init Device instance first.');
      return this._identifier;
    }
  }]);
  return Device;
}();

function __async(g) {
  return new Promise(function (s, j) {
    function c(a, x) {
      try {
        var r = g[x ? "throw" : "next"](a);
      } catch (e) {
        j(e);return;
      }r.done ? s(r.value) : Promise.resolve(r.value).then(c, d);
    }function d(e) {
      c(e, 1);
    }c();
  });
}

var Store = function () {
  function Store() {
    classCallCheck(this, Store);
  }

  createClass(Store, [{
    key: 'getItem',
    value: function getItem(key) {return __async(function*(){
      console.error('[airloy] please init Store instance first.');
      return key;
    }())}
  }, {
    key: 'setItem',
    value: function setItem(key, value) {
      console.error('[airloy] please init Store instance first.');
    }
  }]);
  return Store;
}();

var Event = function () {
  function Event() {
    classCallCheck(this, Event);

    this.authRequiredEvent = 'airloy:login';
    this.logoutEvent = 'airloy:logout';
  }

  createClass(Event, [{
    key: 'on',
    value: function on(event, handler) {
      console.error('[airloy] please init Event instance first.');
    }
  }, {
    key: 'once',
    value: function once(event, handler) {
      console.error('[airloy] please init Event instance first.');
    }
  }, {
    key: 'off',
    value: function off() {
      for (var _len = arguments.length, events = Array(_len), _key = 0; _key < _len; _key++) {
        events[_key] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var event = _step.value;

          this._off(event);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: '_off',
    value: function _off(event) {
      console.error('[airloy] please init Event instance first.');
    }
  }, {
    key: 'emit',
    value: function emit(event) {
      console.error('[airloy] please init Event instance first.');
    }
  }]);
  return Event;
}();

var _auth = '';

var Auth = function () {
  function Auth(args) {
    classCallCheck(this, Auth);

    this._airloy = args.airloy;
    this._passport = '11111111-1111-1111-1111-111111111111';
    this._session = '00000000-1111-1111-1111-111111111111';
    this._address = '127.0.0.1';
    this._logined = false;
    this._loginTime = 0;
    this.user = {};
  }

  createClass(Auth, [{
    key: 'setup',
    value: function setup() {return __async(function*(){
      this._logined = '1' === ((yield this._airloy.store.getItem('airloy.user.login.flag')));
      if (this._logined) {
        this._loginTime = yield this._airloy.store.getItem('airloy.user.login.time');
        this._passport = yield this._airloy.store.getItem('airloy.user.passport');
        _auth = this._makeAuth();
        console.debug('[airloy] restore auth = ' + _auth);
        var str = ((yield this._airloy.store.getItem('airloy.user.info'))) || '{}';
        console.debug('[airloy] restore user = ' + str);
        this.user = JSON.parse(str);
      }
      return this._logined;
    }.call(this))}
  }, {
    key: 'formUser',
    value: function formUser(account, password) {
      this._loginTime = new Date().getTime();
      return {
        account: account,
        password: password,
        device: this._airloy.device.getIdentifier(),
        loginTime: this._loginTime
      };
    }
  }, {
    key: 'saveUser',
    value: function saveUser(newUser) {
      this._savePassport(newUser.passport);
      console.debug('[Airloy] get new passport = ' + this._passport);
      _auth = this._makeAuth();
      this.user = newUser;
      this._logined = true;
      this._airloy.store.setItem('airloy.user.login.time', '' + this._loginTime);
      this._airloy.store.setItem('airloy.user.info', JSON.stringify(this.user));
      this._airloy.store.setItem('airloy.user.login.flag', '1');
      return this.user;
    }
  }, {
    key: 'updateUser',
    value: function updateUser(user) {return __async(function*(){
      this.user = user;
      this._airloy.store.setItem('airloy.user.info', JSON.stringify(this.user));
    }.call(this))}
  }, {
    key: 'getUser',
    value: function getUser() {
      return this.user;
    }
  }, {
    key: 'authRequest',
    value: function authRequest(request) {
      request.headers.set('X-Airloy-Api', this._airloy.config.apiVersion);
      request.headers.set('X-Airloy-App', this._airloy.config.appKey);
      request.headers.set('X-Airloy-Auth', _auth);
      this._session && request.headers.set('X-Airloy-Token', this._session);
    }
  }, {
    key: 'updateAuth',
    value: function updateAuth(session, address, passport) {
      console.debug('[airloy] update new session = ' + session + ', address = ' + address + ', passport = ' + passport);
      session && (this._session = session);
      address && (this._address = address);
      passport && this._savePassport(passport);
      _auth = this._makeAuth();
    }
  }, {
    key: 'revokeAuth',
    value: function revokeAuth() {
      console.debug('[airloy] revoke passport = ' + this._passport);
      this._savePassport('');
      this._airloy.store.setItem('airloy.user.login.flag', '0');
      this._airloy.store.setItem('airloy.user.info', '{}');
      this.user = {};
      this._logined = false;
    }
  }, {
    key: 'logined',
    value: function logined() {
      return this._logined;
    }
  }, {
    key: 'logout',
    value: function logout() {
      this.revokeAuth();
      this._airloy.event.emit(this._airloy.event.logoutEvent);
    }
  }, {
    key: '_savePassport',
    value: function _savePassport(passport) {
      this._passport = passport;
      this._airloy.store.setItem('airloy.user.passport', this._passport);
    }
  }, {
    key: '_makeAuth',
    value: function _makeAuth() {
      console.error('[airloy] please init Auth instance first.');
    }
  }]);
  return Auth;
}();

function rc4(str, key) {
  var s = [],
      k = [],
      i = 0,
      j = 0,
      x,
      res = "";
  for (i = 0; i < 256; i++) {
    s[i] = i;
    k[i] = key.charCodeAt(i % key.length);
  }
  for (i = 0; i < 256; i++) {
    j = (j + s[i] + k[i]) % 256;
    x = s[i];
    s[i] = s[j];
    s[j] = x;
  }
  i = 0;
  j = 0;
  for (var y = 0; y < str.length; y++) {
    i = (i + 1) % 256;
    j = (j + s[i]) % 256;
    x = s[i];
    s[i] = s[j];
    s[j] = x;
    res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
  }
  return res;
}

var Rc4Auth = function (_Auth) {
  inherits(Rc4Auth, _Auth);

  function Rc4Auth() {
    classCallCheck(this, Rc4Auth);
    return possibleConstructorReturn(this, (Rc4Auth.__proto__ || Object.getPrototypeOf(Rc4Auth)).apply(this, arguments));
  }

  createClass(Rc4Auth, [{
    key: '_makeAuth',
    value: function _makeAuth() {
      var str = this._address + '`' + this._device.getIdentifier();
      var key = md5(this._loginTime + this._secret);
      str = rc4(str, key);
      var b64 = this._passport + ':' + str;
      b64 = base64.encode(b64);
      return encodeURIComponent(b64);
    }
  }]);
  return Rc4Auth;
}(Auth);

function assert(condition, msg) {
  if (!condition) throw new Error('[airloy] ' + msg);
}

var Net = function () {
  function Net(args) {
    classCallCheck(this, Net);

    this._airloy = args.airloy;
    assert(typeof Request !== 'undefined', 'requires a Request for http requests.');
    assert(typeof Promise !== 'undefined', 'requires a Promise polyfill.');
  }

  createClass(Net, [{
    key: 'httpGet',
    value: function httpGet(url, data) {return __async(function*(){
      try {
        var params = data ? '?' + this._queryString(data) : '';
        var request = new Request(this._fullUrl(url) + params, {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json;charset=UTF-8'
          })
        });
        request.headers.set('Host', this._airloy.config.server);
        this._auth.authRequest(request);
        var response = yield fetch(request);
        return yield this._responseHandle(response);
      } catch (e) {
        console.warn('[airloy] http result parsing failed. %o', e);
        return {
          success: false,
          message: e.message,
          info: e.status
        };
      }
    }.call(this))}
  }, {
    key: 'httpPost',
    value: function httpPost(url, data) {return __async(function*(){
      try {
        var request = new Request(this._fullUrl(url), {
          method: 'POST',
          headers: new Headers({
            'Accept': 'application/json;charset=UTF-8',
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(data)
        });
        request.headers.set('Host', this._airloy.config.server);
        this._auth.authRequest(request);
        var response = yield fetch(request);
        return yield this._responseHandle(response);
      } catch (e) {
        console.warn('[airloy] http result parsing failed. %o', e);
        return {
          success: false,
          message: e.message,
          info: e.status
        };
      }
    }.call(this))}
  }, {
    key: '_fullUrl',
    value: function _fullUrl(url) {
      if (url.substr(0, 4) === 'http') {
        return url;
      } else {
        var scheme = this._airloy.config.useHttps ? 'https://' : 'http://';
        url.substr(0, 1) === '/' || (url = '/' + url);
        return scheme + this._airloy.config.server + url;
      }
    }
  }, {
    key: '_queryString',
    value: function _queryString(obj) {
      if (!obj) return '';
      var pairs = [],
          values;
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          Array.isArray(values = obj[prop]) || (values = [values]);
          prop = prop + "=";
          for (var i = 0; i < values.length; i++) {
            pairs.push(prop + encodeURIComponent(values[i]));
          }
        }
      }
      return pairs.join("&");
    }
  }, {
    key: '_responseHandle',
    value: function _responseHandle(response) {return __async(function*(){
      switch (response.status) {
        case 201:
          this._airloy.auth.updateAuth(response.headers.get('X-Airloy-Token'), response.headers.get('X-Airloy-Ip'));
        case 200:
          return yield response.json();
        case 400:
          return {
            success: false,
            message: "error.request.param",
            info: response.status
          };
        case 401:
          this._airloy.event.emit(this._airloy.event.authRequiredEvent);
          return {
            success: false,
            message: "error.request.auth",
            info: response.status
          };
        case 0:
          return {
            success: false,
            message: "error.network.offline",
            info: response.status
          };
        default:
          return {
            success: false,
            message: "error.network.server",
            info: response.status
          };
      }
    }.call(this))}
  }]);
  return Net;
}();

var airloy = new (function () {
  function _class() {
    classCallCheck(this, _class);

    this.version = '0.9.2';
    this.config = new Config();
    this.device = new Device();
    this.store = new Store();
    this.event = new Event();
    this.auth = null;
    this.net = null;
  }

  createClass(_class, [{
    key: 'configure',
    value: function configure(newConfig) {
      newConfig.server && (this.config.server = newConfig.server);
      this.config.useHttps = newConfig.useHttps ? true : false;
      newConfig.apiVersion && (this.config.apiVersion = newConfig.apiVersion);
      newConfig.appKey && (this.config.appKey = newConfig.appKey);
      newConfig.appSecret && (this.config.appSecret = newConfig.appSecret);
    }
  }, {
    key: 'use',
    value: function use(plugin) {
      plugin.install(this);
    }
  }]);
  return _class;
}())();

var auth = new Rc4Auth({ airloy: airloy });
var net = new Net({ airloy: airloy });

airloy.auth = auth;
airloy.net = net;

exports['default'] = airloy;
exports.Device = Device;
exports.Store = Store;
exports.Event = Event;
exports.Auth = Auth;
exports.Net = Net;

Object.defineProperty(exports, '__esModule', { value: true });

})));
