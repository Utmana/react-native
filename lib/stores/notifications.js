var React = require('react-native');
var challenges = require('./challenges');
var EventEmitter2 = require('eventemitter2').EventEmitter2;
var AppDispatcher = require('../dispatcher/dispatcher');

var {
  PushNotificationIOS,
  AsyncStorage,
  AlertIOS,
} = React;

var NotificationsStore = Object.assign({}, EventEmitter2.prototype, {

  onNotification(notification){
    var data = notification.getData();
    AppDispatcher.dispatch({
      actionType: 'notification',
      cid: data.cid
    });
  },

  onRegister(deviceToken) {
    console.log('token', JSON.stringify(deviceToken));
    AsyncStorage.setItem('userId', deviceToken);
  },

  startListen(){
    PushNotificationIOS.addEventListener('register', NotificationsStore.onRegister);
    PushNotificationIOS.addEventListener('notification', NotificationsStore.onNotification);

    // check if we have any unhandled notifications
    var notification = PushNotificationIOS.popInitialNotification();
    if (notification) {
      console.log('start notification', notification);
    }
/*    PushNotificationIOS.checkPermissions((permissions)=>{
      AlertIOS.alert('permissions', JSON.stringify(permissions), [{ text:'Mkkay..', onPress: null }])
    })
*/
  },
  stopListen(){
    PushNotificationIOS.removeEventListener('register', NotificationsStore.onRegister);
    PushNotificationIOS.removeEventListener('notification', NotificationsStore.onNotification);
  }
});

module.exports = NotificationsStore;