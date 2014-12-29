'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');

function NumberTransformer() {

}

util.inherits(NumberTransformer, TransformerBase);

NumberTransformer.prototype._transform = function(value) {
    return parseFloat(value.N);
};

NumberTransformer.prototype.isApplicable = function(value) {
    return value && typeof value.N === 'string';
};

module.exports = NumberTransformer;
