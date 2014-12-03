'use strict';

function TransformerBase() {

}

TransformerBase.prototype.transform = function(value) {
    var self = this;

    if (self.isApplicable(value)) {
        return self._transform(value);
    } else {
        throw new Error('Transformer is not applicable for value. [value=' + value + ']');
    }
};

TransformerBase.prototype._transform = function() {
    throw new Error('Not implemented! You must override this method.');
};

TransformerBase.prototype.isApplicable = function() {
    throw new Error('Not implemented! You must override this method.');
};

module.exports = TransformerBase;
