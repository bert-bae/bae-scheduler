import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const docClient = new AWS.DynamoDB({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
});

console.log(`Initializing Dynamodb tables...`);

const tables = [
  {
    TableName: 'Users',
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    AttributeDefinitions: [
      {
        AttributeName: 'email',
        AttributeType: 'S',
      },
      {
        AttributeName: 'userId',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'email',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'userId',
        KeyType: 'RANGE',
      },
    ],
  },
  {
    TableName: 'Persons',
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    AttributeDefinitions: [
      {
        AttributeName: 'personId',
        AttributeType: 'S',
      },
      {
        AttributeName: 'userId',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'personId',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'userId',
        KeyType: 'RANGE',
      },
    ],
  },
  {
    TableName: 'Events',
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    AttributeDefinitions: [
      {
        AttributeName: 'eventId',
        AttributeType: 'S',
      },
      {
        AttributeName: 'personId',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'eventId',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'personId',
        KeyType: 'RANGE',
      },
    ],
  },
];

tables.forEach((table, i) => {
  docClient.createTable(table, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`=====Created "${table.TableName}" table======`);
      console.log(data);
    }
  });
});
