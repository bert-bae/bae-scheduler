import { v4 as uuid } from "uuid";
import { IMapGeneratedEvent, IGeneratedEvent } from "../types/events";
import { HashMap } from "../types/generic";

export const transformEventArrayToMap = (
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

export const arrayToMap = (arr: Array<any>) => {
  const result: HashMap = {};

  arr.forEach((val, i) => {
    result[i] = val;
  });

  return result;
};
