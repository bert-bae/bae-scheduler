import React, { useEffect } from 'react';
import EventBox from '../event-box';

import { IGeneratedEvent } from '../../types/events';
import './event-container.scss';

const EventsContainer = (props: {
  events: Array<IGeneratedEvent>;
  setRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      className="bae-event-container"
      id="bae-event-target"
      data-show="false"
      ref={props.setRef}
    >
      {props.events.map((event, i) => {
        return <EventBox event={event} order={i} key={i}></EventBox>;
      })}
    </div>
  );
};

export default EventsContainer;
