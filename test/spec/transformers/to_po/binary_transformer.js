'use strict';

var chai = require('chai');
var BinaryTransformer = require('../../../../lib/transformers/to_po/binary_transformer');
var should = chai.should();

describe('Transformers', function() {

    describe('TypedObject to PlainObject', function() {

        describe('BinaryTransformer', function() {

            beforeEach(function() {
                this.tr = new BinaryTransformer();

                this.okObject = { B: new Buffer('123') };
                this.expectedOkObject = new Buffer('123');

                this.badObject = { S: '123' };
            });

            describe('transform()', function() {

                it('Should transform binary attributes', function() {
                    this.tr.transform(this.okObject).should.eql(this.expectedOkObject);
                });

                it('Should throw for non binary attributes', function() {
                    should.Throw(function() {
                        this.tr.transform(this.badObject);
                    });
                });

            });

            describe('isApplicable()', function() {

                it('Should exist', function() {
                    should.exist(this.tr.isApplicable);
                });

                it('Should return true for binary attributes', function() {
                    this.tr.isApplicable(this.okObject).should.be.true;
                });

                it('Should return false for non binary attributes', function() {
                    this.tr.isApplicable(this.badObject).should.be.false;
                });
            });

        });
    });

});
