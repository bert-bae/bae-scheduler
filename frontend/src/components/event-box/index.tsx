import React, { useEffect, useRef } from 'react';
import dateUtils from '../../utils/dates';
import { IGeneratedEvent } from '../../types/events';
import './event-box.scss';

const INITIAL_TRANSITION_DELAY = 1250;
const INCREMENTAL_TRANSITION_DELAY = 250;

const EventBox = (props: { event: IGeneratedEvent; order: number }) => {
  const event = props.event;
  const eventRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const transitionTime =
      props.order * INCREMENTAL_TRANSITION_DELAY + INITIAL_TRANSITION_DELAY;

    setTimeout(() => {
      eventRef.current?.setAttribute('data-visible', 'true');
    }, transitionTime);
  });

  return (
    <div
      className="bae-event-box"
      data-event-category={event.category}
      data-visible="false"
      ref={eventRef}
    >
      <h3>{event.title || `${event.category} Event`}</h3>
      <h4 className="event-date">
        {dateUtils.getReadableEventDate(event.datetime)}
      </h4>
      <p>{event.description || 'Add a custom description'}</p>
    </div>
  );
};

export default EventBox;
