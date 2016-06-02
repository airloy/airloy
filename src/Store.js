/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/6/2.
 */

import {AsyncStorage} from 'react-native'

export default class Store {

  async getItem(key) {
    var value = await AsyncStorage.getItem(key)
    return value
  }

  setItem(key, value) {
    AsyncStorage.setItem(key, value)
  }
}
