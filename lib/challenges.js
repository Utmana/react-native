/**
 * @flow
 */
'use strict';

var {
  BASE_URL
} = require('./config');
var request = require('./plugins/request');
var AppDispatcher = require('./dispatcher');
var EventEmitter2 = require('eventemitter2').EventEmitter2;

var challenges = [];

var ChallengesStore = Object.assign({}, EventEmitter2.prototype, {
  /**
   * Get a challenge by id
   * @param  {String} id - The id of the challenge
   * @return {Object}    - A promise resolved with the challenge
   */
  get(id) {
    return request.get(`${BASE_URL}/challenges/${id}`);
  },
  /**
   * Update the list of challenges in the background
   */
  refreshLatest() {
    request
      .get(`${BASE_URL}/challenges`)
      .then((response) => {
        challenges = response;
        this.emit('change');
      });
  },
  /**
   * Get the list of challenges
   * @return {Object} - A promise resolved with the list of challenges
   */
  getLatest() {
    if (!challenges.length) {
      this.refreshLatest();
    }
    return challenges;
  },
  /**
   * Accept a challenge
   * @param  {String} id - The id of the challenge
   * @return {Object}    - A promise
   */
  accept(id) {
    return request.post(`${BASE_URL}/challenges/${id}/accept`, {}).then( (userChallenge) => {
      console.log(userChallenge);
      return userChallenge;
    });
  },
  /**
   * Finish a challenge
   * @param  {String} id - The id of the challenge
   * @return {Object}    - A promise
   */
  finish(id) {
    return request.post(`${BASE_URL}/challenges/${id}/finished`, {}).then( (userChallenge) => {
      console.log(userChallenge);
      return userChallenge;
    });
  },
  /**
   * Create a challenge
   * @param  {Object} challenge             - The challenge to be created
   * @param  {String} challenge.title       - The title of the challenge
   * @param  {String} challenge.description - The summary of the challenge
   * @return {Object}                       - A promise resolved with the new challenge
   */
  create(challenge) {
    return request.post(`${BASE_URL}/challenges`, challenge);
  }
});


AppDispatcher.register(function (action) {
  switch (action.actionType) {
  case 'challenge':
    challenges.push(action.challenge);
    ChallengesStore.refreshLatest();
    break;
  }
  return true;
});

module.exports = ChallengesStore;
