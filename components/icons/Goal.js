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
  category: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 4,
  },
  categoryText: {
    color: '#00CA69',
    fontWeight: 'bold',
    fontSize: 22
  },
});

var GoalIcon = React.createClass({
  // change to real icons later
  render() {
    if (this.props.category === '-') this.props.category = '∞';
    return (
      <View style={styles.category}>
        <Text style={styles.categoryText}>
          {this.props.category || 'G'} 
        </Text>
      </View>
    )
  }
});


module.exports = GoalIcon;
