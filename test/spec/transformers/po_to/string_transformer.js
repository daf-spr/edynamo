'use strict';

var chai = require('chai');
var StringTransformer = require('../../../../lib/transformers/po_to/string_transformer');
var should = chai.should();

describe('Transformers', function() {

    describe('PlainObject to TypedObject', function() {

        describe('String', function() {

            describe('transform()', function() {

                it('Should transform an untyped string value to a typed string value', function() {
                    var st = new StringTransformer();

                    st.transform('test value').should.eql({ S: 'test value' });
                });

                it('Should throw an exception if value is a number', function() {
                    var st = new StringTransformer();

                    should.Throw(function() {
                        st.transform(2);
                    });
                });

                it('Should throw an exception if value is null', function() {
                    var st = new StringTransformer();

                    should.Throw(function() {
                        st.transform(null);
                    });
                });

                it('Should throw an exception if value is undefined', function() {
                    var st = new StringTransformer();

                    should.Throw(function() {
                        st.transform(undefined);
                    });
                });

                it('Should throw an exception if value is an object', function() {
                    var st = new StringTransformer();

                    should.Throw(function() {
                        st.transform({ value: 'test' });
                    });
                });

                it('Should throw an exception if value is an empty string', function() {
                    var st = new StringTransformer();

                    should.Throw(function() {
                        st.transform('');
                    });
                });
            });

            describe('isApplicable()', function() {

                it('Should return true for not empty strings', function() {
                    var st = new StringTransformer();

                    st.isApplicable('test value').should.be.true;
                });

                it('Should return false for empty strings', function() {
                    var st = new StringTransformer();

                    st.isApplicable('').should.be.false;
                });

                it('Should return false for numbers', function() {
                    var st = new StringTransformer();

                    st.isApplicable(1).should.be.false;
                });

                it('Should return false for null', function() {
                    var st = new StringTransformer();

                    st.isApplicable(null).should.be.false;
                });

                it('Should return false for undefined', function() {
                    var st = new StringTransformer();

                    st.isApplicable(undefined).should.be.false;
                });

                it('Should return false for objects', function() {
                    var st = new StringTransformer();

                    st.isApplicable({ value: 'test' }).should.be.false;
                });
            });

        });
    });

});
