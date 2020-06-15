import { UserType } from '../../types/data-model';
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

export const getUserParams = (
  email: string,
  password: string
): {
  TableName: string;
  Key: {
    [propNames: string]: any;
  };
  [propNames: string]: any;
} => {
  return {
    TableName: tables.users,
    Key: {
      email,
      password,
    },
  };
};
