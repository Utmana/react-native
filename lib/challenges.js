/**
 * @flow
 */
'use strict';
var {
  BASE_URL
} = require('./config');
var request = require('./plugins/request');

module.exports = {
  /**
   * Get a challenge by id
   * @param  {String} id - The id of the challenge
   * @return {Object}    - A promise resolved with the challenge
   */
  get(id) {
    return request.get(`${BASE_URL}/challenges/${id}`);
  },
  /**
   * Get the list of challenges
   * @return {Object} - A promise resolved with the list of challenges
   */
  getLatest() {
    return request
      .get(`${BASE_URL}/challenges`)
      .then((response) => {
        return response;
      });
  },
  /**
   * Accept a challenge
   * @param  {String} id - The id of the challenge
   * @return {Object}    - A promise
   */
  accept(id) {
    return request.post(`${BASE_URL}/challenges/${id}/accept`, {});
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
};
