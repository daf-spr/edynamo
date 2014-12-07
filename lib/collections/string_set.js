'use strict';

var SetBase = require('./set_base');
var util = require('util');

function StringSet(values) {
    SetBase.call(this, values);
}

util.inherits(StringSet, SetBase);

StringSet.prototype._isAcceptedType = function(value) {
    return typeof value === 'string';
};

StringSet.prototype._getValueId = function(value) {
    return value;
};

module.exports = StringSet;
