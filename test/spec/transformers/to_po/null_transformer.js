'use strict';

var chai = require('chai');
var NullTransformer = require('../../../../lib/transformers/to_po/null_transformer');
var should = chai.should();

describe('Transformers', function() {

    describe('TypedObject to PlainObject', function() {

        describe('NullTransformer', function() {

            beforeEach(function() {
                this.tr = new NullTransformer();

                this.okObject = { NULL: true };

                this.badObject = { SS: '123' };
            });

            describe('transform()', function() {

                it('Should transform null attributes', function() {
                    should.not.exist(this.tr.transform(this.okObject));
                });

                it('Should throw for non null attributes', function() {
                    should.Throw(function() {
                        this.tr.transform(this.badObject);
                    });
                });

            });

            describe('isApplicable()', function() {

                it('Should exist', function() {
                    should.exist(this.tr.isApplicable);
                });

                it('Should return true for null attributes', function() {
                    this.tr.isApplicable(this.okObject).should.be.true;
                });

                it('Should return false for non null attributes', function() {
                    this.tr.isApplicable(this.badObject).should.be.false;
                });
            });

        });
    });

});
