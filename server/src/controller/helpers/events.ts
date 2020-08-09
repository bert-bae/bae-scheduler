import { getMonth, addMonths, getRandomDateInMonth } from '../../utils/dates';
import { categoryDescriptions } from '../../constants/event-constants';
import { EventCategory } from '../../types/data-model';

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
