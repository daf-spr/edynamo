'use strict';

var chai = require('chai');
var PrimitiveValueTransformer = require('../../../../lib/transformers/po_to/primitive_value_transformer');
var BinarySet = require('../../../../lib/collections/binary_set');
var NumericSet = require('../../../../lib/collections/numeric_set');
var StringSet = require('../../../../lib/collections/string_set');
var should = chai.should();

describe('Transformers', function() {

    describe('PlainObject to TypedObject', function() {

        describe('PrimitiveValueTransformer', function() {

            beforeEach(function() {
                this.tr = new PrimitiveValueTransformer();

                this.plainObject = {
                    bin: new Buffer('123', 'utf8'),
                    bins: new BinarySet([new Buffer('123', 'utf8')]),
                    bool: true,
                    nil: null,
                    num: 123,
                    nums: new NumericSet([1, 2, 3]),
                    str: 'Hi',
                    strs: new StringSet(['Hello', 'World'])
                };

                this.expectedPlainObject = {
                    bin: {
                        B: new Buffer('123', 'utf8')
                    },
                    bins: {
                        BS: [new Buffer('123', 'utf8')]
                    },
                    bool: {
                        BOOL: true
                    },
                    nil: {
                        NULL: true
                    },
                    num: {
                        N: '123'
                    },
                    nums: {
                        NS: ['1', '2', '3']
                    },
                    str: {
                        S: 'Hi'
                    },
                    strs: {
                        SS: ['Hello', 'World']
                    }
                };

            });

            describe('constructor()', function() {

                it('Should exist', function() {
                    should.exist(PrimitiveValueTransformer);
                    PrimitiveValueTransformer.should.be.a.function;
                });

            });

            describe('transform()', function() {

                it('Should exist', function() {
                    should.exist(this.tr.transform);
                    this.tr.transform.should.be.a.function;
                });

                it('Should transform a buffer', function() {
                    this.tr.transform(this.plainObject.bin).should.eql(this.expectedPlainObject.bin);
                });

                it('Should transform a buffer set', function() {
                    this.tr.transform(this.plainObject.bins).should.eql(this.expectedPlainObject.bins);
                });

                it('Should transform a bool', function() {
                    this.tr.transform(this.plainObject.bool).should.eql(this.expectedPlainObject.bool);
                });

                it('Should transform null', function() {
                    this.tr.transform(this.plainObject.nil).should.eql(this.expectedPlainObject.nil);
                });

                it('Should transform a num', function() {
                    this.tr.transform(this.plainObject.num).should.eql(this.expectedPlainObject.num);
                });

                it('Should transform a numeric set', function() {
                    this.tr.transform(this.plainObject.nums).should.eql(this.expectedPlainObject.nums);
                });

                it('Should transform a string', function() {
                    this.tr.transform(this.plainObject.str).should.eql(this.expectedPlainObject.str);
                });

                it('Should transform a string set', function() {
                    this.tr.transform(this.plainObject.strs).should.eql(this.expectedPlainObject.strs);
                });

                it('Should throw for undefined', function() {
                    should.Throw(function() {
                        return this.tr.transform(undefined);
                    });
                });

                it('Should throw for an object not array', function() {
                    should.Throw(function() {
                        return this.tr.transform({});
                    });
                });

                it('Should throw for an array', function() {
                    should.Throw(function() {
                        return this.tr.transform([]);
                    });
                });
            });

            describe('isApplicable()', function() {

                it('Should return true for a buffer', function() {
                    this.tr.isApplicable(this.plainObject.bin).should.be.true;
                });

                it('Should return true for a buffer set', function() {
                    this.tr.isApplicable(this.plainObject.bins).should.be.true;
                });

                it('Should return true for a bool', function() {
                    this.tr.isApplicable(this.plainObject.bool).should.be.true;
                });

                it('Should return true for null', function() {
                    this.tr.isApplicable(this.plainObject.nil).should.be.true;
                });

                it('Should return true for a num', function() {
                    this.tr.isApplicable(this.plainObject.num).should.be.true;
                });

                it('Should return true for a numeric set', function() {
                    this.tr.isApplicable(this.plainObject.nums).should.be.true;
                });

                it('Should return true for a string', function() {
                    this.tr.isApplicable(this.plainObject.str).should.be.true;
                });

                it('Should return true for a string set', function() {
                    this.tr.isApplicable(this.plainObject.strs).should.be.true;
                });

                it('Should return false for undefined', function() {
                    return this.tr.isApplicable(undefined).should.be.false;
                });

                it('Should return false for object not array', function() {
                    return this.tr.isApplicable({}).should.be.false;
                });

                it('Should return false for array', function() {
                    return this.tr.isApplicable([]).should.be.false;
                });
            });
        });
    });
});
