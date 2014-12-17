'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');

function NumberTransformer() {

}

util.inherits(NumberTransformer, TransformerBase);

NumberTransformer.prototype._transform = function(value) {
    return { N: value.toString() };
};

NumberTransformer.prototype.isApplicable = function(value) {
    if (typeof value === 'number') {
        return true;
    }

    return false;
};

module.exports = NumberTransformer;
