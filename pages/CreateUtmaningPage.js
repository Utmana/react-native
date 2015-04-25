'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;


var RightCorner = React.createClass({
  render() {
    return (
      <View style={styles.button} />
    )
  }
});


var CreateUtmaningPage = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text>Create new utmaning here!</Text>
      </View>
    )
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'orange'
  }
});


module.exports = CreateUtmaningPage;
