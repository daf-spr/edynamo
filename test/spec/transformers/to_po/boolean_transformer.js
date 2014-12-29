'use strict';

var chai = require('chai');
var BooleanTransformer = require('../../../../lib/transformers/to_po/boolean_transformer');
var should = chai.should();

describe('Transformers', function() {

    describe('TypedObject to PlainObject', function() {

        describe('BooleanTransformer', function() {

            beforeEach(function() {
                this.tr = new BooleanTransformer();

                this.okObject = { BOOL: false };
                this.expectedOkObject = false;

                this.badObject = { SS: '123' };
            });

            describe('transform()', function() {

                it('Should transform boolean attributes', function() {
                    this.tr.transform(this.okObject).should.eql(this.expectedOkObject);
                });

                it('Should throw for non boolean attributes', function() {
                    should.Throw(function() {
                        this.tr.transform(this.badObject);
                    });
                });

            });

            describe('isApplicable()', function() {

                it('Should exist', function() {
                    should.exist(this.tr.isApplicable);
                });

                it('Should return true for boolean attributes', function() {
                    this.tr.isApplicable(this.okObject).should.be.true;
                });

                it('Should return false for non boolean attributes', function() {
                    this.tr.isApplicable(this.badObject).should.be.false;
                });
            });

        });
    });

});
