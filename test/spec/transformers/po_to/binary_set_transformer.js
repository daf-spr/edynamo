'use strict';

var chai = require('chai');
var BinarySetTransformer = require('../../../../lib/transformers/po_to/binary_set_transformer');
var BinarySet = require('../../../../lib/collections/binary_set');
var NumericSet = require('../../../../lib/collections/numeric_set');
var should = chai.should();

describe('Transformers', function() {

    describe('PlainObject to TypedObject', function() {

        describe('BinarySetTransformer', function() {

            describe('transform()', function() {

                it('Should transform an untyped binary set value to a typed binary set value', function() {
                    var st = new BinarySetTransformer();
                    var bs = new BinarySet([new Buffer('Test', 'utf8')]);

                    st.transform(bs).should.eql({ BS: bs.items });
                });

                it('Should throw an exception if value is a string', function() {
                    var st = new BinarySetTransformer();

                    should.Throw(function() {
                        st.transform('2');
                    });
                });

                it('Should throw an exception if value is a number', function() {
                    var st = new BinarySetTransformer();

                    should.Throw(function() {
                        st.transform(2);
                    });
                });

                it('Should throw an exception if value is null', function() {
                    var st = new BinarySetTransformer();

                    should.Throw(function() {
                        st.transform(null);
                    });
                });

                it('Should throw an exception if value is undefined', function() {
                    var st = new BinarySetTransformer();

                    should.Throw(function() {
                        st.transform(undefined);
                    });
                });

                it('Should throw an exception if value is an object', function() {
                    var st = new BinarySetTransformer();

                    should.Throw(function() {
                        st.transform({ value: 'test' });
                    });
                });

                it('Should throw an exception if value is a different kind of set', function() {
                    var st = new BinarySetTransformer();

                    should.Throw(function() {
                        st.transform(new NumericSet([1, 2]));
                    });
                });

            });

            describe('isApplicable()', function() {

                it('Should return true for BinarySets', function() {
                    var st = new BinarySetTransformer();

                    var bs = new BinarySet([new Buffer('Test', 'utf8')]);

                    st.isApplicable(bs).should.be.true;
                });

                it('Should return false for srings', function() {
                    var st = new BinarySetTransformer();

                    st.isApplicable('1').should.be.false;
                });

                it('Should return false for null', function() {
                    var st = new BinarySetTransformer();

                    st.isApplicable(null).should.be.false;
                });

                it('Should return false for undefined', function() {
                    var st = new BinarySetTransformer();

                    st.isApplicable(undefined).should.be.false;
                });

                it('Should return false for objects', function() {
                    var st = new BinarySetTransformer();

                    st.isApplicable({ value: 'test' }).should.be.false;
                });

                it('Should return false for numbers', function() {
                    var st = new BinarySetTransformer();

                    st.isApplicable(2).should.be.false;
                });

                it('Should return false for a different kind of set', function() {
                    var st = new BinarySetTransformer();

                    st.isApplicable(new NumericSet([1, 2])).should.be.false;
                });
            });

        });
    });

});
