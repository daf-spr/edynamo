'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');

function NullTransformer() {

}

util.inherits(NullTransformer, TransformerBase);

NullTransformer.prototype._transform = function() {
    return null;
};

NullTransformer.prototype.isApplicable = function(value) {
    return value && value.NULL === true;
};

module.exports = NullTransformer;
