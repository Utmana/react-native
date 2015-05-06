'use strict';

var React = require('react-native');
var Button = require('../components/Button');
var challenges = require('../lib/challenges');

var {
  PickerIOS,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

var PickerItemIOS = PickerIOS.Item;

var CreateUtmaningPage = React.createClass({
  getInitialState: function () {
    return {
      title: '',
      summary: '',
      category: {}
    };
  },

  save() {
    challenges.create({
      title: this.state.title,
      summary: this.state.summary
    });
  },

  render() {
    var categories = [{
      name: 'foo',
      id: 1
    }, {
      name: 'bar',
      id: 2
    }, {
      name: 'herp',
      id: 3
    }, {
      name: 'derp',
      id: 4
    }];

    return (
      <View style={styles.container}>
        <Text>Skapa nya utmaning här!</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Namn'
          onChangeText={(text) => this.setState({title: text})}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Beskrivning'
          onChangeText={(text) => this.setState({summary: text})}
        />
        <Text>Välj utmaningskategori</Text>
        <PickerIOS
          selectedValue={this.state.category}
          onValueChange={(category) => this.setState({category: category})}>

        </PickerIOS>
        <Button onPress={this.save} text='Spara'/>
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
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});


module.exports = CreateUtmaningPage;
