/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/6/2.
 */

import DeviceInfo from 'react-native-device-info';

export default class Device {
    static os = DeviceInfo.getSystemName();
    static device_name = DeviceInfo.getDeviceName();
    static device_id = DeviceInfo.getUniqueID();
    static version = DeviceInfo.getVersion();
    static locale = DeviceInfo.getDeviceLocale();

    static getIdentifier() {
        return Device.os + '^' + Device.device_name + '^' + Device.device_id;
    }
}
