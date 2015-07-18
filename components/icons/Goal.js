'use strict';

var React = require('react-native');

var {
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
  Text
} = React;


var styles = StyleSheet.create({
  plate: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 4,
  },
  iconText: {
    color: '#00CA69',
    fontWeight: 'bold',
    fontSize: 22
  },
});

var GoalIcon = React.createClass({
  // change to real icons later
  render() {
    if (this.props.icon === '-') this.props.icon = '∞';
    return (
      <View style={styles.plate}>
        <Text style={styles.iconText}>
          {this.props.icon || 'G'} 
        </Text>
      </View>
    )
  }
});


module.exports = GoalIcon;
