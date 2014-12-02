
'use strict';

var chai = require('chai');
var sinon = require('sinon');
var Promisifier = require('../../lib/promisifier');
var chaiAsProised = require('chai-as-promised');

chai.use(chaiAsProised);
chai.should();

describe('Promisifier', function() {
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
    callWithArgs = callWithArgs || [{ value:'1' }];

    describe(methodName + '()', function() {

        it('Should resolve the promise if callback is called without any error', function() {
            var promisifier = new Promisifier();
            var expectedResult = { value: '1' };

            sinon.stub(promisifier.$dependencies.dynamoDB, methodName).yields(null, expectedResult);

            var result = promisifier[methodName].apply(promisifier, callWithArgs);

            result.should.respondTo('then');

            return result.should.be.fulfilled.and.eventually.equal(expectedResult);
        });

        it('Should reject the promise if callback is called with errors', function() {
            var promisifier = new Promisifier();
            var expectedError = new TypeError('Test');

            sinon.stub(promisifier.$dependencies.dynamoDB, methodName).yields(expectedError, null);

            var result = promisifier[methodName].apply(promisifier, callWithArgs);

            result.should.respondTo('then');

            return result.should.be.rejected.and.eventually.eql(expectedError);
        });

    });

}
