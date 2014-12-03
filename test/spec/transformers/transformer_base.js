'use strict';

var chai = require('chai');
var TransformerBase = require('../../../lib/transformers/transformer_base');
var should = chai.should();
var util = require('util');

describe('Transformers', function() {

    describe('TransformerBase', function() {

        describe('transform()', function() {

            it('Should throw an exception if isApplicable() returns false', function() {
                var result =  { O:'test' };
                var transformer = new TransformerImpl({ isApplicable: false, result: result});

                should.Throw(function() {
                    transformer.transform('test');
                });
            });

            it('Should return the value returned by the protected _transform method ' +
                'if isApplicable() returns true', function() {
                var result =  { O:'test' };
                var transformer = new TransformerImpl({ isApplicable: true, result: result});

                transformer.transform('test').should.eql(result);
            });
        });
    });

    describe('protected _transform()', function() {

        it('Should throw', function() {
            var transformer = new TransformerBase();

            should.Throw(function() {
                transformer._transform('test');
            });
        });
    });

    describe('isApplicable()', function() {

        it('Should throw', function() {
            var transformer = new TransformerBase();

            should.Throw(function() {
                transformer.isApplicable('test');
            });
        });
    });
});

function TransformerImpl(data) {
    this._isApplicable = data.isApplicable;
    this._result = data.result;
}

util.inherits(TransformerImpl, TransformerBase);

TransformerImpl.prototype._transform = function() {
    return this._result;
};

TransformerImpl.prototype.isApplicable = function() {
    return this._isApplicable;
};
