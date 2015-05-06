var React = require('react-native');
var {
  AlertIOS,
  PushNotificationIOS,
} = React;


var self = module.exports = {
  onNotification(notification){
    AlertIOS.alert(
      'Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  },
  startListen(){
    PushNotificationIOS.addEventListener('notification', self.onNotification);
    PushNotificationIOS.checkPermissions((permissions)=>{
      AlertIOS.alert('permissions', JSON.stringify(permissions), [{ text:'Mkkay..', onPress: null }])
    })
  },
  stopListen(){
    PushNotificationIOS.removeEventListener('notification', self.onNotification);
  }
}
