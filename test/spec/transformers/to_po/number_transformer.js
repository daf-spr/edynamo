'use strict';

var chai = require('chai');
var NumberTransformer = require('../../../../lib/transformers/to_po/number_transformer');
var should = chai.should();

describe('Transformers', function() {

    describe('TypedObject to PlainObject', function() {

        describe('NumberTransformer', function() {

            beforeEach(function() {
                this.tr = new NumberTransformer();

                this.okObject = { N: '01.51' };
                this.expectedOkObject = 1.51;

                this.badObject = { SS: '123' };
            });

            describe('transform()', function() {

                it('Should transform float attributes', function() {
                    this.tr.transform(this.okObject).should.eql(this.expectedOkObject);
                });

                it('Should transform interger attributes', function() {
                    this.tr.transform({ N:'2' }).should.eql(2);
                });

                it('Should transform zero-prefixed interger attributes', function() {
                    this.tr.transform({ N: '011' }).should.eql(11);
                });

                it('Should throw for non number attributes', function() {
                    should.Throw(function() {
                        this.tr.transform(this.badObject);
                    });
                });

            });

            describe('isApplicable()', function() {

                it('Should exist', function() {
                    should.exist(this.tr.isApplicable);
                });

                it('Should return true for number attributes', function() {
                    this.tr.isApplicable(this.okObject).should.be.true;
                });

                it('Should return false for non number attributes', function() {
                    this.tr.isApplicable(this.badObject).should.be.false;
                });
            });

        });
    });

});
