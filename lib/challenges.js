/**
 * @flow
 */
'use strict';
var {
  BASE_URL
} = require('./config');
var request = require('./plugins/request');

module.exports = {
  getLatest() {
    return request
      .get(`${BASE_URL}/challenges`)
      .then((response) => {
        return response;
      });
  }
};
