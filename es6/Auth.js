/**
 * Created by  Layman(https://github.com/anysome) on 16/10/17.
 */

let _loginTime = 0, _auth = '';

export default class Auth {

  constructor(args) {
    this._airloy = args.airloy;
    this._passport = '11111111-1111-1111-1111-111111111111';
    this._session = '00000000-1111-1111-1111-111111111111';
    this._address = '127.0.0.1';
    this._logined = false;
    this.user = {};
  }

  async setup() {
    this._logined = '1' === await this._airloy.store.getItem('airloy.user.login.flag');
    if (this._logined) {
      _loginTime = await this._airloy.store.getItem('airloy.user.login.time');
      this._passport = await this._airloy.store.getItem('airloy.user.passport');
      _auth = this._makeAuth();
      console.debug(`[airloy] restore auth = ${_auth}`);
      let str = await this._airloy.store.getItem('airloy.user.info') || '{}';
      console.debug(`[airloy] restore user = ${str}`);
      this.user = JSON.parse(str);
    }
    return this._logined;
  }

  formUser(account, password) {
    _loginTime = new Date().getTime();
    return {
      account: account,
      password: password,
      device: this._airloy.device.getIdentifier(),
      loginTime: _loginTime
    };
  }

  saveUser(newUser) {
    this._savePassport(newUser.passport);
    console.debug(`[Airloy] get new passport = ${this._passport}`);
    _auth = this._makeAuth();
    this.user = newUser;
    this._logined = true;
    this._airloy.store.setItem('airloy.user.login.time', '' + _loginTime);
    this._airloy.store.setItem('airloy.user.info', JSON.stringify(this.user));
    this._airloy.store.setItem('airloy.user.login.flag', '1');
    return this.user;
  }

  async updateUser(user) {
    this.user = user;
    this._airloy.store.setItem('airloy.user.info', JSON.stringify(this.user));
  }

  getUser() {
    return this.user;
  }

  authRequest(request) {
    request.headers.set('X-Airloy-Api', this._airloy.config.apiVersion);
    request.headers.set('X-Airloy-App', this._airloy.config.appKey);
    request.headers.set('X-Airloy-Auth', _auth);
    this._session && request.headers.set('X-Airloy-Token', this._session);
  }

  updateAuth(session, address, passport) {
    console.debug(`[airloy] update new session = ${session}, address = ${address}, passport = ${passport}`);
    session && (this._session = session);
    address && (this._address = address);
    passport && this._savePassport(passport);
    _auth = this._makeAuth();
  }

  revokeAuth() {
    console.debug(`[airloy] revoke passport = ${this._passport}`);
    this._savePassport('');
    this._airloy.store.setItem('airloy.user.login.flag', '0');
    this._airloy.store.setItem('airloy.user.info', '{}');
    this.user = {};
    this._logined = false;
  }

  logined() {
    return this._logined;
  }

  logout() {
    this.revokeAuth();
    this._airloy.event.emit(this._airloy.event.logoutEvent);
  }



  _savePassport(passport) {
    this._passport = passport;
    this._airloy.store.setItem('airloy.user.passport', this._passport);
  }

  _makeAuth() {
    console.error('[airloy] please init Auth instance first.');
  }
}
