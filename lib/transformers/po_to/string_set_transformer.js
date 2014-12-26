'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');
var StringSet = require('../../collections/string_set');

function StringSetTransformer() {

}

util.inherits(StringSetTransformer, TransformerBase);

StringSetTransformer.prototype._transform = function(value) {
    return { SS: value.items };
};

StringSetTransformer.prototype.isApplicable = function(value) {
    return value instanceof StringSet;
};

module.exports = StringSetTransformer;
