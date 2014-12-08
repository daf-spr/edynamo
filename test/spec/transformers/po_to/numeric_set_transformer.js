'use strict';

var chai = require('chai');
var NumericSetTransformer = require('../../../../lib/transformers/po_to/numeric_set_transformer');
var BinarySet = require('../../../../lib/collections/binary_set');
var NumericSet = require('../../../../lib/collections/numeric_set');
var should = chai.should();

describe('Transformers', function() {

    describe('PlainObject to TypedObject', function() {

        describe('NumericSetTransformer', function() {

            describe('transform()', function() {

                it('Should transform an untyped numeric set value to a typed numeric set value', function() {
                    var st = new NumericSetTransformer();
                    var ns = new NumericSet([ 1, 2 ]);

                    st.transform(ns).should.eql({ NS: ns.items });
                });

                it('Should throw an exception if value is a string', function() {
                    var st = new NumericSetTransformer();

                    should.Throw(function() {
                        st.transform('2');
                    });
                });

                it('Should throw an exception if value is a buffer', function() {
                    var st = new NumericSetTransformer();

                    should.Throw(function() {
                        st.transform(new Buffer('Test!'));
                    });
                });

                it('Should throw an exception if value is null', function() {
                    var st = new NumericSetTransformer();

                    should.Throw(function() {
                        st.transform(null);
                    });
                });

                it('Should throw an exception if value is undefined', function() {
                    var st = new NumericSetTransformer();

                    should.Throw(function() {
                        st.transform(undefined);
                    });
                });

                it('Should throw an exception if value is an object', function() {
                    var st = new NumericSetTransformer();

                    should.Throw(function() {
                        st.transform({ value: 'test' });
                    });
                });

                it('Should throw an exception if value is a different kind of set', function() {
                    var st = new NumericSetTransformer();

                    should.Throw(function() {
                        st.transform(new BinarySet());
                    });
                });

            });

            describe('isApplicable()', function() {

                it('Should return true for NumericSets', function() {
                    var st = new NumericSetTransformer();

                    var ns = new NumericSet([1, 2]);

                    st.isApplicable(ns).should.be.true;
                });

                it('Should return false for srings', function() {
                    var st = new NumericSetTransformer();

                    st.isApplicable('1').should.be.false;
                });

                it('Should return false for null', function() {
                    var st = new NumericSetTransformer();

                    st.isApplicable(null).should.be.false;
                });

                it('Should return false for undefined', function() {
                    var st = new NumericSetTransformer();

                    st.isApplicable(undefined).should.be.false;
                });

                it('Should return false for objects', function() {
                    var st = new NumericSetTransformer();

                    st.isApplicable({ value: 'test' }).should.be.false;
                });

                it('Should return false for buffers', function() {
                    var st = new NumericSetTransformer();

                    st.isApplicable(new Buffer('Hi!')).should.be.false;
                });

                it('Should return false for a different kind of set', function() {
                    var st = new NumericSetTransformer();

                    st.isApplicable(new BinarySet()).should.be.false;
                });
            });

        });
    });

});
