'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');

function BinaryTransformer() {

}

util.inherits(BinaryTransformer, TransformerBase);

BinaryTransformer.prototype._transform = function(value) {
    return { B: value };
};

BinaryTransformer.prototype.isApplicable = function(value) {
    if (value instanceof Buffer) {
        return true;
    }

    return false;
};

module.exports = BinaryTransformer;
