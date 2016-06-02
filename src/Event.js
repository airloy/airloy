/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/6/2.
 */

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

export default class Event {

    authRequiredEvent = 'airloy:relogin';
    logoutEvent = 'airloy:logout';

    on(event: String, handler: Function) {
        RCTDeviceEventEmitter.addListener(event, handler);
    }

    once(event: String, handler: Function) {
        RCTDeviceEventEmitter.once(event, handler);
    }

    off(...events) {
        for (let event of events) {
            this._off(event);
        }
    }

    _off(event) {
        RCTDeviceEventEmitter.removeAllListeners(event);
    }

    emit(event, ...data) {
        RCTDeviceEventEmitter.emit(event, ...data);
    }
}
