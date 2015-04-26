'use strict';

var React = require('react-native');
var GoalIcon = require('./icons/Goal');

var {
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  View,
} = React;

var UtmaningDetails = React.createClass({

  render() {
    var {
      _id,
      image,
      summary,
      title
    } = this.props.data;

    return (
      <ScrollView>
        <View style={styles.utmaningContainer}>
          <View style={styles.userContainer}>
            <GoalIcon />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.summary}>{summary}</Text>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.rtBold}>10</Text>
            <Text style={styles.rtText}>ACCEPTERAT</Text>
            <Text style={styles.rtBold}>3</Text>
            <Text style={styles.rtText}>SLUTFÖRT</Text>
            <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor="transparent">
              <Text style={styles.buttonText}>Acceptera</Text>
            </TouchableHighlight>
          </View>

        </View>
          <Text style={styles.helpText}>Om du väljer att acceptera utmaningen kommer du få en påminnelse om exakt 30 minuter. Då skall utmaningen vara utförd.</Text>
      </ScrollView>
    )
  }
});

var styles = StyleSheet.create({
  button: {
    flex: 3,
    backgroundColor: '#3fbf88',
    height: 20,
    marginBottom: 16
  },
  buttonText:{
    color: 'white',
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: '600',
    textAlign: 'center',
    alignItems: 'center',

  },
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
    fontSize: 14,
    marginRight: 3,
    fontWeight: '600',
  },
  rtText: {
    fontSize: 14,
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
