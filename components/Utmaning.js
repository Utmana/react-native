'use strict';

var React = require('react-native');
var GoalIcon = require('./icons/Goal');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
} = React;

var Utmaning = React.createClass({

  goToUtmaning: function() {
    this.props.goToUtmaning(this.props);
  },


  render() {
    var {
      _id,
      category,
      summary,
      title
    } = this.props;


    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.goToUtmaning}>
        <View style={styles.utmaningContainer}>
          <GoalIcon category={category} />
          <View style={styles.rightContainer}>
            <View style={styles.userContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.summary}>{summary}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
});

var styles = StyleSheet.create({
  utmaningContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#DAE6F0',
    paddingTop: 4,
    paddingBottom: 10
  },
  userContainer: {
    flexDirection: 'row'
  },
  summary: {
    marginLeft: 4,
    fontSize: 14,
    color: '#000000',
    marginTop: 2
  },
  title: {
    fontWeight: '600',
    fontSize: 15
  },
  text: {
    marginTop: 5
  },
  rightContainer: {
    flex: 1,
    padding: 10
  }
});


module.exports = Utmaning;
