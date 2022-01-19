const AWS = require('aws-sdk');

// modify the AWS config object that DynamoDB will use to connect to the local instance
AWS.config.update({
    region: "us-east-2"
  });

// create the DynamoDB service object
// we are using DynamoDB class to create a service interface object, dynamodb.
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// create a params object that will hold the schema and metadata of the table
const params = {
    TableName: "Thoughts",
    KeySchema: [
        {AttributeName: "username", KeyType: "HASH"}, // Partition Key
        {AttributeName: "createdAt", KeyType: "RANGE"} // Sort Key
    ],
    AttributeDefinitions: [
        {AttributeName: "username", AttributeType: "S"},
        {AttributeName: "createdAt", AttributeType: "N"}
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
// Make a call to the DynamoDB instance to create the table
dynamodb.createTable(params, (err, data) =>{
    if (err) {
        console.log("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
