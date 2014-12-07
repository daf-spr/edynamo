'use strict';

var chai = require('chai');
var SetBase = require('../../../lib/collections/set_base');
var NumericSet = require('../../../lib/collections/numeric_set');
var should = chai.should();

describe('Collections', function() {

    describe('NumericSet', function() {

        describe('constructor()', function() {

            it('Should be instance of SetBase', function() {
                var ns = new NumericSet();
                ns.should.be.instanceOf(SetBase);
            });

            it('Should have the original add and addAll methods', function() {
                var ns = new NumericSet();
                ns.add.should.equal(SetBase.prototype.add);
                ns.addAll.should.equal(SetBase.prototype.addAll);
            });
        });

        describe('add()', function() {

            it('Should accept numeric values', function() {
                var ns = new NumericSet();
                ns.add(2);
                ns.items.should.contain(2);
            });

            it('Should not accept non numeric values', function() {
                var ns = new NumericSet();

                should.Throw(function() {
                    ns.add('test');
                });

                ns.items.should.not.contain(2);
            });

            it('Should not add the same numeric more than once', function() {
                var ns = new NumericSet();
                ns.add(2);
                ns.add(2).should.be.false;
                ns.items.should.eql([2]);
            });
        });

        describe('addAll()', function() {

            it('Should accept numeric values', function() {
                var ns = new NumericSet();
                ns.addAll([2, 3]);
                ns.items.should.contain(2);
                ns.items.should.contain(3);
            });

            it('Should not accept non numeric values', function() {
                var ns = new NumericSet();

                should.Throw(function() {
                    ns.addAll(['test1', 'test2']);
                });

                ns.items.should.not.contain('test1');
                ns.items.should.not.contain('test2');
            });

            it('Should not add the same numeric more than once', function() {
                var ns = new NumericSet();

                ns.addAll([2, 2]).should.eql([true, false]);
                ns.items.should.eql([2]);
            });
        });

    });
});
