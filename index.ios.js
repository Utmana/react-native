'use strict';

var React = require('react-native');

var Router = require('react-native-router');

var HomePage = require('./pages/HomePage');
var BackButton = require('./components/BackButton');
var UtmaningPage = require('./components/UtmaningDetails');
var CreateUtmaning = require('./components/icons/CreateUtmaning');
var notifications = require('./lib/notifications');

var {
  StyleSheet,
  AppRegistry
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
    notifications.onUtmaning(function(utmaning){
      UtmanaProject.refs.router.openRoute({
        name: 'Utmaning',
        component: UtmaningPage,
        data: utmaning
      });
    });
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
        ref='router'
      />
    );
  }
});



AppRegistry.registerComponent('UtmanaProject', () => UtmanaProject);
