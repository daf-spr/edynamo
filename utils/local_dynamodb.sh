#!/bin/bash

DIR=~/dynamodb_local/

mkdir $DIR/db

nohup java -Djava.library.path=$DIR/DynamoDBLocal_lib -jar $DIR/DynamoDBLocal.jar -dbPath $DIR/db -port 9000 &