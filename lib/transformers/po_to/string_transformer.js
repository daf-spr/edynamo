'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');

function StringTransformer() {

}

util.inherits(StringTransformer, TransformerBase);

StringTransformer.prototype._transform = function(value) {
    return { S: value };
};

StringTransformer.prototype.isApplicable = function(value) {
    if (typeof value === 'string' && value !== '') {
        return true;
    }

    return false;
};

module.exports = StringTransformer;
