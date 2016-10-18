/**
 * Created by  Layman(https://github.com/anysome) on 16/10/17.
 */

export default class Event {

  authRequiredEvent = 'airloy:login';
  logoutEvent = 'airloy:logout';

  on(event: String, handler: Function) {
    console.error('[airloy] please init Event instance first.');
  }

  once(event: String, handler: Function) {
    console.error('[airloy] please init Event instance first.');
  }

  off(...events) {
    for (let event of events) {
      this._off(event);
    }
  }

  _off(event) {
    console.error('[airloy] please init Event instance first.');
  }

  emit(event, ...data) {
    console.error('[airloy] please init Event instance first.');
  }

}
