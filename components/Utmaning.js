'use strict';

var React = require('react-native');

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
      text,
      user
    } = this.props;

    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.goToUtmaning}>
        <View style={styles.utmaningContainer}>
          <Image source={{uri: user.avatar}} style={styles.avatar} />
          <View style={styles.rightContainer}>
            <View style={styles.userContainer}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.username}>@{user.username}</Text>
            </View>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
});

var styles = StyleSheet.create({
  utmaningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#DAE6F0',
    paddingTop: 4,
    paddingBottom: 10
  },
  avatar: {
    backgroundColor: 'gray',
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 4
  },
  userContainer: {
    flexDirection: 'row'
  },
  username: {
    marginLeft: 4,
    fontSize: 13,
    color: '#8999a5',
    marginTop: 2
  },
  name: {
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
