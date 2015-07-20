var React = require('react-native');
var DeviceUUID = require('react-native-device-uuid');

var {
  AsyncStorage,
} = React;

module.exports = {
  getId() {
    return DeviceUUID
      .getUUID()
      .catch(error => {
        return Date.now().toString();
      });
  }
};
