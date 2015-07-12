'use strict';
var React = require('react-native');
var device = require('./device');

function makeRequest(options, deviceId) {
  return new Promise(function executor(resolve, reject) {
    if (!deviceId) {
      return reject('Not a real device id');
    }

    var request = new XMLHttpRequest();

    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        resolve(JSON.parse(request.responseText));
      } else {
        reject('error');
      }
    };

    request.open(options.method, options.url);

    if (options.headers) {
      Object.keys(options.headers).forEach(function (header) {
        request.setRequestHeader(header, options.headers[header]);
      });
    }
    // TODO: fix a proper authentication token, not just a device id
    request.setRequestHeader('userId', deviceId);

    if (options.body) {
      request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      request.send(JSON.stringify(options.body));
    } else {
      request.send();
    }
  });
}

function sendRequest(options) {
  return device.getId()
    .then(makeRequest.bind(null, options));
}

module.exports = {
  get(url, options) {
    return sendRequest({
      url: url,
      method: 'GET'
    });
  },
  post(url, data) {
    return sendRequest({
      url: url,
      method: 'POST',
      body: data
    });

  },
  put(url, data) {
    return sendRequest({
      url: url,
      method: 'PUT',
      body: data
    });

  },
  del(url, data) {
    return sendRequest({
      url: url,
      method: 'DELETE',
      body: data
    });
  }
};
