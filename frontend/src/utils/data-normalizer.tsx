import { v4 as uuid } from 'uuid';
import { IMapGeneratedEvent, IGeneratedEvent } from '../types/events';

export const transformArrayToMap = (
  events: IGeneratedEvent[]
): IMapGeneratedEvent => {
  const result: IMapGeneratedEvent = {};

  events.forEach((event) => {
    const id: string = event.id || uuid();

    if (!result[id]) {
      result[id] = event;
    }
  });

  return result;
};
