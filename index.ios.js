/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SideMenu = require('react-native-side-menu');
var window = require('Dimensions').get('window');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Route,
  Text,
  View
} = React;

var Challenges = require('./lib/components/challenges');
var About = require('./lib/components/about');

var Menu = React.createClass({
  transitionTo(route) {
    this.props.menuActions.close();
    this.props.navigator.push(route);
  },
  render() {
    return (
      <View style={styles.menu}>
        <Text
          style={styles.item}
         >
          Challenges
        </Text>
        <Text
          style={styles.item}
          onPress={this.transitionTo.bind({}, {
            title: 'About',
            component: About
          })}>
        About
        </Text>
      </View>
    );
  }
});

var UtmanaProject = React.createClass({
  render() {
    return (
      <SideMenu menu={<Menu />}>
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'Challenges',
            component: Challenges
          }}
        >
        </NavigatorIOS>
      </SideMenu>
    );
  }
});

var styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    // backgroundColor: 'gray',
    justifyContent: 'center',
    padding: 20
  },
  item: {
    fontSize: 18,
    fontWeight: '300',
    paddingTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('UtmanaProject', () => UtmanaProject);
