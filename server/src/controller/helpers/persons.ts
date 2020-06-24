import { v4 as uuidv4 } from 'uuid';
import DynamoClient from '../../clients/dynamodb';
import { updateInstructions } from '../../utils/dyanmodb-helper';
import { PersonType } from '../../types/data-model';
import { tables } from '../../constants/dyanmo-constants';
import { getISODate } from '../../utils/dates';

export const createPerson = async (
  data: Omit<PersonType, 'personId' | 'createdAt' | 'updatedAt'>
): Promise<PersonType> => {
  const currentDate = getISODate();
  const params = {
    TableName: tables.persons,
    Item: {
      ...data,
      personId: uuidv4(),
      createdAt: currentDate,
      updatedAt: currentDate,
    },
  };

  await DynamoClient.create(params);

  return params.Item;
};

export const queryAll = async (
  userId: string
): Promise<PersonType[] | void> => {
  const persons = await DynamoClient.query({
    TableName: tables.persons,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  });

  if (persons.Count > 0) {
    return <PersonType[]>persons.Items;
  }
  throw new Error('Persons could not be found under your account');
};

export const queryOne = async (
  personId: string,
  userId: string
): Promise<PersonType | void> => {
  const person = await DynamoClient.query({
    TableName: tables.persons,
    KeyConditionExpression: 'userId = :userId AND personId = :personId',
    ExpressionAttributeValues: {
      ':personId': personId,
      ':userId': userId,
    },
  });

  if (person.Count > 0) {
    return <PersonType>person.Items[0];
  }
  throw new Error('Person could not be found under your account');
};

export const updateOne = async (
  personId: string,
  userId,
  data: Omit<PersonType, 'personId' | 'userId' | 'createdAt'>
): Promise<void> => {
  await DynamoClient.update({
    TableName: tables.persons,
    Key: {
      personId,
      userId,
    },
    ...updateInstructions(':', data),
  });
};
