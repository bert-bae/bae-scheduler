import { UserType } from '../../types/data-model';
import { tables } from '../../constants/dyanmo-constants';

export const createUserParams = (
  data: UserType
): {
  TableName: string;
  Item: UserType;
} => {
  return {
    TableName: tables.users,
    Item: data,
  };
};
