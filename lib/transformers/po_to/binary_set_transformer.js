'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');
var BinarySet = require('../../collections/binary_set');

function BinarySetTransformer() {

}

util.inherits(BinarySetTransformer, TransformerBase);

BinarySetTransformer.prototype._transform = function(value) {
    return { BS: value.items };
};

BinarySetTransformer.prototype.isApplicable = function(value) {
    return value instanceof BinarySet;
};

module.exports = BinarySetTransformer;
