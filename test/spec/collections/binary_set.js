'use strict';

var chai = require('chai');
var SetBase = require('../../../lib/collections/set_base');
var BinarySet = require('../../../lib/collections/binary_set');
var should = chai.should();

describe('Collections', function() {

    describe('BinarySet', function() {

        describe('constructor()', function() {

            it('Should be instance of SetBase', function() {
                var bs = new BinarySet();
                bs.should.be.instanceOf(SetBase);
            });

            it('Should have the original add and addAll methods', function() {
                var bs = new BinarySet();
                bs.add.should.equal(SetBase.prototype.add);
                bs.addAll.should.equal(SetBase.prototype.addAll);
            });
        });

        describe('add()', function() {

            it('Should accept binary values', function() {
                var bs = new BinarySet();
                var value = new Buffer('test');
                
                bs.add(value);
                bs.items.should.contain(value);
            });

            it('Should not accept non binary values', function() {
                var bs = new BinarySet();

                should.Throw(function() {
                    bs.add(2);
                });

                bs.items.should.not.contain(2);
            });

            it('Should not add the same binary more than once', function() {
                var bs = new BinarySet();
                var value = new Buffer('test');

                bs.add(value);
                bs.add(value).should.be.false;
                bs.items.should.eql([value]);
            });
        });

        describe('addAll()', function() {

            it('Should accept binary values', function() {
                var bs = new BinarySet();
                var value1 = new Buffer('test1');
                var value2 = new Buffer('test2');

                bs.addAll([value1, value2]);
                bs.items.should.contain(value1);
                bs.items.should.contain(value2);
            });

            it('Should not accept non binary values', function() {
                var bs = new BinarySet();

                should.Throw(function() {
                    bs.addAll([1, 2]);
                });

                bs.items.should.not.contain(1);
                bs.items.should.not.contain(2);
            });

            it('Should not add the same binary more than once', function() {
                var bs = new BinarySet();
                var value1 = new Buffer('test');
                var value2 = new Buffer('test');

                bs.addAll([value1, value2]).should.eql([true, false]);
                bs.items.should.eql([value1]);
            });
        });

    });
});
