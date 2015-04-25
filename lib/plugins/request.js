'use strict';

function makeRequest(options) {
  return new Promise(function executor(resolve, reject) {
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

    request.send();
  });
}

module.exports = {
  get(url) {
    return makeRequest({
      url: url,
      method: 'GET'
    });
  },
  post(url, data) {
    return makeRequest({
      url: url,
      method: 'POST',
      body: data
    });

  },
  put(url, data) {
    return makeRequest({
      url: url,
      method: 'PUT',
      body: data
    });

  },
  del(url, data) {
    return makeRequest({
      url: url,
      method: 'DELETE',
      body: data
    });
  }
};