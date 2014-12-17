'use strict';

var util = require('util');
var TransformerBase = require('../transformer_base');

function BooleanTransformer() {

}

util.inherits(BooleanTransformer, TransformerBase);

BooleanTransformer.prototype._transform = function(value) {
    return { BOOL: value };
};

BooleanTransformer.prototype.isApplicable = function(value) {
    if (typeof value === 'boolean') {
        return true;
    }

    return false;
};

module.exports = BooleanTransformer;
