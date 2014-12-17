'use strict';

var chai = require('chai');
var NumberTransformer = require('../../../../lib/transformers/po_to/number_transformer');
var should = chai.should();

describe('Transformers', function() {

    describe('PlainObject to TypedObject', function() {

        describe('Number', function() {

            describe('transform()', function() {

                it('Should transform an untyped number value to a typed number value (number expresed as string)', function() {
                    var st = new NumberTransformer();

                    st.transform(1).should.eql({ N: '1' });
                });

                it('Should throw an exception if value is a string', function() {
                    var st = new NumberTransformer();

                    should.Throw(function() {
                        st.transform('2');
                    });
                });

                it('Should throw an exception if value is null', function() {
                    var st = new NumberTransformer();

                    should.Throw(function() {
                        st.transform(null);
                    });
                });

                it('Should throw an exception if value is undefined', function() {
                    var st = new NumberTransformer();

                    should.Throw(function() {
                        st.transform(undefined);
                    });
                });

                it('Should throw an exception if value is an object', function() {
                    var st = new NumberTransformer();

                    should.Throw(function() {
                        st.transform({ value: 'test' });
                    });
                });

            });

            describe('isApplicable()', function() {

                it('Should return true for numbers', function() {
                    var st = new NumberTransformer();

                    st.isApplicable(6.5).should.be.true;
                });

                it('Should return false for srings', function() {
                    var st = new NumberTransformer();

                    st.isApplicable('1').should.be.false;
                });

                it('Should return false for null', function() {
                    var st = new NumberTransformer();

                    st.isApplicable(null).should.be.false;
                });

                it('Should return false for undefined', function() {
                    var st = new NumberTransformer();

                    st.isApplicable(undefined).should.be.false;
                });

                it('Should return false for objects', function() {
                    var st = new NumberTransformer();

                    st.isApplicable({ value: 'test' }).should.be.false;
                });
            });

        });
    });

});
