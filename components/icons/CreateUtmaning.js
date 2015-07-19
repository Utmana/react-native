'use strict';

var React = require('react-native');

var CreateUtmaningPage = require('../pages/CreateUtmaningPage');

var {
  StyleSheet,
  TouchableHighlight,
  Image
} = React;


var styles = StyleSheet.create({
  icon: {
    width: 21,
    height: 21,
    marginTop: 4,
    marginLeft: 15
  }
});

var CreateUtmaningIcon = React.createClass({

  goToAddPage: function() {
    this.props.toRoute({
      name: "Ny utmaning",
      component: CreateUtmaningPage
    });
  },

  render() {
    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.goToAddPage}>
        <Image source={require('image!compose_icon')} style={styles.icon} />
      </TouchableHighlight>
    )
  }
});


module.exports = CreateUtmaningIcon;
