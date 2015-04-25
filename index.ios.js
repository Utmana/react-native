'use strict';

var React = require('react-native');

var Router = require('react-native-router');

var HomePage = require('./pages/HomePage');
var BackButton = require('./components/BackButton');
var SearchAndCompose = require('./components/icons/SearchAndCompose');
var AddPeople = require('./components/icons/AddPeople');

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
  name: 'Home',
  component: HomePage,
  leftCorner: AddPeople
};

var UtmanaProject = React.createClass({
  render() {
    return (
      <Router 
        firstRoute={firstRoute} 
        headerStyle={styles.header}
        backButtonComponent={BackButton}
        rightCorner={SearchAndCompose}
      />
    )
  }
});


AppRegistry.registerComponent('UtmanaProject', () => UtmanaProject);