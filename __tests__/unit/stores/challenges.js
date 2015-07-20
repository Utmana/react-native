'use strict';
/*jshint expr:true */

var chai = require('chai');
var expect = chai.expect;
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var sinonPromise = require('sinon-promise');
var mocks = require('./challengesMocks.json');
chai.use(require('sinon-chai'));

describe('/stores/challenges', function () {
  var challenges;
  var config;
  var request;
  var dispatcher;

  before(function () {
    sinonPromise(sinon);
  });

  beforeEach(function () {
    config = {
      BASE_URL: 'http://api'
    };
    request = {
      get: sinon.promise(),
      '@noCallThru': true
    };
    dispatcher = {
      register: sinon.stub(),
    };
    challenges = proxyquire(process.cwd() + '/lib/stores/challenges', {
      '../config': config,
      '../plugins/request': request,
      '../dispatcher': dispatcher
    });
  });

  describe('#all', function () {
    it('gets all user challenges for a specified challenge id', function () {
      challenges.users('123');

      expect(request.get)
        .calledOnce
        .calledWith('http://api/challenges/123/all');
    });

    it('then sorts the challenges ascending, first those with a finished date and then on accepted', function () {
      var success = sinon.spy();
      challenges
        .users('123')
        .then(success);


      // resolve the request.get promise
      request.get.resolve(mocks.userChallenges);
      expect(success.firstCall.args[0]).to.eql(mocks.sortedUserChallenges);
    });
  });
});
