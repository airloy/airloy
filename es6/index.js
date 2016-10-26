/**  * Created by  Layman(https://github.com/anysome) on 16/10/17.  */

import Config from './Config';
import Device from './Device';
import Store from './Store';
import Event from './Event';
import Auth from './Auth';
import Rc4Auth from './Rc4Auth';
import Net from './Net';

let airloy = {
  version: '0.9.7',
  config: new Config(),
  device: new Device(),
  store: new Store(),
  event: new Event(),
  auth: null,
  net: null
};

function configure(newConfig) {
  newConfig.server && (airloy.config.server = newConfig.server);
  airloy.config.useHttps = newConfig.useHttps ? true : false;
  newConfig.apiVersion && (airloy.config.apiVersion = newConfig.apiVersion);
  newConfig.appKey && (airloy.config.appKey = newConfig.appKey);
  newConfig.appSecret && (airloy.config.appSecret = newConfig.appSecret);
}

function use(plugin) {
  plugin.install(airloy);
}

let auth = new Rc4Auth({airloy});
let net = new Net({airloy});

airloy.auth = auth;
airloy.net = net;

export default airloy;
export {Device, Store, Event, Auth, Net, configure, use};  
