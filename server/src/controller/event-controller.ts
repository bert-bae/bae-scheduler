import { getRandomEventDates, seedCategoryOnEvent } from './helpers/events';
import { validateDates } from '../utils/dates';
import { monthsInYear } from '../constants/date-constants';

type ListOfDates = Array<string | Date>;

const createNumberOfEvents = async (req, res, next) => {
  const body: {
    numberOfEvents: number;
    specificDates: ListOfDates;
  } = req.body;
  const initialDates = body.specificDates || [];
  const numberOfEventsToMake = body.numberOfEvents || monthsInYear;

  try {
    validateDates(initialDates);

    const eventDates = getRandomEventDates(initialDates, numberOfEventsToMake);

    res.status(200).json({
      events: seedCategoryOnEvent(eventDates),
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default {
  createNumberOfEvents,
};
