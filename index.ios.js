'use strict';

var React = require('react-native');
var Router = require('react-native-router');

var HomePage = require('./components/pages/HomePage');
var BackButton = require('./components/BackButton');
var UtmaningPage = require('./components/UtmaningDetails');
var CreateUtmaning = require('./components/icons/CreateUtmaning');
var notifications = require('./lib/stores/notifications');
var AppDispatcher = require('./lib/dispatcher/dispatcher');

var {
  StyleSheet,
  AppRegistry
} = React;

var styles = StyleSheet.create({
  header: {
    backgroundColor: '#00CA69'
  }
});

var firstRoute = {
  name: 'Utmaningar',
  component: HomePage,
  leftCorner: CreateUtmaning,
  headerStyle: styles.header
};

var UtmanaProject = React.createClass({
  componentWillMount(){
    var _this = this;
    notifications.startListen();
    notifications.onUtmaning(function(utmaning){
      AppDispatcher.dispatch({
        actionType: 'challenge',
        challenge: utmaning
      });

      if (_this.refs.router) {
        _this.refs.router.openRoute({
          name: 'Utmaning',
          component: UtmaningPage,
          data: utmaning
        });
      }
    });
  },
  componentWillUnmount(){
    notifications.stopListen();
  },
  render() {
    return (
      <Router firstRoute={firstRoute} />
    );
  }
});



AppRegistry.registerComponent('UtmanaProject', () => UtmanaProject);
