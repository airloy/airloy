/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/6/2.
 */

import device from './src/Device'
import Store from './src/Store'
import Event from './src/Event'
import Auth from './src/Auth'
import Net from './src/Net'

const store = new Store()
const event = new Event()
let auth = null
let net = new Net({
  server: 'http://localhost:8080',
  auth: auth,
  event: event
})

let Airloy = {device, auth, store, event, net}

export function init(MyAuth, config) {
  config = config || {}
  auth = new MyAuth({
    client: config.clientKey,
    event: event,
    secret: config.clientSecret,
    store: store
  })
  Airloy.auth = auth
  Airloy.net.config({
    server: config.server,
    auth: auth
  })
}

export default Airloy
