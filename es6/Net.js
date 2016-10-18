/**
 * Created by  Layman(https://github.com/anysome) on 16/10/17.
 */
import {assert} from './util';

export default class Net {

  constructor(args) {
    this._airloy = args.airloy;
    assert(typeof Request !== 'undefined', 'requires a Request for http requests.');
    assert(typeof Promise !== 'undefined', 'requires a Promise polyfill.');
  }

  async httpGet(url, data) {
    try {
      let params = data ? '?' + this._queryString(data) : '';
      let request = new Request(this._fullUrl(url) + params, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json;charset=UTF-8'
        })
      });
      request.headers.set('Host', this._airloy.config.server);
      this._auth.authRequest(request);
      let response = await fetch(request);
      return await this._responseHandle(response);
    } catch (e) {
      console.warn('[airloy] http result parsing failed. %o', e);
      return {
        success: false,
        message: e.message,
        info: e.status
      };
    }
  }

  async httpPost(url, data) {
    try {
      let request = new Request(this._fullUrl(url), {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json;charset=UTF-8',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
      });
      request.headers.set('Host', this._airloy.config.server);
      this._auth.authRequest(request);
      let response = await fetch(request);
      return await this._responseHandle(response);
    } catch (e) {
      console.warn('[airloy] http result parsing failed. %o', e);
      return {
        success: false,
        message: e.message,
        info: e.status
      };
    }
  }


  _fullUrl(url) {
    if (url.substr(0, 4) === 'http') {
      return url;
    } else {
      let scheme = this._airloy.config.useHttps ? 'https://' : 'http://';
      url.substr(0, 1) === '/' || (url = '/' + url);
      return scheme + this._airloy.config.server + url;
    }
  }

  _queryString(obj) {
    if (!obj) return '';
    var pairs = [], values;
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

  async _responseHandle(response) {
    switch (response.status) {
      case 201:
        this._airloy.auth.updateAuth(response.headers.get('X-Airloy-Token'), response.headers.get('X-Airloy-Ip'));
      case 200:
        return await response.json();
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
  }
}
