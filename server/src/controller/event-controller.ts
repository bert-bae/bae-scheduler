import { isEmpty } from 'lodash';
import * as personSvc from './helpers/persons';
import * as eventSvc from './helpers/events';
import { EventType } from '../types/data-model';
import { pickKeys } from '../utils/object-modifier';

const createEventRecord = async (req, res, next) => {
  const body: EventType = req.body;
  const { personId } = req.params;

  try {
    const event = await eventSvc.create({
      ...body,
      personId,
    });

    res.status(200).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error:
        'There was an error creating a new event entry. Please try again later.',
    });
  }
};

const updateEventRecord = async (req, res, next) => {
  const body = req.body;
  const { personId, eventId } = req.params;
  const { userId } = req.user;

  try {
    const person = await personSvc.queryOne(personId, userId);

    if (!person) {
      throw new Error(
        'You are not authorized to edit this record. Are you logged in under the correct account?'
      );
    }

    await eventSvc.update(
      personId,
      eventId,
      pickKeys(body, [
        'title',
        'datetime',
        'category',
        'description',
        'reminders',
      ])
    );

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error:
        'There was an error updating the event entry. Please try again later.',
    });
  }
};

const getEventRecord = async (req, res, next) => {
  const { personId, eventId } = req.params;

  try {
    const event = await eventSvc.queryEvent(personId, eventId);

    if (!event) {
      throw new Error('Event could not be found');
    }

    res.status(200).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `There was an error retrieving your event! ${err.message}.`,
    });
  }
};

const getEventsByPerson = async (req, res, next) => {
  const { personId } = req.params;

  try {
    const events = await eventSvc.queryEventsByPerson(personId);

    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: `There was an error retrieving events! ${err.message}.`,
    });
  }
};

export default {
  createEventRecord,
  updateEventRecord,
  getEventRecord,
  getEventsByPerson,
};
