'use strict';

var SetBase = require('./set_base');
var util = require('util');

function NumericSet(values) {
    SetBase.call(this, values);
}

util.inherits(NumericSet, SetBase);

NumericSet.prototype._isAcceptedType = function(value) {
    return typeof value === 'number';
};

NumericSet.prototype._getValueId = function(value) {
    return value;
};

module.exports = NumericSet;
