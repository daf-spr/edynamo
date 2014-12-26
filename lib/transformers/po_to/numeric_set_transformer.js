'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');
var NumericSet = require('../../collections/numeric_set');

function NumericSetTransformer() {

}

util.inherits(NumericSetTransformer, TransformerBase);

NumericSetTransformer.prototype._transform = function(value) {
    var stringItems = value.items.map(function(num) {
        return num.toString();
    });

    return { NS: stringItems };
};

NumericSetTransformer.prototype.isApplicable = function(value) {
    return value instanceof NumericSet;
};

module.exports = NumericSetTransformer;
