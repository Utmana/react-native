var React = require('react-native');
var DeviceUUID = require('react-native-device-uuid');

var {
  AsyncStorage,
} = React;

module.exports = {
  getId() {
    return new Promise((resolve, reject) => {
      var randomId = Date.now().toString();
      DeviceUUID
        .getUUID()
        .then(deviceId => {
          resolve(deviceId || randomId);
        })
        .catch(error => {
          resolve(randomId);
        });
    });
  }
};
