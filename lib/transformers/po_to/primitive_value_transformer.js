'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');
var BinarySetTransformer = require('./binary_set_transformer');
var BinaryTransformer = require('./binary_transformer');
var BooleanTransformer = require('./boolean_transformer');
var NullTransformer = require('./null_transformer');
var NumberTransformer = require('./number_transformer');
var NumericSetTransformer = require('./numeric_set_transformer');
var StringTransformer = require('./string_transformer');
var StringSetTransformer = require('./string_set_transformer');
var BinarySet = require('../../collections/binary_set');
var NumericSet = require('../../collections/numeric_set');
var StringSet = require('../../collections/string_set');

function PrimitiveValueTransformer() {
    this.$dependencies = {
        binarySetTransformer: new BinarySetTransformer(),
        binaryTransformer: new BinaryTransformer(),
        booleanTransformer: new BooleanTransformer(),
        nullTransformer: new NullTransformer(),
        numberTransformer: new NumberTransformer(),
        numericSetTransformer: new NumericSetTransformer(),
        stringTransformer: new StringTransformer(),
        stringSetTransformer: new StringSetTransformer()
    };

    this.transformer = {};

    this._bootstrap();
}

util.inherits(PrimitiveValueTransformer, TransformerBase);

PrimitiveValueTransformer.prototype._transform = function(value) {
    var self = this;

    return self._transformAttributeValue(value);
};

PrimitiveValueTransformer.prototype._transformAttributeValue = function(value) {
    var type = this._getAttributeValueType(value);

    if (type === null) {
        throw new Error('Not supported value type [value=' + (value  instanceof Buffer) + ']');
    }

    return this._transformers[type].transform(value);
};

PrimitiveValueTransformer.prototype._getAttributeValueType = function(value) {
    if (value === null) {
        return 'null';
    } else if (value instanceof Buffer) {
        return 'binary';
    } else if (value instanceof BinarySet) {
        return 'binarySet';
    } else if (value instanceof StringSet) {
        return 'stringSet';
    } else if (value instanceof NumericSet) {
        return 'numericSet';
    } else if (typeof value === 'string') {
        return 'string';
    } else if (typeof value === 'boolean') {
        return 'boolean';
    } else if (typeof value === 'number') {
        return 'number';
    } else {
        return null;
    }
};

PrimitiveValueTransformer.prototype._bootstrap = function() {
    this._transformers = {
        binarySet: this.$dependencies.binarySetTransformer,
        binary: this.$dependencies.binaryTransformer,
        boolean: this.$dependencies.booleanTransformer,
        null: this.$dependencies.nullTransformer,
        number: this.$dependencies.numberTransformer,
        numericSet: this.$dependencies.numericSetTransformer,
        string: this.$dependencies.stringTransformer,
        stringSet: this.$dependencies.stringSetTransformer,
    };
};

PrimitiveValueTransformer.prototype.isApplicable = function(value) {
    return this._getAttributeValueType(value) !== null;
};

module.exports = PrimitiveValueTransformer;
