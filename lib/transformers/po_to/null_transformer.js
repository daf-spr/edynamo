'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');

function NullTransformer() {

}

util.inherits(NullTransformer, TransformerBase);

NullTransformer.prototype._transform = function() {
    return { NULL: true };
};

NullTransformer.prototype.isApplicable = function(value) {
    if (value === null) {
        return true;
    }

    return false;
};

module.exports = NullTransformer;
