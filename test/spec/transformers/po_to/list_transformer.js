'use strict';

var chai = require('chai');
var ListTransformer = require('../../../../lib/transformers/po_to/list_transformer');
var BinarySet = require('../../../../lib/collections/binary_set');
var NumericSet = require('../../../../lib/collections/numeric_set');
var StringSet = require('../../../../lib/collections/string_set');
var should = chai.should();
var _ = require('lodash');

describe('Transformers', function() {

    describe('PlainObject to TypedObject', function() {

        describe('ListTransformer', function() {

            beforeEach(function() {
                this.tr = new ListTransformer();

                this.objectList = [
                    {
                        bin: new Buffer('123', 'utf8'),
                        bins: new BinarySet([new Buffer('123', 'utf8')]),
                        bool: true,
                        nil: null,
                        num: 123,
                        nums: new NumericSet([1, 2, 3]),
                        str: 'Hi',
                        strs: new StringSet(['Hello', 'World'])
                    },
                    {
                        bin: new Buffer('123', 'utf8'),
                        bins: new BinarySet([new Buffer('123', 'utf8')]),
                        bool: true,
                        nil: null,
                        num: 123,
                        nums: new NumericSet([1, 2, 3]),
                        str: 'Hi',
                        strs: new StringSet(['Hello', 'World 2'])
                    }
                ];

                this.expectedOLValueAttr = [
                    {
                        bin: { B: new Buffer('123', 'utf8') },
                        bins: { BS: [new Buffer('123', 'utf8')] },
                        bool: { BOOL: true },
                        nil: { NULL: true },
                        num: { N: '123' },
                        nums: { NS: ['1', '2', '3'] },
                        str: { S: 'Hi' },
                        strs: { SS: ['Hello', 'World'] }
                    },
                    {
                        bin: { B: new Buffer('123', 'utf8') },
                        bins: { BS: [new Buffer('123', 'utf8')] },
                        bool: { BOOL: true },
                        nil: { NULL: true },
                        num: { N: '123' },
                        nums: { NS: ['1', '2', '3'] },
                        str: { S: 'Hi' },
                        strs: { SS: ['Hello', 'World 2'] }
                    }
                ];

                this.expectedObjectListValue = [
                    { M: this.expectedOLValueAttr[0] },
                    { M: this.expectedOLValueAttr[1] }
                ];

                this.expectedObjectList = { L: this.expectedObjectListValue };

            });

            describe('constructor()', function() {

                it('Should exist', function() {
                    should.exist(ListTransformer);
                    ListTransformer.should.be.a.function;
                });

            });

            describe('transform()', function() {

                it('Should exist', function() {
                    should.exist(this.tr.transform);
                    this.tr.transform.should.be.a.function;
                });

                it('Should transform a list of objects', function() {
                    this.tr.transform(this.objectList).should.eql(this.expectedObjectList);
                });

                it('Should transform a list of list', function() {
                    this.tr.transform([this.objectList, this.objectList]).should.eql(
                        { L: [this.expectedObjectList, this.expectedObjectList] });
                });

                it('Should transform a list of binaries', function() {
                    this.tr.transform(_.pluck(this.objectList, 'bin')).should.eql(
                        { L: _.pluck(this.expectedOLValueAttr, 'bin') });
                });

                it('Should transform a list of binaries set', function() {
                    this.tr.transform(_.pluck(this.objectList, 'bins')).should.eql(
                        { L: _.pluck(this.expectedOLValueAttr, 'bins') });
                });

                it('Should transform a list of numbers', function() {
                    this.tr.transform(_.pluck(this.objectList, 'num')).should.eql(
                        { L: _.pluck(this.expectedOLValueAttr, 'num') });
                });

                it('Should transform a list of numeric sets', function() {
                    this.tr.transform(_.pluck(this.objectList, 'nums')).should.eql(
                        { L: _.pluck(this.expectedOLValueAttr, 'nums') });
                });

                it('Should transform a list of string', function() {
                    this.tr.transform(_.pluck(this.objectList, 'str')).should.eql(
                        { L: _.pluck(this.expectedOLValueAttr, 'str') });
                });

                it('Should transform a list of string sets', function() {
                    this.tr.transform(_.pluck(this.objectList, 'strs')).should.eql(
                        { L: _.pluck(this.expectedOLValueAttr, 'strs') });
                });

                it('Should transform a list of booleans', function() {
                    this.tr.transform(_.pluck(this.objectList, 'bool')).should.eql(
                        { L: _.pluck(this.expectedOLValueAttr, 'bool') });
                });

                it('Should transform a list of nulls', function() {
                    this.tr.transform(_.pluck(this.objectList, 'nil')).should.eql(
                        { L: _.pluck(this.expectedOLValueAttr, 'nil') });
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

                it('Should return true for arrays', function() {
                    return this.tr.isApplicable(this.objectList).should.be.true;
                });

                it('Should return false for null', function() {
                    return this.tr.isApplicable(null).should.be.false;
                });

                it('Should return false for objects other than arrays', function() {
                    return this.tr.isApplicable({}).should.be.false;
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
