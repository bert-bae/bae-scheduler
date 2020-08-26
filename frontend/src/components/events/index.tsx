import React from 'react';
import EventBox from '../event-box';

import { IMapGeneratedEvent } from '../../types/events';
import './event-container.scss';

const EventsContainer = (props: {
  events: IMapGeneratedEvent;
  showEvents: boolean;
  setRef: React.RefObject<HTMLDivElement>;
}) => {
  const eventMap = Object.keys(props.events);

  return (
    <div
      className="bae-event-container"
      id="bae-event-target"
      data-show="false"
      ref={props.setRef}
    >
      {eventMap.map((key, i) => {
        return (
          <EventBox
            event={props.events[key]}
            showEvents={props.showEvents}
            order={i}
            key={i}
          ></EventBox>
        );
      })}
    </div>
  );
};

export default EventsContainer;
