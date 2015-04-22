/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Route
} = React;

var {
  BASE_URL
} = require('./lib/config');

var fetch = require('fetch');

var Challenges = require('./lib/components/challenges');
var About = require('./lib/components/about');

var UtmanaProject = React.createClass({
  render: function() {

    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Challenges',
          component: Challenges
        }}
      >
        <Route
          title='About'
          component={{About}}
        />
      </NavigatorIOS>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('UtmanaProject', () => UtmanaProject);
