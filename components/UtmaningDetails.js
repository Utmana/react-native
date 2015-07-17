'use strict';

var React = require('react-native');
var GoalIcon = require('./icons/Goal');
var Button = require('./Button');
var challenges = require('../lib/challenges');
var timeouts = require('../lib/timeouts');
var moment = require('moment');
var loaded_locale = require('moment/locale/sv');
moment.locale('sv', loaded_locale);

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
    var id = this.state.challenge._id;
    var challenge = challenges.get(id);
    var me = challenges.me(id);

    Promise.all([challenge,me]).then((results) => {
      this.setState({
        challenge: results[0],
        me: results[1]
      });
    }, (err) => {
      console.log('me error', err);
    });
  },

  parseTimeout(minutes){
    return timeouts[minutes] || minutes + ' minuter';
  },

  deadline(challenge){
    if (!challenge.timeout) {
      return 'resten av livet';
    }
    return moment(this.state.me.accepted).add(challenge.timeout, 'minutes').fromNow();
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
            <GoalIcon category={timeouts.shorten(challenge.timeout)}/>
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{challenge.title}</Text>
              <Text style={styles.timeout}>
                { 
                  challenge.timeout && this.state.me && !this.state.me.finished ? 'deadline: ' + this.deadline(challenge) : null
                }
              </Text>
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
            {
              this.state.me && !this.state.me.finished ? 
              <Button onPress={this.finish} text='Klart!'/> 
              : 
              <Text style={styles.finished}>{this.state.me && moment(this.state.me.finished).fromNow()}</Text>
            }
          </View>

        </View>
        {
          !this.state.me ? 
            <Text style={styles.helpText}>Om du väljer att acceptera utmaningen kommer du få en påminnelse om exakt {this.parseTimeout(challenge.timeout || 5 )}. Då skall utmaningen vara utförd.</Text>
          :
            !this.state.me.finished ? 
              <Text style={styles.helpText}>Du har accepterat denna utmaning, {this.deadline(challenge)} ska den vara klar.</Text>
            :
              <Text style={styles.helpText}>Du har avslutat denna utmaning, du slutförde den på {moment.duration(this.state.me.finished-this.state.me.accepted, 'milliseconds').humanize()}.</Text>
        }
        {
          !this.state.me ? <Button onPress={this.accept} text='Acceptera'/> : null
        }
            
        
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
    fontSize: 23,
    color: '#333',
    marginTop: 2
  },
  name: {
    fontWeight: '600',
    fontSize: 15
  },
  reportButton: {
    backgroundColor: '#a33'
  },
  summary: {
    marginTop: 5,
    fontSize: 17,
    fontWeight: '300'
  },
  rightContainer: {
    flex: 1,
    padding: 10
  },
  finished: {
    color: '#9c9'
  },
  timeout:{
    color: '#c99'
  }
});


module.exports = UtmaningDetails;
