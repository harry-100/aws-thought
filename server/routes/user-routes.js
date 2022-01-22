const express = require("express");
const router = express.Router();

const AWS = require("aws-sdk");
const awsConfig = {
  region: "us-east-2"
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = "Thoughts";

// create GET route to access all thoughts
router.get("/users", (req, res) => {
  const params = {
    TableName: table,
  };
  // scan return all items in the table
  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(data.Items);
    }
  });
});
// GET route to access all thoughts of a user
router.get("/users/:username", (req, res) => {
  const params = {
    TableName: table,
    ProjectionExpression: "#un, #th, #ca, #img",
    KeyConditionExpression: "#un = :user",
    ScanIndexForward: false,
    ExpressionAttributeNames: {
      "#un": "username",
      "#ca": "createdAt",
      "#th": "thought",
      "#img": "image"
    },
    ExpressionAttributeValues: {
      ":user": req.params.username,
    },
  };


  dynamodb.query(params, (err, data) => {
    if (err) {
      console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
      res.status(500).json(err);
    } else {
      
      console.log("Query Succeeded!");
      res.json(data.Items);
    }
  });
});

// create a new user and their thought at /api/users
router.post("/users", (req, res) => {
  const params = {
    TableName: table,
    Item: {
      username: req.body.username,
      createdAt: Date.now(),
      thought: req.body.thought,
      image: req.body.image
    },
  };
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.log("Unable to add item. Error: ", JSON.stringify(err, null, 2));
      res.status(500).json(err);
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
      res.json({"Added" : JSON.stringify(data, null, 2)});
    }
  });
});

module.exports = router;
