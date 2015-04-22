/**
 * @flow
 */
'use strict';
var React = require('react-native');
var {
  ListView,
  StyleSheet,
  Text,
  View
} = React;

var {
  BASE_URL
} = require('../config');

var request = require('../plugins/request');

var challenges = React.createClass({
  getInitialState() {
    return {
      isLoading: true,
      debug: 'perfect',
      challenges: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  },
  componentDidMount() {
    this.getChallenges();
  },
  getChallenges() {
    request
      .get(`${BASE_URL}/challenges`)
      .then((response) => {
        this.setState({
          challenges: this.state.challenges.cloneWithRows(response)
        });
      })
      .done();
  },
  render() {
    if (this.state.challenges.getRowCount() === 0) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.challenges}
        renderRow={this.renderRow}
        style={styles.listView}
      />
    );
  },
  renderRow(challenge) {
    return (
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{challenge.summary}</Text>
        </View>
      </View>
    );
  },
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Loading...
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = challenges;
