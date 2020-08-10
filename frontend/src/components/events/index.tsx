import React from 'react';
import './event-container.scss';

const EventsContainer = (props: { events: Array<{}>; toggle: boolean }) => {
  return <div className="bae-event-container" data-toggle={props.toggle}></div>;
};

export default EventsContainer;
