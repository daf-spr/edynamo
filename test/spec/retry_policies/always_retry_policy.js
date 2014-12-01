'use strict';

var chai = require('chai');
var AlwaysRetryPolicy = require('../../../lib/retry_policies/always_retry_policy');

chai.should();

describe('Retry Policies', function() {
    describe('AlwaysRetryPolicy', function() {

        describe('mustRetry()', function() {

            it('Should return true if the number of times that the function ' +
                'has been called with the same methodName, params and error ' +
                'are <= limit', function() {
                var policy = new AlwaysRetryPolicy({ limit: 2 });
                var error = {
                    code: 'error'
                };
                var value = { val: 1 };

                policy.mustRetry(error, 'method', value).should.be.true;
                policy.mustRetry(error, 'method', value).should.be.true;
            });

            it('Should return false if the number of times that the function ' +
                'has been called with the same methodName, params and error ' +
                'are >= limit', function() {
                var policy = new AlwaysRetryPolicy({ limit: 2 });
                var error = {
                    code: 'error'
                };
                var value = { val: 1 };

                policy.mustRetry(error, 'method', value);
                policy.mustRetry(error, 'method', value);
                policy.mustRetry(error, 'method', value).should.be.false;
                policy.mustRetry(error, 'method', value).should.be.false;
            });

            it('Should use name as error id if code is not available, but ' +
                'code if it is available', function() {
                var policy = new AlwaysRetryPolicy({ limit: 2 });
                var error1 = {
                    name:'error123'
                };
                var error2 = {
                    name:'other',
                    code:'error123'
                };
                var value = { val: 1 };

                policy.mustRetry(error1, 'method', value);
                policy.mustRetry(error2, 'method', value);
                policy.mustRetry(error1, 'method', value).should.be.false;
                policy.mustRetry(error2, 'method', value).should.be.false;
            });

            it('Should return true if mustRetry has been been called with ' +
                'different errors a number of times >= limit even if method ' +
                'and params were the same', function() {
                var policy = new AlwaysRetryPolicy({ limit: 2 });
                var error1 = {
                    code:'error1'
                };
                var error2 = {
                    code:'error2'
                };
                var value = { val: 1 };

                policy.mustRetry(error1, 'method', value);
                policy.mustRetry(error2, 'method', value);
                policy.mustRetry(error2, 'method', value);
                policy.mustRetry(error1, 'method', value).should.be.true;
                policy.mustRetry(error2, 'method', value).should.be.false;
            });

            it('Should return true if mustRetry has been been called with ' +
                'different methodNames a number of times >= limit even if ' +
                'error and params were the same', function() {
                var policy = new AlwaysRetryPolicy({ limit: 2 });
                var error = {
                    code:'error1'
                };
                var value = { val: 1 };

                policy.mustRetry(error, 'method1', value);
                policy.mustRetry(error, 'method2', value);
                policy.mustRetry(error, 'method2', value);
                policy.mustRetry(error, 'method1', value).should.be.true;
                policy.mustRetry(error, 'method2', value).should.be.false;
            });

            it('Should return true if mustRetry has been been called with ' +
                'different params a number of times >= limit even if error ' +
                'and method were the same', function() {
                var policy = new AlwaysRetryPolicy({ limit: 2 });
                var error = {
                    code:'error1'
                };
                var params1 = [{ val: 1 }];
                var params2 = [{ val: 2 }];

                policy.mustRetry(error, 'method', params1);
                policy.mustRetry(error, 'method', params2);
                policy.mustRetry(error, 'method', params2);
                policy.mustRetry(error, 'method', params1).should.be.true;
                policy.mustRetry(error, 'method', params2).should.be.false;
            });
        });

    });
});
