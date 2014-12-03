'use strict';

var chai = require('chai');
var SetBase = require('../../../lib/collections/set_base');
var should = chai.should();
var util = require('util');

describe('Collections', function() {

    describe('SetBase', function() {

        describe('constructor()', function() {
            it('Should create an empty set if first argument is not defined', function() {
                var set = new SetBaseImpl();

                set.items.should.be.empty;
            });

            it('Should add all items if all items are of the accepted type', function() {
                var expected = ['a', 'b', 'c'];
                var set = new SetBaseImpl(expected);

                set.items.should.eql(expected);
            });

            it('Should throw an exception if at least one item is not of the correct type', function() {
                should.Throw(function() {
                    new SetBaseImpl(['a', 'b', 1, 'c']); // jshint ignore:line
                });
            });
        });

        describe('add()', function() {

            it('Should add the item and return true if item was not in the set and it is of the accepted ' +
                'type', function() {
                var set = new SetBaseImpl();

                set.add('a').should.be.true;
                set.items.should.include('a');
            });

            it('Should add the item and return false if item was in the set and it is of the accepted ' +
                'type', function() {
                var set = new SetBaseImpl();

                set.add('a');
                set.add('b');
                set.add('a').should.be.false;
                set.items.should.include('a');
            });

            it('Should throw an error if item is not of the accepted type', function() {
                var set = new SetBaseImpl();

                should.Throw(function() {
                    set.add(1);
                });
            });
        });

        describe('addAll()', function() {

            it('Should add all items and return an array of true/false according to item presense/absence ' +
                'in the set if all items are of the accepted type', function() {
                var set = new SetBaseImpl();

                set.addAll(['a', 'b', 'a', 'c']).should.eql([true, true, false, true]);
                set.items.should.include('a');
                set.items.should.include('b');
                set.items.should.include('c');
            });

            it('Should not add any item and throw an exception if one item is not of the correct type', function() {
                var set = new SetBaseImpl();

                should.Throw(function() {
                    set.addAll(['a', 'b', 1, 'c']);
                });

                set.items.should.not.include('a');
                set.items.should.not.include('b');
                set.items.should.not.include('c');
            });

        });

        describe('_getValueId()', function() {
            it('Should throw', function() {
                var set = new SetBase();

                should.Throw(function() {
                    set._getValueId('value');
                });
            });
        });

        describe('_isAcceptedType()', function() {
            it('Should throw', function() {
                var set = new SetBase();

                should.Throw(function() {
                    set._isAcceptedType('value');
                });
            });
        });
    });
});

function SetBaseImpl(items) {
    SetBase.call(this, items);
}

util.inherits(SetBaseImpl, SetBase);

SetBaseImpl.prototype._getValueId = function(value) {
    return value;
};

SetBaseImpl.prototype._isAcceptedType = function(value) {
    return typeof value === 'string';
};
