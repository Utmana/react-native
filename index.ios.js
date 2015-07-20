'use strict';

var React = require('react-native');
var Router = require('react-native-router');

var HomePage = require('./components/pages/HomePage');
var BackButton = require('./components/BackButton');
var UtmaningPage = require('./components/UtmaningDetails');
var CreateUtmaning = require('./components/icons/CreateUtmaning');
var notifications = require('./lib/stores/notifications');
var challenges = require('./lib/stores/challenges');
var AppDispatcher = require('./lib/dispatcher/dispatcher');

var {
  StyleSheet,
  AppRegistry,
  AppStateIOS
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
  getInitialState: function() {
    return {
      currentAppState: AppStateIOS.currentState,
    };
  },
  componentDidMount() {
    notifications.startListen();
    AppStateIOS.addEventListener('change', this._handleAppStateChange);
    console.log('start listen state change')
  },
  componentWillUnmount() {
    AppStateIOS.removeEventListener('change', this._handleAppStateChange);
    notifications.stopListen();
    console.log('stop listen state change')
  },
  _handleAppStateChange(currentAppState) {
    console.log('state change', arguments);
    if (currentAppState === 'active' && this.state.currentAppState === 'background'){
      notifications.popInitialNotification().then( (notification) => {
        challenges.refresh();
        console.log('open route', arguments);
        // UtmanaProject.refs.router.openRoute({
        //   name: 'Utmaning',
        //   component: UtmaningPage,
        //   data: action.challenge
        // });
      });
    }
    this.setState({ currentAppState : currentAppState });
  },
  render() {
    return (
      <Router firstRoute={firstRoute} />
    );
  }
});

AppRegistry.registerComponent('UtmanaProject', () => UtmanaProject);
