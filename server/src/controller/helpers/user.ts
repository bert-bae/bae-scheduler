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

export const getUser = async (email: string): Promise<UserType | null> => {
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
    const output = user.Items[0];
    return {
      firstName: output.firstName,
      lastName: output.lastName,
      email: output.email,
      verified: output.verified,
      userId: output.userId,
      password: output.password,
    };
  }
};
