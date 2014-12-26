'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');
var PrimitiveValueTransformer = require('./primitive_value_transformer');
var ObjectTransformer = require('./object_transformer');

function ListTransformer() {
    this.$dependencies = {
        primitiveValueTransformer: new PrimitiveValueTransformer(),
        objectTransformer: new ObjectTransformer()
    };

    this.transformer = {};
}

util.inherits(ListTransformer, TransformerBase);

ListTransformer.prototype._transform = function(array) {
    var self = this;

    return { L: array.map(function(value) { return self._transformAttributeValue(value); }) };
};

ListTransformer.prototype._transformAttributeValue = function(value) {
    if (this.isApplicable(value)) {
        return this.transform(value);
    }

    if (this.$dependencies.objectTransformer.isApplicable(value)) {
        return this.$dependencies.objectTransformer.transform(value);
    }

    return this.$dependencies.primitiveValueTransformer.transform(value);
};

ListTransformer.prototype.isApplicable = function(value) {
    return Array.isArray(value);
};

module.exports = ListTransformer;
