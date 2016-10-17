/**
 * Created by  Layman(https://github.com/anysome) on 16/10/17.
 */

import Config from './Config';
import Device from './Device';
import Store from './Store';
import Event from './Event';
import Auth from './Auth';
import Net from './Net';

let airloy = {
  config: new Config(),
  device: new Device(),
  store: new Store(),
  event: new Event(),
  auth: null,
  net: null
};

let auth = new Auth({airloy});
let net = new Net({airloy});

airloy.auth = auth;
airloy.net = net;

export default airloy;
