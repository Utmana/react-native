var React = require('react-native');

var {
  AsyncStorage,
} = React;

module.exports = {
  getId() {
    return AsyncStorage
      .getItem('deviceId')
      .then((deviceId, error) => {
        if (!deviceId) {
          deviceId = Date.now().toString();
          AsyncStorage.setItem('deviceId', deviceId);
        }
        return deviceId;
      });
  }
};
