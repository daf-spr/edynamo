'use strict';

var chai = require('chai');
var BinarySetTransformer = require('../../../../lib/transformers/to_po/binary_set_transformer');
var BinarySet = require('../../../../lib/collections/binary_set');
var should = chai.should();

describe('Transformers', function() {

    describe('TypedObject to PlainObject', function() {

        describe('BinarySetTransformer', function() {

            beforeEach(function() {
                this.tr = new BinarySetTransformer();

                this.okObject = { BS: [new Buffer('123'), new Buffer('1234')] };
                this.expectedOkObject = new BinarySet([new Buffer('123'), new Buffer('1234')]);

                this.badObject = { SS: '123' };
            });

            describe('transform()', function() {

                it('Should transform binary set attributes', function() {
                    this.tr.transform(this.okObject).should.eql(this.expectedOkObject);
                });

                it('Should throw for non binary set attributes', function() {
                    should.Throw(function() {
                        this.tr.transform(this.badObject);
                    });
                });

            });

            describe('isApplicable()', function() {

                it('Should exist', function() {
                    should.exist(this.tr.isApplicable);
                });

                it('Should return true for binary set attributes', function() {
                    this.tr.isApplicable(this.okObject).should.be.true;
                });

                it('Should return false for non binary set attributes', function() {
                    this.tr.isApplicable(this.badObject).should.be.false;
                });
            });

        });
    });

});
