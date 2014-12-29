'use strict';

var chai = require('chai');
var NumericSetTransformer = require('../../../../lib/transformers/to_po/numeric_set_transformer');
var NumericSet = require('../../../../lib/collections/numeric_set');
var should = chai.should();

describe('Transformers', function() {

    describe('TypedObject to PlainObject', function() {

        describe('NumericSetTransformer', function() {

            beforeEach(function() {
                this.tr = new NumericSetTransformer();

                this.okObject = { NS: ['123', '1235.2'] };
                this.expectedOkObject = new NumericSet([123, 1235.2]);

                this.badObject = { SS: '123' };
            });

            describe('transform()', function() {

                it('Should transform binary set attributes', function() {
                    this.tr.transform(this.okObject).should.eql(this.expectedOkObject);
                });

                it('Should throw if any array item is not a number', function() {
                    should.Throw(function() {
                        this.tr.transform({ NS: ['123.5', 'a'] });
                    });
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
