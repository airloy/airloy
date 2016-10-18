/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/10/18.
 */
import Auth from './Auth';
import md5 from 'md5';
import base64 from 'base-64';

function rc4(str, key) {
  var s = [], k = [], i = 0, j = 0, x, res = "";
  for ( i = 0; i < 256; i++ ) {
    s[i] = i;
    k[i] = key.charCodeAt( i % key.length );
  }
  for ( i = 0; i < 256; i++ ) {
    j = (j + s[i] + k[i]) % 256;
    x = s[i];
    s[i] = s[j];
    s[j] = x;
  }
  i = 0;
  j = 0;
  for ( var y = 0; y < str.length; y++ ) {
    i = ( i + 1 ) % 256;
    j = ( j + s[i] ) % 256;
    x = s[i];
    s[i] = s[j];
    s[j] = x;
    res += String.fromCharCode( str.charCodeAt( y ) ^ s[( s[i] + s[j] ) % 256]) ;
  }
  return res;
}

export default class Rc4Auth extends Auth {

  _makeAuth() {
    let str = this._address + '`' + this._device.getIdentifier();
    let key = md5(this._loginTime + this._secret);
    str = rc4(str, key);
    let b64 = this._passport + ':' + str;
    b64 = base64.encode(b64);
    return encodeURIComponent(b64);
  }
}
