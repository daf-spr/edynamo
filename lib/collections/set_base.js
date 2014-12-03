'use strict';

function SetBase(values) {
    values = values || [];

    this.items = [];
    this._index = {};

    this.addAll(values);
}

SetBase.prototype.add = function(value) {
    if (this._isAcceptedType(value)) {
        if (this._index[this._getValueId(value)]) {
            return false;
        }

        this._index[this._getValueId(value)] = true;
        this.items.push(value);

        return true;
    } else {
        throw new Error('Not valid type');
    }
};

SetBase.prototype.addAll = function(values) {
    var self = this;

    return values.map(function(value) {
        return self.add(value);
    });
};

SetBase.prototype._isAcceptedType = function() {
    throw new Error('Not implemented');
};

SetBase.prototype._getValueId = function() {
    throw new Error('Not implemented');
};

module.exports = SetBase;
