'use strict';

var chai = require('chai');
var BinaryTransformer = require('../../../../lib/transformers/po_to/binary_transformer');
var should = chai.should();

describe('Transformers', function() {

    describe('PlainObject to TypedObject', function() {

        describe('Binary', function() {

            describe('transform()', function() {

                it('Should transform an untyped binary value to a typed binary value', function() {
                    var st = new BinaryTransformer();

                    st.transform(new Buffer('Test', 'utf8')).should.eql({ B: new Buffer('Test', 'utf8') });
                });

                it('Should throw an exception if value is a string', function() {
                    var st = new BinaryTransformer();

                    should.Throw(function() {
                        st.transform('2');
                    });
                });

                it('Should throw an exception if value is a number', function() {
                    var st = new BinaryTransformer();

                    should.Throw(function() {
                        st.transform(2);
                    });
                });

                it('Should throw an exception if value is null', function() {
                    var st = new BinaryTransformer();

                    should.Throw(function() {
                        st.transform(null);
                    });
                });

                it('Should throw an exception if value is undefined', function() {
                    var st = new BinaryTransformer();

                    should.Throw(function() {
                        st.transform(undefined);
                    });
                });

                it('Should throw an exception if value is an object', function() {
                    var st = new BinaryTransformer();

                    should.Throw(function() {
                        st.transform({ value: 'test' });
                    });
                });

            });

            describe('isApplicable()', function() {

                it('Should return true for buffers', function() {
                    var st = new BinaryTransformer();

                    st.isApplicable(new Buffer('test', 'utf8')).should.be.true;
                });

                it('Should return false for srings', function() {
                    var st = new BinaryTransformer();

                    st.isApplicable('1').should.be.false;
                });

                it('Should return false for null', function() {
                    var st = new BinaryTransformer();

                    st.isApplicable(null).should.be.false;
                });

                it('Should return false for undefined', function() {
                    var st = new BinaryTransformer();

                    st.isApplicable(undefined).should.be.false;
                });

                it('Should return false for objects', function() {
                    var st = new BinaryTransformer();

                    st.isApplicable({ value: 'test' }).should.be.false;
                });

                it('Should return false for numbers', function() {
                    var st = new BinaryTransformer();

                    st.isApplicable(2).should.be.false;
                });
            });

        });
    });

});
