'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');

function BooleanTransformer() {

}

util.inherits(BooleanTransformer, TransformerBase);

BooleanTransformer.prototype._transform = function(value) {
    return value.BOOL;
};

BooleanTransformer.prototype.isApplicable = function(value) {
    return value && typeof value.BOOL === 'boolean';
};

module.exports = BooleanTransformer;
