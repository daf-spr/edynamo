'use strict';

function SetBase(values) {
    values = values || [];

    this.items = [];
    this._index = {};

    this.addAll(values);
}

SetBase.prototype.add = function(value) {
    return this._addTo(value, this.items);
};

SetBase.prototype.addAll = function(values) {
    var self = this;
    var auxValues = [];

    var result = values.map(function(value) {
        return self._addTo(value, auxValues);
    });

    this.items = this.items.concat(auxValues);

    return result;
};

SetBase.prototype._isAcceptedType = function() {
    throw new Error('Not implemented');
};

SetBase.prototype._getValueId = function() {
    throw new Error('Not implemented');
};

SetBase.prototype._addTo = function(value, array) {
    if (this._isAcceptedType(value)) {
        if (this._index[this._getValueId(value)]) {
            return false;
        }

        this._index[this._getValueId(value)] = true;
        array.push(value);

        return true;
    } else {
        throw new Error('Not valid type');
    }
};

module.exports = SetBase;
