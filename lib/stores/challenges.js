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

var challenges = {};

var ChallengesStore = Object.assign({}, EventEmitter2.prototype, {
  /**
   * Get a challenge by id
   * @param  {String} id - The id of the challenge
   * @return {Object}    - A promise resolved with the challenge
   */
  get(id) {
    return challenges[id] || request.get(`${BASE_URL}/challenges/${id}`);
  },
  /**
   * Get a user challenge by id and user-id (provided by header)
   * @param  {String} id - The id of the challenge
   * @return {Object}    - A promise resolved with the user challenge
   */
  me(id) {
    return request.get(`${BASE_URL}/challenges/${id}/me`);
  },

  /**
   * Get all user challenges for this challenge id
   * @param  {String} id - The id of the challenge
   * @return {Object}    - A promise resolved with the user challenge
   */
  all(id) {
    return request.get(`${BASE_URL}/challenges/${id}/all`);
  },
  /**
   * Update the list of challenges in the background
   */
  refreshLatest() {
    request
      .get(`${BASE_URL}/challenges`)
      .then((response) => {
        challenges = response.reduce((a,b,i)=>{
          a[b._id] = b;
          b.order=i;
          return a;
        }, {});
        this.emit('change');
      });
  },
  /**
   * Get the list of challenges
   * @return {Object} - A promise resolved with the list of challenges
   */
  getLatest() {
    if (!Object.keys(challenges).length) {
      this.refreshLatest();
    }
    return Object.keys(challenges).map((key)=>{
      return challenges[key];
    }).sort(function(a,b){
      return a.order>b.order;
    });
  },
  /**
   * Accept a challenge
   * @param  {String} id - The id of the challenge
   * @return {Object}    - A promise
   */
  accept(id) {
    return request.post(`${BASE_URL}/challenges/${id}/accept`, {}).then( (userChallenge) => {
      challenges[id] = null;
      this.emit('change');
      return this.get(id);
    });
  },
  /**
   * Finish a challenge
   * @param  {String} id - The id of the challenge
   * @return {Object}    - A promise
   */
  finish(id) {
    return request.post(`${BASE_URL}/challenges/${id}/finished`, {}).then( (userChallenge) => {
      challenges[id] = null;
      this.emit('change');
      return this.get(id);
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


ChallengesStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.actionType) {
  case 'notification':
    challenges[action.cid] = null; // clear cache so we aren't getting the old one

    ChallengesStore.get(action.cid).then((challenge) => {
      console.log('notification challenge', challenge);
      challenges[challenge._id] = challenge;
      ChallengesStore.emit('change');
    });

    // ChallengesStore.refreshLatest();
    break;
  }
  return true;
});

module.exports = ChallengesStore;
