/**
 * Created by Layman(http://github.com/anysome) on 16/10/17.
 */

export default class Device {

  constructor(args) {
    this._identifier = null;
  }

  getIdentifier() {
    console.error('[Airloy] please init Device instance first.');
    return this._identifier;
  }

}
