'use strict';

var React = require('react-native');

var Router = require('react-native-router');

var HomePage = require('./pages/HomePage');
var BackButton = require('./components/BackButton');
var SearchAndCompose = require('./components/icons/SearchAndCompose');
var CreateUtmaning = require('./components/icons/CreateUtmaning');
var notifications = require('./lib/notifications');

var {
  StyleSheet,
  View,
  AppRegistry,
  PushNotificationIOS
} = React;

var styles = StyleSheet.create({
  header: {
    backgroundColor: '#5cafec'
  }
});



var firstRoute = {
  name: 'Utmaningar',
  component: HomePage,
  leftCorner: CreateUtmaning
};

var UtmanaProject = React.createClass({
  componentWillMount(){
    notifications.startListen();
  },
  componentWillUnmount(){
    notifications.stopListen();
  },
  render() {
    return (
      <Router
        firstRoute={firstRoute}
        headerStyle={styles.header}
        backButtonComponent={BackButton}
      />
    )
  }
});



AppRegistry.registerComponent('UtmanaProject', () => UtmanaProject);
