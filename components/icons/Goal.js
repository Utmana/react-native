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
  randomGoal(){
    switch (Math.round((Math.random() * 10) % 3)){
      case 0: return 'ME'; // I'll be a better person
      case 1: return 'GG'; // Greater good
      case 2: return 'E';  // Environment
      case 3: return 'I';  // Integration
    }
  },

  // change to real icons later
  render() {
    return (
      <View style={styles.category}>
        <Text style={styles.categoryText}>
          {this.randomGoal()} 
        </Text>
      </View>
    )
  }
});


module.exports = GoalIcon;
