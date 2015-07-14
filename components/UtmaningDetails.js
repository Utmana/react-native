'use strict';

var React = require('react-native');
var GoalIcon = require('./icons/Goal');
var Button = require('./Button');
var challenges = require('../lib/challenges');
var timeouts = require('../lib/timeouts');

var {
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  View,
} = React;

var UtmaningDetails = React.createClass({
  componentWillMount() {
    this.setState({
      challenge: this.props.data
    });
  },

  componentDidMount() {
    challenges
      .get(this.state.challenge._id)
      .then((challenge) => {
        this.setState({
          challenge: challenge
        });
      });
  },

  parseTimeout(minutes){
    return timeouts[minutes] || minutes + ' minuter';
  },

  accept() {
    challenges
      .accept(this.state.challenge._id)
      .then((challenge) => {
        this.setState({
          challenge: challenge
        });
        this.props.toBack();
      });
  },
  finish() {
    challenges
      .finish(this.state.challenge._id)
      .then((challenge) => {
        console.log('finished', arguments);
        this.setState({
          challenge: challenge
        });
        this.props.toBack();
      })
      .catch((err) => {
        console.log('fail', err);
      });
  },

  render() {
    var challenge = this.state.challenge;

    return (
      <ScrollView>
        <View style={styles.utmaningContainer}>
          <View style={styles.userContainer}>
            <GoalIcon />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{challenge.title}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.summary}>{challenge.summary}</Text>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.rtBold}>{ challenge.acceptedCount || 0 }</Text>
            <Text style={styles.rtText}>ACCEPTERAT</Text>
            <Text style={styles.rtBold}>{ challenge.finishedCount || 0 }</Text>
            <Text style={styles.rtText}>SLUTFÖRT</Text>
            <Button onPress={this.accept} text='Acceptera'/>
            <Button onPress={this.finish} text='Slutfört'/>
          </View>

        </View>
          <Text style={styles.helpText}>Om du väljer att acceptera utmaningen kommer du få en påminnelse om exakt {this.parseTimeout(challenge.timeout || 5 )}. Då skall utmaningen vara utförd.</Text>
      </ScrollView>
    )
  }
});

var styles = StyleSheet.create({
  helpText: {
    margin: 10,
    paddingTop: 8,
    color: '#666'
  },
  statsContainer: {
    margin: 10,
    paddingTop: 8,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#DAE6F0'
  },
  rtBold: {
    marginRight: 3,
    fontWeight: '600',
  },
  rtText: {
    fontWeight: '400',
    color: '#748999',
    paddingRight: 10
  },

  utmaningContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#DAE6F0',
    paddingTop: 4
  },
  avatar: {
    backgroundColor: 'gray',
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 4
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    flex: 1
  },
  textContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'column'
  },
  title: {
    fontSize: 13,
    color: '#8999a5',
    marginTop: 2
  },
  name: {
    fontWeight: '600',
    fontSize: 15
  },
  summary: {
    marginTop: 5,
    fontSize: 17,
    fontWeight: '300'
  },
  rightContainer: {
    flex: 1,
    padding: 10
  }
});


module.exports = UtmaningDetails;
