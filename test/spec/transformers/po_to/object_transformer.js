'use strict';

var chai = require('chai');
var ObjectTransformer = require('../../../../lib/transformers/po_to/object_transformer');
var BinarySet = require('../../../../lib/collections/binary_set');
var NumericSet = require('../../../../lib/collections/numeric_set');
var StringSet = require('../../../../lib/collections/string_set');
var should = chai.should();

describe('Transformers', function() {

    describe('PlainObject to TypedObject', function() {

        describe('ObjectTransformer', function() {

            beforeEach(function() {
                this.tr = new ObjectTransformer();

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

                this.nestedObject = {
                    bin: new Buffer('123', 'utf8'),
                    bins: new BinarySet([new Buffer('123', 'utf8')]),
                    bool: true,
                    nil: null,
                    num: 123,
                    nums: new NumericSet([1, 2, 3]),
                    str: 'Hi',
                    strs: new StringSet(['Hello', 'World']),
                    obj:this.plainObject
                };

                this.expectedPlainObjectValue = {
                    bin: { B: new Buffer('123', 'utf8') },
                    bins: { BS: [new Buffer('123', 'utf8')] },
                    bool: { BOOL: true },
                    nil: { NULL: true },
                    num: { N: '123' },
                    nums: { NS: ['1', '2', '3'] },
                    str: { S: 'Hi' },
                    strs: { SS: ['Hello', 'World'] }
                };

                this.expectedPlainObject = { M: this.expectedPlainObjectValue };

                this.expectedNestedObjectValue = {
                    bin: { B: new Buffer('123', 'utf8') },
                    bins: { BS: [new Buffer('123', 'utf8')] },
                    bool: { BOOL: true },
                    nil: { NULL: true },
                    num: { N: '123' },
                    nums: { NS: ['1', '2', '3'] },
                    str: { S: 'Hi' },
                    strs: { SS: ['Hello', 'World'] },
                    obj: this.expectedPlainObject
                };

                this.expectedNestedObject = { M: this.expectedNestedObjectValue };
            });

            describe('constructor()', function() {

                it('Should exist', function() {
                    should.exist(ObjectTransformer);
                    ObjectTransformer.should.be.a.function;
                });

            });

            describe('transform()', function() {

                it('Should exist', function() {
                    should.exist(this.tr.transform);
                    this.tr.transform.should.be.a.function;
                });

                it('Should transform a plain object', function() {
                    this.tr.transform(this.plainObject).should.eql(this.expectedPlainObject);
                });

                it('Should transform nested objects', function() {
                    this.tr.transform(this.nestedObject).should.eql(this.expectedNestedObject);
                });

                it('Should throw for null', function() {
                    should.Throw(function() {
                        return this.tr.transform(null).should.be.false;
                    });
                });

                it('Should throw for Array', function() {
                    should.Throw(function() {
                        return this.tr.transform([]).should.be.false;
                    });
                });

                it('Should throw for BinarySet', function() {
                    should.Throw(function() {
                        return this.tr.transform(new BinarySet([new Buffer('123', 'utf8')])).should.be.false;
                    });
                });

                it('Should throw for NumericSet', function() {
                    should.Throw(function() {
                        return this.tr.transform(new NumericSet([1])).should.be.false;
                    });
                });

                it('Should throw for StringSet', function() {
                    should.Throw(function() {
                        return this.tr.transform(new StringSet(['Hi'])).should.be.false;
                    });
                });

                it('Should throw for numbers', function() {
                    should.Throw(function() {
                        return this.tr.transform(1).should.be.false;
                    });
                });

                it('Should throw for string', function() {
                    should.Throw(function() {
                        return this.tr.transform('hi').should.be.false;
                    });
                });

                it('Should throw for undefined', function() {
                    should.Throw(function() {
                        return this.tr.transform(undefined).should.be.false;
                    });
                });
            });

            describe('isApplicable()', function() {

                it('Should return true for objects other than array and null', function() {
                    return this.tr.isApplicable(this.plainObject).should.be.true;
                });

                it('Should return false for null', function() {
                    return this.tr.isApplicable(null).should.be.false;
                });

                it('Should return false for Array', function() {
                    return this.tr.isApplicable([]).should.be.false;
                });

                it('Should return false for BinarySet', function() {
                    return this.tr.isApplicable(new BinarySet([new Buffer('123', 'utf8')])).should.be.false;
                });

                it('Should return false for NumericSet', function() {
                    return this.tr.isApplicable(new NumericSet([1])).should.be.false;
                });

                it('Should return false for StringSet', function() {
                    return this.tr.isApplicable(new StringSet(['Hi'])).should.be.false;
                });

                it('Should return false for numbers', function() {
                    return this.tr.isApplicable(1).should.be.false;
                });

                it('Should return false for string', function() {
                    return this.tr.isApplicable('hi').should.be.false;
                });

                it('Should return false for undefined', function() {
                    return this.tr.isApplicable(undefined).should.be.false;
                });
            });
        });
    });
});
