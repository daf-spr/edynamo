'use strict';

var DEFAULT_RETRY_LIMIT = 10;

var hash = require('object-hash');

function AlwaysRetryPolicy(data) {
    data = data || {};

    this.limit = data.limit || DEFAULT_RETRY_LIMIT;
    this._times = {};
}

AlwaysRetryPolicy.prototype.mustRetry = function(err, method, params) {
    var hsError = err.code || err.name;
    var hsMethod = method;
    var hsParams = hash(params);

    var key = hsError + hsMethod + hsParams;

    if (typeof this._times[key] === 'undefined') {
        this._times[key] = 1;
    }

    if (this._times[key] <= this.limit) {
        this._times[key] += 1;

        return true;
    }

    return false;
};

module.exports = AlwaysRetryPolicy;
