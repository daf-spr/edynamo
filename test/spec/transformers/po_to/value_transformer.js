'use strict';

var chai = require('chai');
var ValueTransformer = require('../../../../lib/transformers/po_to/value_transformer');
var TransformerBase = require('../../../../lib/transformers/transformer_base');
var StringSet = require('../../../../lib/collections/string_set');
var NumericSet = require('../../../../lib/collections/numeric_set');
var BinarySet = require('../../../../lib/collections/binary_set');
var should = chai.should();

describe('Transformers', function() {
    describe('PlainObject to TypedObject', function() {
        describe('ValueTransformer', function() {

            beforeEach(function() {
                this.transformer = new ValueTransformer();
            });

            describe('construct()', function() {

                it('Should exist', function() {
                    should.exist(ValueTransformer);
                    ValueTransformer.should.be.a.function;
                });

            });

            describe('transform()', function() {

                it('Should be the base function', function() {
                    should.exist(this.transformer.transform);
                    this.transformer.transform.should.equal(TransformerBase.prototype.transform);
                });

                it('Should transform primitives', function() {
                    this.transformer.transform(1).should.eql({
                        N: '1'
                    });

                    this.transformer.transform('test').should.eql({
                        S: 'test'
                    });

                    this.transformer.transform(new Buffer('123')).should.eql({
                        B: new Buffer('123')
                    });

                    this.transformer.transform(new StringSet(['test1', 'test2'])).should.eql({
                        SS: ['test1', 'test2']
                    });

                    this.transformer.transform(new BinarySet([new Buffer('123')])).should.eql({
                        BS: [new Buffer('123')]
                    });

                    this.transformer.transform(new NumericSet([1, 2])).should.eql({
                        NS: ['1', '2']
                    });

                    this.transformer.transform(null).should.eql({
                        NULL: true
                    });

                    this.transformer.transform(false).should.eql({
                        BOOL: false
                    });
                });

                it('Should transform objects', function() {
                    this.transformer.transform({ key: 'test' }).should.eql({
                        M: { key: { S: 'test' } }
                    });
                });

                it('Should transform a list', function() {
                    this.transformer.transform([{ key: 'test' }, { key: 'test1' }]).should.eql({
                        L: [
                            { M: { key: { S: 'test' } } },
                            { M: { key: { S: 'test1' } } }
                        ]
                    });
                });

            });

            describe('isApplicable()', function() {

                it('Should return true for primitives', function() {
                    this.transformer.isApplicable(null).should.be.true;
                    this.transformer.isApplicable(1).should.be.true;
                    this.transformer.isApplicable('test').should.be.true;
                    this.transformer.isApplicable(new Buffer('123')).should.be.true;
                    this.transformer.isApplicable(new StringSet(['test1', 'test2'])).should.be.true;
                    this.transformer.isApplicable(new BinarySet([new Buffer('123')])).should.be.true;
                    this.transformer.isApplicable(new NumericSet([1, 2])).should.be.true;
                    this.transformer.isApplicable(false).should.be.true;
                });

                it('Should return true for a list', function() {
                    this.transformer.isApplicable({ key: 'test' }).should.be.true;
                });

                it('Should return true for a object', function() {
                    this.transformer.isApplicable([{ key: 'test' }, { key: 'test1' }]).should.be.true;
                });
            });
        });
    });

});
