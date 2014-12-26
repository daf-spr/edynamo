'use strict';

var util = require('util');
var _ = require('lodash');
var TransformerBase = require('../transformer_base');
var PrimitiveValueTransformer = require('./primitive_value_transformer');

function ObjectTransformer() {
    this.$dependencies = {
        primitiveValueTransformer: new PrimitiveValueTransformer()
    };

    this.transformer = {};
}

util.inherits(ObjectTransformer, TransformerBase);

ObjectTransformer.prototype._transform = function(obj) {
    var self = this;

    var mapValues = _.mapValues(obj, function(value) {
        return self._transformAttributeValue(value);
    });

    return { M: mapValues };
};

ObjectTransformer.prototype._transformAttributeValue = function(value) {
    if (this.isApplicable(value)) {
        return this.transform(value);
    }

    return this.$dependencies.primitiveValueTransformer.transform(value);
};

ObjectTransformer.prototype.isApplicable = function(value) {
    return typeof value === 'object' && !Array.isArray(value) &&
        !this.$dependencies.primitiveValueTransformer.isApplicable(value);
};

module.exports = ObjectTransformer;
