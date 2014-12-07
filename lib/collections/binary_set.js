'use strict';

var SetBase = require('./set_base');
var util = require('util');

function BinarySet(values) {
    SetBase.call(this, values);
}

util.inherits(BinarySet, SetBase);

BinarySet.prototype._isAcceptedType = function(value) {
    return value instanceof Buffer;
};

BinarySet.prototype._getValueId = function(value) {
    return value.toString('base64');
};

module.exports = BinarySet;
