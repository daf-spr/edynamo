'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');

function BinaryTransformer() {

}

util.inherits(BinaryTransformer, TransformerBase);

BinaryTransformer.prototype._transform = function(value) {
    return value.B;
};

BinaryTransformer.prototype.isApplicable = function(value) {
    return value && Buffer.isBuffer(value.B);
};

module.exports = BinaryTransformer;
