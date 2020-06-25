import { v4 as uuidv4 } from 'uuid';
import DynamoClient from '../../clients/dynamodb';
import { updateInstructions } from '../../utils/dyanmodb-helper';
import { EventType } from '../../types/data-model';
import { tables } from '../../constants/dyanmo-constants';
import { getISODate } from '../../utils/dates';

export const queryEvent = async (
  personId: string,
  eventId: string
): Promise<EventType> => {
  const event = await DynamoClient.get({
    TableName: tables.events,
    KeyConditionExpression: 'personId = :personId AND eventId = :eventId',
    ExpressionAttributeValues: {
      ':personId': personId,
      ':eventId': eventId,
    },
  });

  return <EventType>event.Item;
};

export const queryAllByPerson = async (
  personId: string
): Promise<EventType[]> => {
  const events = await DynamoClient.query({
    TableName: tables.events,
    KeyConditionExpression: 'personId = :personId',
    ExpressionAttributeValues: {
      ':personId': personId,
    },
  });

  if (events.Count > 0) {
    return <EventType[]>events.Items;
  }
  throw new Error(
    `Events could not be found under the specified person with ID "${personId}"`
  );
};

export const createEvent = async (
  data: Omit<EventType, 'eventId' | 'createdAt' | 'updatedAt'>
): Promise<EventType> => {
  const currentDate = getISODate();
  const params = {
    TableName: tables.events,
    Item: {
      ...data,
      eventId: uuidv4(),
      createdAt: currentDate,
      updatedAt: currentDate,
    },
  };

  await DynamoClient.create(params);

  return params.Item;
};

export const updateEvent = async (
  personId: string,
  eventId: string,
  data: Omit<EventType, 'eventId' | 'personId' | 'userId' | 'createdAt'>
): Promise<void> => {
  await DynamoClient.update({
    TableName: tables.events,
    Key: {
      eventId,
      personId,
    },
    ...updateInstructions(':', data),
  });
};
