import {
  addMonths,
  getMonth,
  getRandomDateInMonth,
  validateDates,
} from '../utils/dates';
import { monthsInYear } from '../constants/date-constants';

type ListOfDates = Array<string | Date>;

const monthHasEvent = (
  eventDates: ListOfDates,
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

const createNumberOfEvents = async (req, res, next) => {
  const body: {
    numberOfEvents: number;
    specificDates: ListOfDates;
  } = req.body;
  const eventDates: ListOfDates = body.specificDates || [];
  const numberOfEventsToMake = body.numberOfEvents || monthsInYear;

  try {
    validateDates(eventDates);

    let date = new Date();
    console.log(date);
    while (eventDates.length < numberOfEventsToMake) {
      if (monthHasEvent(eventDates, getMonth(date))) {
        console.log(addMonths(date, 1));
        date = addMonths(date, 1);
        continue;
      }

      eventDates.push(getRandomDateInMonth(date));
    }

    console.log(eventDates);
  } catch (err) {
    // res.status(500).json(err);
  }
};

createNumberOfEvents({ body: {} }, {}, {});
