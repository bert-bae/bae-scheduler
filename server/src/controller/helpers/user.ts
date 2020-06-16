import { UserType } from '../../types/data-model';
import DynamoClient from '../../clients/dynamodb';
import { tables } from '../../constants/dyanmo-constants';
import { getISODate } from '../../utils/dates';

export const createUserParams = (
  data: Omit<UserType, 'verified' | 'createdAt' | 'updatedAt'>
): {
  TableName: string;
  Item: UserType;
} => {
  const currentDate = getISODate();

  return {
    TableName: tables.users,
    Item: {
      ...data,
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
