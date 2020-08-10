import React from 'react';
import dateUtils from '../../utils/dates';
import { IGeneratedEvent } from '../../types/events';
import './event-box.scss';

const EventBox = (props: { event: IGeneratedEvent }) => {
  const event = props.event;

  return (
    <div className="bae-event-box" data-event-category={event.category}>
      <h3>{event.title || `${event.category} Event`}</h3>
      <h4 className="event-date">
        {dateUtils.getReadableEventDate(event.datetime)}
      </h4>
      <p>{event.description || 'Add a custom description'}</p>
    </div>
  );
};

export default EventBox;
