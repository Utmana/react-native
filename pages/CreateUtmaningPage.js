'use strict';

var React = require('react-native');
var Button = require('../components/Button');
var challenges = require('../lib/challenges');
var t = require('tcomb-form-native');
var timeouts = require('../lib/timeouts');

var {
  StyleSheet,
  View,
} = React;

var Form = t.form.Form;

var Categories = t.enums({
  V: 'Bättre värld',
  I: 'Integration',
  P: 'Personlig'
});

var Timeouts = t.enums(timeouts);

// here we are: define your domain model
var Model = t.struct({
  title: t.Str,
  summary: t.maybe(t.Str),
  timeout: Timeouts,
  //category: Categories
});

var CreateUtmaningPage = React.createClass({
  getInitialState: function () {
    return {
      title: '',
      summary: '',
      timeout: 30,
      category: {}
    };
  },

  save() {
    var value = this.refs.form.getValue();
    if (!value) return;

    console.log('value', value);
    challenges.create(this.refs.form.getValue())
    this.props.toBack();
  },

  render() {

    var options = {
      auto: 'placeholders',
      fields: {
        title: {
          placeholder: 'Rubrik på utmaningen',
          //help:'T.ex. "Ge en av dina kollegor en kram när du går hem idag"',
          error: 'Du måste ange rubrik'
        },
        summary: {
          placeholder: 'Mer detaljer om utmaningen...'
        },
        category: {
          label: 'Typ av utmaning'
        },
        timeout: {
          label: 'Tidsfrist'
        }
      }
    };
    var saveButton = (<View>Spara</View>);

    return (
      <View style={styles.container} rightCorner={saveButton}>
        <Form
          ref='form'
          type={Model}
          value={this.state}
          options={options}
        />
        <Button onPress={this.save} style={styles.button} text="Spara"></Button>
      </View>
    )
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 90,
    marginTop: 50,
    padding: 10
  },
  button: {
    flex: 10,
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});


module.exports = CreateUtmaningPage;
