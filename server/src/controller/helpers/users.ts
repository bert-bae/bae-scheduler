import { v4 as uuidv4 } from 'uuid';
import DynamoClient from '../../clients/dynamodb';
import { UserType } from '../../types/data-model';
import { tables } from '../../constants/dyanmo-constants';
import { getISODate } from '../../utils/dates';

export const createUserParams = (
  data: Omit<UserType, 'userId' | 'verified' | 'createdAt' | 'updatedAt'>
): {
  TableName: string;
  Item: UserType;
} => {
  const currentDate = getISODate();

  return {
    TableName: tables.users,
    Item: {
      ...data,
      userId: uuidv4(),
      verified: false,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
  };
};

export const getUser = async (email: string): Promise<UserType | void> => {
  const user = await DynamoClient.query({
    TableName: tables.users,
    KeyConditionExpression: '#email = :email',
    ExpressionAttributeNames: {
      '#email': 'email',
    },
    ExpressionAttributeValues: {
      ':email': email,
    },
  });

  if (user.Count) {
    return <UserType>user.Items[0];
  }
};
