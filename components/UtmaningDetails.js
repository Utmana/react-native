'use strict';

var React = require('react-native');

var challenges = require('../lib/challenges');

var {
  StyleSheet,
  Text,
  Image,
  Button,
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
      })
      .done();
  },

  render() {
    var challenge = this.state.challenge;

    return (
      <ScrollView>
        <View style={styles.utmaningContainer}>
          <View style={styles.userContainer}>
            <Image source={{uri: challenge.image}} style={styles.avatar} />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{challenge.title}</Text>
              <Text style={styles.summary}>{challenge.summary}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
});

var styles = StyleSheet.create({
  reutmaningContainer: {
    margin: 10,
    paddingTop: 8,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#DAE6F0'
  },
  rtBold: {
    fontSize: 14,
    marginRight: 3,
    fontWeight: '600',
  },
  rtText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#748999'
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
    flex: 1
  },
  textContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'column'
  },
  username: {
    fontSize: 13,
    color: '#8999a5',
    marginTop: 2
  },
  name: {
    fontWeight: '600',
    fontSize: 15
  },
  text: {
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
