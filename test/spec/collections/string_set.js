'use strict';

var chai = require('chai');
var SetBase = require('../../../lib/collections/set_base');
var StringSet = require('../../../lib/collections/string_set');
var should = chai.should();

describe('Collections', function() {

    describe('StringSet', function() {

        describe('constructor()', function() {

            it('Should be instance of SetBase', function() {
                var ss = new StringSet();
                ss.should.be.instanceOf(SetBase);
            });

            it('Should have the original add and addAll methods', function() {
                var ss = new StringSet();
                ss.add.should.equal(SetBase.prototype.add);
                ss.addAll.should.equal(SetBase.prototype.addAll);
            });
        });

        describe('add()', function() {

            it('Should accept string values', function() {
                var ss = new StringSet();
                ss.add('test');
                ss.items.should.contain('test');
            });

            it('Should not accept non string values', function() {
                var ss = new StringSet();

                should.Throw(function() {
                    ss.add(2);
                });

                ss.items.should.not.contain(2);
            });

            it('Should not add the same string more than once', function() {
                var ss = new StringSet();
                ss.add('test');
                ss.add('test').should.be.false;
                ss.items.should.eql(['test']);
            });
        });

        describe('addAll()', function() {

            it('Should accept string values', function() {
                var ss = new StringSet();
                ss.addAll(['test1', 'test2']);
                ss.items.should.contain('test1');
                ss.items.should.contain('test2');
            });

            it('Should not accept non string values', function() {
                var ss = new StringSet();

                should.Throw(function() {
                    ss.addAll([1, 2]);
                });

                ss.items.should.not.contain(1);
                ss.items.should.not.contain(2);
            });

            it('Should not add the same string more than once', function() {
                var ss = new StringSet();

                ss.addAll(['test1', 'test1']).should.eql([true, false]);
                ss.items.should.eql(['test1']);
            });
        });

    });
});
