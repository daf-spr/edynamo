'use strict';

var AWS = require('aws-sdk');
var BPromise = require('bluebird');

function Promisifier() {
    this.$dependencies = {
        dynamoDB: new AWS.DynamoDB()
    };
}

Promisifier._wrap = function(methodName) {

    return function() {
        var self = this;

        return BPromise.promisify(self.$dependencies.dynamoDB[methodName],
            self.$dependencies.dynamoDB).apply(self, arguments);
    };
};

Promisifier._createWrapperFunction = function(methodName) {
    Promisifier.prototype[methodName] = Promisifier._wrap(methodName);
};

Promisifier._createWrapperFunction('batchGetItem');
Promisifier._createWrapperFunction('batchWriteItem');
Promisifier._createWrapperFunction('createTable');
Promisifier._createWrapperFunction('deleteItem');
Promisifier._createWrapperFunction('deleteTable');
Promisifier._createWrapperFunction('describeTable');
Promisifier._createWrapperFunction('getItem');
Promisifier._createWrapperFunction('listTables');
Promisifier._createWrapperFunction('putItem');
Promisifier._createWrapperFunction('query');
Promisifier._createWrapperFunction('scan');
Promisifier._createWrapperFunction('updateItem');
Promisifier._createWrapperFunction('updateTable');
Promisifier._createWrapperFunction('waitFor');

module.exports = Promisifier;
