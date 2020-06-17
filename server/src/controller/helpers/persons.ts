import { v4 as uuidv4 } from 'uuid';
import DynamoClient from '../../clients/dynamodb';
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
