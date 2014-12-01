'use strict';

var ConfigureDynamoDBLocal = require('./configure_dynamodb_local');

/**
 * It prepares the engine to execute tests.
 */
function main() {
    ConfigureDynamoDBLocal.configure();
}

main();
