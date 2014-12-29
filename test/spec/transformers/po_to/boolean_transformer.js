'use strict';

var chai = require('chai');
var BooleanTransformer = require('../../../../lib/transformers/po_to/boolean_transformer');
var TransformerBase = require('../../../../lib/transformers/transformer_base');
var should = chai.should();

describe('Transformers', function() {
    describe('PlainObject to TypedObject', function() {
        describe('BooleanTransformer', function() {

            beforeEach(function() {
                this.transformer = new BooleanTransformer();
            });

            describe('construct()', function() {

                it('Should exist', function() {
                    should.exist(BooleanTransformer);
                    BooleanTransformer.should.be.a.function;
                });

            });

            describe('transform()', function() {

                it('Should be the base function', function() {
                    should.exist(this.transformer.transform);
                    this.transformer.transform.should.equal(TransformerBase.prototype.transform);
                });

                it('Should transform boolean value', function() {
                    this.transformer.transform(true).should.eql({ BOOL: true });
                    this.transformer.transform(false).should.eql({ BOOL: false });
                });

                it('Should throw an exception for null', function() {
                    var self = this;

                    should.Throw(function() {
                        self.transformer.transform(null);
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

                it('Should return true for a boolean', function() {
                    this.transformer.isApplicable(true).should.be.true;
                    this.transformer.isApplicable(false).should.be.true;
                });

                it('Should return false for null', function() {
                    var self = this;

                    self.transformer.isApplicable(null).should.be.false;
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
