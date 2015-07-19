var React = require('react-native');

var {
  PushNotificationIOS,
  AsyncStorage,
  AlertIOS,
} = React;


var self = module.exports = {
  utmaningEventHandlers: [],
  onUtmaning(callback){
    self.utmaningEventHandlers.push(callback);
  },
  onNotification(notification){
    var utmaning = notification.getData();
    self.utmaningEventHandlers.map((handler) => handler(utmaning));
  },

  onRegister(deviceToken) {
    console.log('token', JSON.stringify(deviceToken));
    AsyncStorage.setItem('userId', deviceToken);
  },

  startListen(){
    PushNotificationIOS.addEventListener('register', self.onRegister);
    PushNotificationIOS.addEventListener('notification', self.onNotification);
/*    PushNotificationIOS.checkPermissions((permissions)=>{
      AlertIOS.alert('permissions', JSON.stringify(permissions), [{ text:'Mkkay..', onPress: null }])
    })
*/
  },
  stopListen(){
    PushNotificationIOS.removeEventListener('register', self.onRegister);
    PushNotificationIOS.removeEventListener('notification', self.onNotification);
  }
}
