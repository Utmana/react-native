'use strict';

var React = require('react-native');
var Button = require('../components/Button');
var challenges = require('../lib/stores/challenges');
var t = require('tcomb-form-native');
var timeouts = require('../lib/timeouts');
var GoalIcon = require('../components/icons/Goal');

var {
  StyleSheet,
  View,
  Text
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
      timeout: '60',
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
          autoFocus: true,
          //help:'T.ex. "Ge en av dina kollegor en kram när du går hem idag"',
          error: 'Du måste ange rubrik'
        },
        summary: {
          placeholder: 'Mer detaljer om utmaningen...',
          help: 'Berätta vad som krävs för att utmaningen ska anses vara avklarad',
        },
        category: {
          label: 'Typ av utmaning'
        },
        timeout: {
          label: 'Så här lång tid har man på sig att slutföra'
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
        <Text style={styles.helpText}>
          När du sparar din utmaning kommer den granskas och automatiskt publiceras till alla som har appen installerad. Alla utmaningar måste följa våra regler. Läs mer på utmana.me
        </Text>
      </View>
    )
  }
});


var styles = StyleSheet.create({
  container: {
    marginTop: 5,
    padding: 10
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center'
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  helpText: {
    color: '#555',
    marginTop: 10
  },
  label:{
    color: '#000',
    fontSize: 15,
    marginTop: 7,
    marginBottom: 7,
  }
});


module.exports = CreateUtmaningPage;
