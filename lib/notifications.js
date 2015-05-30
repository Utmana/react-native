var React = require('react-native');
var {
  PushNotificationIOS,
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
  startListen(){
    PushNotificationIOS.addEventListener('notification', self.onNotification);
/*    PushNotificationIOS.checkPermissions((permissions)=>{
      AlertIOS.alert('permissions', JSON.stringify(permissions), [{ text:'Mkkay..', onPress: null }])
    })
*/
  },
  stopListen(){
    PushNotificationIOS.removeEventListener('notification', self.onNotification);
  }
}
