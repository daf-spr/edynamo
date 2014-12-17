'use strict';

var chai = require('chai');
var NullTransformer = require('../../../../lib/transformers/po_to/null_transformer');
var TransformerBase = require('../../../../lib/transformers/transformer_base');
var should = chai.should();

describe('Transformers', function() {
    describe('PlainObject to TypedObject', function() {
        describe('Null', function() {

            beforeEach(function() {
                this.transformer = new NullTransformer();
            });

            describe('construct()', function() {

                it('Should exist', function() {
                    should.exist(NullTransformer);
                    NullTransformer.should.be.a.function;
                });

            });

            describe('transform()', function() {

                it('Should be the base function', function() {
                    should.exist(this.transformer.transform);
                    this.transformer.transform.should.equal(TransformerBase.prototype.transform);
                });

                it('Should transform null value', function() {
                    this.transformer.transform(null).should.eql({ NULL: true });
                });

                it('Should throw an exception for boolean', function() {
                    var self = this;

                    should.Throw(function() {
                        self.transformer.transform(true);
                    });
                });

                it('Should throw an exception for undefined', function() {
                    var self = this;

                    should.Throw(function() {
                        self.transformer.transform(undefined);
                    });
                });

                it('Should throw an exception for an string', function() {
                    var self = this;

                    should.Throw(function() {
                        self.transformer.transform('test');
                    });
                });

                it('Should throw an exception for a number', function() {
                    var self = this;

                    should.Throw(function() {
                        self.transformer.transform(1);
                    });
                });

                it('Should throw an exception for a object', function() {
                    var self = this;

                    should.Throw(function() {
                        self.transformer.transform({ 'test':'test1' });
                    });
                });

                it('Should throw an exception for a buffer', function() {
                    var self = this;

                    should.Throw(function() {
                        self.transformer.transform(new Buffer('test'));
                    });
                });
            });

            describe('isApplicable()', function() {

                it('Should return true for a null', function() {
                    this.transformer.isApplicable(null).should.be.true;
                });

                it('Should return false for a boolean', function() {
                    var self = this;

                    self.transformer.isApplicable(false).should.be.false;
                });

                it('Should return false for undefined', function() {
                    var self = this;

                    self.transformer.isApplicable(undefined).should.be.false;
                });

                it('Should return false for an string', function() {
                    var self = this;

                    self.transformer.isApplicable('test').should.be.false;
                });

                it('Should return false for a number', function() {
                    var self = this;

                    self.transformer.isApplicable(1).should.be.false;
                });

                it('Should return false for a object', function() {
                    var self = this;

                    self.transformer.isApplicable({ 'test':'test1' }).should.be.false;
                });

                it('Should return false for a buffer', function() {
                    var self = this;

                    self.transformer.isApplicable(new Buffer('test')).should.be.false;
                });

            });
        });
    });

});
