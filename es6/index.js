/**
 * Created by  Layman(https://github.com/anysome) on 16/10/17.
 */

import Config from './Config';
import Device from './Device';
import Store from './Store';
import Event from './Event';
import Auth from './Auth';
import Rc4Auth from './Rc4Auth';
import Net from './Net';

let airloy = new class {

  constructor() {
    this.version = '0.9.5';
    this.config = new Config();
    this.device = new Device();
    this.store = new Store();
    this.event = new Event();
    this.auth = null;
    this.net = null;
  }

  configure(newConfig) {
    newConfig.server && (this.config.server = newConfig.server);
    this.config.useHttps = newConfig.useHttps ? true : false;
    newConfig.apiVersion && (this.config.apiVersion = newConfig.apiVersion);
    newConfig.appKey && (this.config.appKey = newConfig.appKey);
    newConfig.appSecret && (this.config.appSecret = newConfig.appSecret);
  }

  use(plugin) {
    plugin.install(this);
  }

} ();

let auth = new Rc4Auth({airloy});
let net = new Net({airloy});

airloy.auth = auth;
airloy.net = net;

export default airloy;

export {Device, Store, Event, Auth, Net};

