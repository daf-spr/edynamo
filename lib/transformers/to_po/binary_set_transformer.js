'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');
var BinarySet = require('../../collections/binary_set');

function BinarySetTransformer() {

}

util.inherits(BinarySetTransformer, TransformerBase);

BinarySetTransformer.prototype._transform = function(value) {
    return new BinarySet(value.BS);
};

BinarySetTransformer.prototype.isApplicable = function(value) {
    return value && Array.isArray(value.BS);
};

module.exports = BinarySetTransformer;
