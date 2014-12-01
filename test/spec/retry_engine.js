
'use strict';

var chai = require('chai');
var should = chai.should();
var sinon = require('sinon');
var RetryEngine = require('../../lib/retry_engine');
var BPromise = require('bluebird');

describe('RetryEngine', function() {
    this.timeout(100);

    executeCommonTests('batchGetItem');
    executeCommonTests('batchWriteItem');
    executeCommonTests('createTable');
    executeCommonTests('deleteItem');
    executeCommonTests('deleteTable');
    executeCommonTests('describeTable');
    executeCommonTests('getItem');
    executeCommonTests('listTables');
    executeCommonTests('putItem');
    executeCommonTests('query');
    executeCommonTests('scan');
    executeCommonTests('updateItem');
    executeCommonTests('updateTable');
    executeCommonTests('waitFor', ['tableExist', {value: 'val1'}]);
});

function executeCommonTests(methodName, callWithArgs) {
    describe(methodName + '()', function() {
        it('Should retry if retry policy states so', function(done) {
            var result = { data: 'data' };
            var args = callWithArgs ||  [{ value:'value' }];
            var error = {
                code: 'TestError'
            };

            var re = new RetryEngine();

            sinon.stub(re.$dependencies.policy, 'mustRetry').onFirstCall().returns(BPromise.resolve(true))
                                            .onSecondCall().returns(BPromise.resolve(false));

            sinon.stub(re.$dependencies.dynamoDB, methodName).onFirstCall().yields(error, null)
                .onSecondCall().yields(null, result);

            var dynamoMethod = re.$dependencies.dynamoDB[methodName];
            var dataArgs = args;
            var callback = function(err, data) {

                sinon.assert.calledTwice(dynamoMethod);
                sinon.assert.alwaysCalledWith.apply(sinon.assert, [dynamoMethod].concat(dataArgs));

                should.not.exist(err);
                data.should.equal(result);

                done();
            };

            args = args.concat(callback);
            re[methodName].apply(re, args);
        });

        it('Should not retry if retry policy states so', function(done) {
            var args = callWithArgs || [{ value:'value' }];

            var re = new RetryEngine();

            var error = { code: 'TestError' };

            sinon.stub(re.$dependencies.policy, 'mustRetry').onFirstCall().returns(BPromise.resolve(false));

            sinon.stub(re.$dependencies.dynamoDB, methodName).yields(error, null);

            var dynamoMethod = re.$dependencies.dynamoDB[methodName];
            var dataArgs = args;
            var callback = function(err) {

                sinon.assert.calledOnce(dynamoMethod);
                sinon.assert.alwaysCalledWith.apply(sinon.assert, [dynamoMethod].concat(dataArgs));
                err.should.equal(error);

                done();
            };
            args = args.concat(callback);

            re[methodName].apply(re, args);

        });
    });
}
