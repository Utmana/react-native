'use strict';

var React = require('react-native');
var Button = require('../components/Button');
var challenges = require('../lib/challenges');
var t = require('tcomb-form-native');

var {
  PickerIOS,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var Form = t.form.Form;

var Categories = t.enums({
  V: 'Bättre värld',
  I: 'Integration',
  P: 'Personlig'
});

var Timeouts = t.enums({
  10 : '10 minuter',
  30 : '30 minuter',
  60 : 'en timme',
  120 : 'två timmar',
  300 : 'fem timmar',
  1440 : 'ett dygn',
  10080 : 'en vecka',
});

// here we are: define your domain model
var Model = t.struct({
  title: t.Str,                 
  summary: t.maybe(t.Str),      
  //timeout: Timeouts,               
  category: Categories           
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
    challenges.create({
      title: this.state.title,
      summary: this.state.summary,
      timeout: this.state.timeout,
      category: this.state.category,
    });
    this.props.toBack();
  },

  render() {

    var options = {
      auto: 'placeholders', 
      fields: { 
        title: {
          placeholder: 'Rubrik på utmaningen',
          help:'T.ex. "Ge en av dina kollegor en kram när du går hem idag"',
          error: 'Du måste ange rubrik'
        },
        summary: {
          placeholder: 'Beskriv vad utmaningen går ut på',
          multiline: 'true'
        },
        category: {
          label: 'Typ av utmaning',
          help: 'Välj hur denna utmaning gör något något bra'
        }
      }
    };

    return (
      <View style={styles.container}>
        <Form
          ref='form'
          type={Model}
          value={this.state}
          options={options}
        />
        <Button onPress={this.save} style={styles.button} text='Spara' underlayColor='#99d9f4'/>
      </View>
    )
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 10
  },
  button: {
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
