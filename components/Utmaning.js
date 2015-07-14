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
      acceptedCount,
      finishedCount,
      title
    } = this.props;

    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.goToUtmaning}>
        <View style={styles.utmaningContainer}>
          <GoalIcon category={category} />
          <View style={styles.rightContainer}>
            <View style={styles.userContainer}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.summary}>
                { acceptedCount ? <Text style={ styles.accepted }>{acceptedCount} har accepterat </Text> : null }
                { finishedCount ? <Text style={ styles.finished }>{finishedCount} har slutfört</Text> : null }
              </View>
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
    paddingTop: 5,
    paddingBottom: 1
  },
  userContainer: {
    flexDirection: 'column'
  },
  summary: {
    fontSize: 14,
    flex:1,
    flexDirection: 'row',
    color: '#999',
    marginTop: 6
  },
  accepted: {
    alignSelf: 'flex-start',
  },
  finished: {
    alignSelf: 'flex-end',
    color: '#9c9',
  },
  title: {
    fontWeight: '600',
    fontSize: 15
  },
  text: {
    marginTop: 2
  },
  rightContainer: {
    flex: 1,
    padding: 8
  }
});


module.exports = Utmaning;
