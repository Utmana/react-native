/**
 * @flow
 */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  TouchableHighlight,
} = React;

var styles = StyleSheet.create({
 button: {
    flex: 3,
    backgroundColor: '#3fbf88',
    height: 20,
    marginBottom: 16
  },
  buttonText:{
    color: 'white',
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: '600',
    textAlign: 'center',
    alignItems: 'center',

  },
});

var Button = React.createClass({
  onPress() {
    console.log(this.props);
    this.props.onPress();
  },
  render() {
    return (
      <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor="transparent">
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
});

module.exports = Button;
