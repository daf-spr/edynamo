'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');
var PrimitiveValueTransformer = require('./primitive_value_transformer');
var ObjectTransformer = require('./object_transformer');
var ListTransformer = require('./list_transformer');

function ValueTransformer() {
    this.$dependencies = {
        primitiveValueTransformer: new PrimitiveValueTransformer(),
        objectTransformerTransformer: new ObjectTransformer(),
        listTransformer: new ListTransformer()
    };

    this.transformer = {};
}

util.inherits(ValueTransformer, TransformerBase);

ValueTransformer.prototype._transform = function(value) {
    var self = this;

    var transformer = self._getTransformer(value);

    if (!transformer) {
        throw new Error('Type not supported [value = ' + value + ']');
    }

    return transformer.transform(value);
};

ValueTransformer.prototype._getTransformer = function(value) {
    var primitiveValueTransformer = this.$dependencies.primitiveValueTransformer;
    var objectTransformerTransformer = this.$dependencies.objectTransformerTransformer;
    var listTransformer = this.$dependencies.listTransformer;

    if (primitiveValueTransformer.isApplicable(value)) {
        return primitiveValueTransformer;
    } else if (objectTransformerTransformer.isApplicable(value)) {
        return objectTransformerTransformer;
    } else if (listTransformer.isApplicable(value)) {
        return listTransformer;
    } else {
        return null;
    }
};

ValueTransformer.prototype.isApplicable = function(value) {
    return this._getTransformer(value) !== null;
};

module.exports = ValueTransformer;
