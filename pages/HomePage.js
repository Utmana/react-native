'use strict';

var React = require('react-native');

var Utmaning = require('../components/Utmaning');
var UtmaningPage = require('../components/UtmaningDetails');

var challenges = require('../lib/challenges');

var {
  StyleSheet,
  ScrollView
} = React;


var HomePage = React.createClass({

  getInitialState: function() {
    return {
      utmanings: challenges.getLatest()
    }
  },

  goToUtmaning: function(utmaningData) {
    this.props.toRoute({
      name: "Utmaning",
      component: UtmaningPage,
      data: utmaningData
    });
  },

  render() {
    var Utmanings = this.state.utmanings.map((utmaningData) => {
      return <Utmaning {...utmaningData} onPress={this.goToRoute} goToUtmaning={this.goToUtmaning} />;
    });

    return (
      <ScrollView style={styles.container}>
        {Utmanings}
      </ScrollView>
    )
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8fa'
  }
});


module.exports = HomePage;
