'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');
var NumericSet = require('../../collections/numeric_set');

function NumericSetTransformer() {

}

util.inherits(NumericSetTransformer, TransformerBase);

NumericSetTransformer.prototype._transform = function(value) {
    var numbers = value.NS.map(function(number) {
        var num = parseFloat(number);

        if (isNaN(num)) {
            throw new Error('Invalid number');
        }

        return num;
    });

    return new NumericSet(numbers);
};

NumericSetTransformer.prototype.isApplicable = function(value) {
    return value && Array.isArray(value.NS);
};

module.exports = NumericSetTransformer;
