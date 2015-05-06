'use strict';

var React = require('react-native');

var Router = require('react-native-router');

var HomePage = require('./pages/HomePage');
var BackButton = require('./components/BackButton');
var SearchAndCompose = require('./components/icons/SearchAndCompose');
var CreateUtmaning = require('./components/icons/CreateUtmaning');

var {
  StyleSheet,
  View,
  AppRegistry,
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
