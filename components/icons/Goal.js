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
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 4
  },
  categoryText: {
    color: 'white',
    fontSize: 22
  },
});

var GoalIcon = React.createClass({
  
  // change to real icons later
  render() {
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
