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
   * Gets a challenge by it's id
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
   * Accepts a challenge
   * @param  {String} id - The id of the challenge
   * @return {Object}    - A promise
   */
  accept(id) {
    return request.post(`${BASE_URL}/challenges/${id}/accept`, {});
  }
};
