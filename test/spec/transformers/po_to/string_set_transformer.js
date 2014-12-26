'use strict';

var chai = require('chai');
var StringSetTransformer = require('../../../../lib/transformers/po_to/string_set_transformer');
var StringSet = require('../../../../lib/collections/string_set');
var NumericSet = require('../../../../lib/collections/numeric_set');
var should = chai.should();

describe('Transformers', function() {

    describe('PlainObject to TypedObject', function() {

        describe('StringSetTransformer', function() {

            describe('transform()', function() {

                it('Should transform an untyped string set value to a typed string set value', function() {
                    var st = new StringSetTransformer();
                    var ns = new StringSet(['t1', 't2']);

                    st.transform(ns).should.eql({ SS: ns.items });
                });

                it('Should throw an exception if value is a number', function() {
                    var st = new StringSetTransformer();

                    should.Throw(function() {
                        st.transform(2);
                    });
                });

                it('Should throw an exception if value is a buffer', function() {
                    var st = new StringSetTransformer();

                    should.Throw(function() {
                        st.transform(new Buffer('Test!'));
                    });
                });

                it('Should throw an exception if value is null', function() {
                    var st = new StringSetTransformer();

                    should.Throw(function() {
                        st.transform(null);
                    });
                });

                it('Should throw an exception if value is undefined', function() {
                    var st = new StringSetTransformer();

                    should.Throw(function() {
                        st.transform(undefined);
                    });
                });

                it('Should throw an exception if value is an object', function() {
                    var st = new StringSetTransformer();

                    should.Throw(function() {
                        st.transform({ value: 'test' });
                    });
                });

                it('Should throw an exception if value is a different kind of set', function() {
                    var st = new StringSetTransformer();

                    should.Throw(function() {
                        st.transform(new NumericSet());
                    });
                });

            });

            describe('isApplicable()', function() {

                it('Should return true for StringSets', function() {
                    var st = new StringSetTransformer();
                    var ns = new StringSet(['t1', 't2']);

                    st.isApplicable(ns).should.be.true;
                });

                it('Should return false for numbers', function() {
                    var st = new StringSetTransformer();

                    st.isApplicable(1).should.be.false;
                });

                it('Should return false for null', function() {
                    var st = new StringSetTransformer();

                    st.isApplicable(null).should.be.false;
                });

                it('Should return false for undefined', function() {
                    var st = new StringSetTransformer();

                    st.isApplicable(undefined).should.be.false;
                });

                it('Should return false for objects', function() {
                    var st = new StringSetTransformer();

                    st.isApplicable({ value: 'test' }).should.be.false;
                });

                it('Should return false for buffers', function() {
                    var st = new StringSetTransformer();

                    st.isApplicable(new Buffer('Hi!')).should.be.false;
                });

                it('Should return false for a different kind of set', function() {
                    var st = new StringSetTransformer();

                    st.isApplicable(new NumericSet()).should.be.false;
                });
            });

        });
    });

});
