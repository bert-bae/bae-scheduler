import * as AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION,
});

const docClient = new AWS.DynamoDB.DocumentClient();

const get = async (params) => {
  try {
    return docClient.get(params).promise();
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

module.exports = {
  get,
  create,
  update,
  deleteItem,
};
