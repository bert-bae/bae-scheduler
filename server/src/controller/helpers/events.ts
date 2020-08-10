import { getMonth, addMonths, getRandomDateInMonth } from '../../utils/dates';
import { categoryDescriptions } from '../../constants/event-constants';
import { EventCategory } from '../../types/data-model';
import { v4 as uuidv4 } from 'uuid';
import DynamoClient from '../../clients/dynamodb';
import { updateInstructions } from '../../utils/dyanmodb-helper';
import { EventType } from '../../types/data-model';
import { tables } from '../../constants/dyanmo-constants';
import { getISODate } from '../../utils/dates';

const monthHasEvent = (
  eventDates: Array<string | Date>,
  monthToFind: number
): boolean => {
  let result = false;
  eventDates.forEach((date) => {
    if (getMonth(date) === monthToFind) {
      result = true;
    }
  });

  return result;
};

const getRandomCategory = (): EventCategory => {
  const categories = Object.keys(EventCategory);
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];

  return EventCategory[randomCategory];
};

export const getRandomEventDates = (
  initialDates: Array<string | Date>,
  numberOfEvents: number
): Array<string | Date> => {
  const dates = [...initialDates];

  let date = new Date();
  while (dates.length < numberOfEvents) {
    if (monthHasEvent(dates, getMonth(date))) {
      date = addMonths(date, 1);
      continue;
    }

    dates.push(getRandomDateInMonth(date));
  }

  return dates;
};

export const seedCategoryOnEvent = (
  eventDates: Array<string | Date>
): Array<{
  category: EventCategory;
  datetime: string | Date;
  description: string;
}> => {
  return eventDates.map((date) => {
    const category = getRandomCategory();
    return {
      datetime: date,
      category,
      description: categoryDescriptions[category],
    };
  });
};

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

export const queryEventsByPerson = async (
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

export const create = async (
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

export const update = async (
  personId: string,
  eventId: string,
  data: object
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
