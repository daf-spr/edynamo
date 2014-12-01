'use strict';

var AWS = require('aws-sdk');
var AlwaysRetryPolicy = require('./retry_policies/always_retry_policy');
var _ = require('lodash');
var BPromise = require('bluebird');

function RetryEngine() {
    this.$dependencies = {
        dynamoDB: new AWS.DynamoDB(),
        policy: new AlwaysRetryPolicy()
    };
}

RetryEngine._createWrapperFunction = function(methodName) {
    RetryEngine.prototype[methodName] = RetryEngine._wrap(methodName);
};

RetryEngine._wrap = function(methodName) {

    return function() {
        var self = this;
        var dynamoDB = self.$dependencies.dynamoDB;
        var providedArgs = _.toArray(arguments);
        var providedCallback = providedArgs[providedArgs.length - 1];
        var newParams = providedArgs.slice(0, providedArgs.length - 1);

        var newCallback = function(err, data) {
            var policy = self.$dependencies.policy;

            BPromise.cast(policy.mustRetry(err, methodName, newParams))
            .then(function(mustRetry) {
                if (err) {
                    if (mustRetry) {
                        return self[methodName].apply(self, providedArgs);
                    } else {
                        return providedCallback(err, data);
                    }
                } else {
                    return providedCallback(err, data);
                }
            });
        };

        var newArgs = newParams.concat(newCallback);

        return dynamoDB[methodName].apply(dynamoDB, newArgs);
    };
};

RetryEngine._createWrapperFunction('batchGetItem');
RetryEngine._createWrapperFunction('batchWriteItem');
RetryEngine._createWrapperFunction('createTable');
RetryEngine._createWrapperFunction('deleteItem');
RetryEngine._createWrapperFunction('deleteTable');
RetryEngine._createWrapperFunction('describeTable');
RetryEngine._createWrapperFunction('getItem');
RetryEngine._createWrapperFunction('listTables');
RetryEngine._createWrapperFunction('putItem');
RetryEngine._createWrapperFunction('query');
RetryEngine._createWrapperFunction('scan');
RetryEngine._createWrapperFunction('updateItem');
RetryEngine._createWrapperFunction('updateTable');
RetryEngine._createWrapperFunction('waitFor');

module.exports = RetryEngine;
