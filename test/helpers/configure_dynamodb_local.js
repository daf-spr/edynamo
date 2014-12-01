'use strict';

var AWS = require('aws-sdk');

/**
 * It configures AWS SDK to use DynamoDB Local
 * (see http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Tools.DynamoDBLocal.html)
 *
 * @class ConfigureDynamoDBLocal
 * @constructor
 */
function ConfigureDynamoDBLocal() {

}

/**
 * Configures AWS SDK to use DynamoDB local.
 *
 * @static
 * @return {Function.<ConfigureDynamoDBLocal>}
 */
ConfigureDynamoDBLocal.configure = function() {
    AWS.config.update({
        apiVersion:{
            dynamodb:'2012-08-10'
        },
        endpoint: new AWS.Endpoint('http://localhost:9000')
    });
};

module.exports = ConfigureDynamoDBLocal;
