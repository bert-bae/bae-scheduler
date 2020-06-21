import * as AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION || 'local',
});

const docClient = new AWS.DynamoDB.DocumentClient({
  endpoint:
    process.env.ENVIRONMENT === 'local'
      ? 'http://localhost:8000'
      : `https://dynamodb.${process.env.AWS_REGION}.amazonaws.com`,
});

const get = async (params) => {
  try {
    return docClient.get(params).promise();
  } catch (err) {
    throw new Error(`Unable to read item: ${JSON.stringify(err, null, 2)}`);
  }
};

const query = async (params) => {
  try {
    return docClient.query(params).promise();
  } catch (err) {
    throw new Error(`Unable to read item: ${JSON.stringify(err, null, 2)}`);
  }
};

const create = async (params) => {
  try {
    return docClient.put(params).promise();
  } catch (err) {
    throw new Error(`Unable to create item: ${JSON.stringify(err, null, 2)}`);
  }
};

const update = async (params) => {
  try {
    return docClient.update(params).promise();
  } catch (err) {
    throw new Error(`Unable to update item: ${JSON.stringify(err, null, 2)}`);
  }
};

const deleteItem = async (params) => {
  try {
    return docClient.delete(params).promise();
  } catch (err) {
    throw new Error(`Unable to delete item: ${JSON.stringify(err, null, 2)}`);
  }
};

export default {
  get,
  create,
  update,
  deleteItem,
  query,
};
