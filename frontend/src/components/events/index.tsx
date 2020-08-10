import React from 'react';
import EventBox from '../event-box';

import { IGeneratedEvent } from '../../types/events';
import './event-container.scss';

const EventsContainer = (props: {
  events: Array<IGeneratedEvent>;
  toggle: boolean;
}) => {
  return (
    <div className="bae-event-container" data-toggle={props.toggle}>
      <EventBox event={props.events[0]}></EventBox>
      <EventBox event={props.events[1]}></EventBox>
      <EventBox event={props.events[2]}></EventBox>
      <EventBox event={props.events[3]}></EventBox>
      <EventBox event={props.events[4]}></EventBox>
      <EventBox event={props.events[5]}></EventBox>
    </div>
  );
};

export default EventsContainer;
