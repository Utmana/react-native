'use strict';

var React = require('react-native');

var Utmaning = require('../components/Utmaning');
var UtmaningPage = require('../components/UtmaningDetails');
var notifications = require('../lib/notifications');

var challenges = require('../lib/challenges');

var {
  ListView,
  StyleSheet,
  Text,
  View
} = React;


var HomePage = React.createClass({
  getInitialState: function() {
    challenges
      .getLatest()
      .then((result) => {
        this.setState({
          challenges: this.state.challenges.cloneWithRows(result)
        });
      })
      .done();

    return {
      challenges: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  },

  goToUtmaning: function(utmaningData) {
    this.props.toRoute({
      name: 'Utmaning',
      component: UtmaningPage,
      data: utmaningData
    });
  },

  renderRow(challenge) {
    return <Utmaning {...challenge} goToUtmaning={this.goToUtmaning} />;
  },

  render() {
    return (
      <ListView
        dataSource={this.state.challenges}
        renderRow={this.renderRow}
        style={styles.listView}
      />
    )
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8fa'
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  }
});


module.exports = HomePage;
