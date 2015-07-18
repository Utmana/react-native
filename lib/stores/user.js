/**
 * @flow
 */
'use strict';

var {
  BASE_URL
} = require('../config');
var request = require('../plugins/request');
var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter2 = require('eventemitter2').EventEmitter2;

var userChallenges = [];

var UserStore = Object.assign({}, EventEmitter2.prototype, {
  /**
   * Get a user object based on id
   * @param  {String} id - The id of the user
   * @return {Object}    - A promise resolved with the user
   */
  get(id) {
    return request.get(`${BASE_URL}/user/${id}`);
  },
  /**
   * Get the current user
   * @return {Object}    - A promise resolved with the user
   */
  me(id) {
    return request.get(`${BASE_URL}/user/me`);
  },

  /**
   * Get all user challenges accepted by the current user
   * @return {Array}    - A promise resolved with all the current user challenges
   */
  challenges(id) {
    return request.get(`${BASE_URL}/user/me/challenges`);
  }

});


AppDispatcher.register(function (action) {
  switch (action.actionType) {
  case 'user':
    // TODO: trigger event
    break;
  }
  return true;
});

module.exports = UserStore;
