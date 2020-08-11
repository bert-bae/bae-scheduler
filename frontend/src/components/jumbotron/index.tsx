import React, { useState } from 'react';
import StyledButton from '../buttons';
import './jumbotron.scss';

const SCROLL_DELAY_TIME = 100;

const setButtonText = (isClicked: boolean): string => {
  return isClicked ? 'Regenerate Events' : 'Generate Events';
};

const Jumbotron = (props: {
  eventsRef: React.RefObject<HTMLDivElement>;
  showEvents: boolean;
  setShowEvents: Function;
  setEvents: Function;
}) => {
  const handleClick = () => {
    props.eventsRef.current?.setAttribute('data-show', 'true');

    setTimeout(() => {
      props.eventsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, SCROLL_DELAY_TIME);

    props.setShowEvents(true);
  };

  return (
    <div className="bae-jumbotron">
      <div className="jumbotron-content">
        <h1>Never Forget to Appreciate Your Loved Ones</h1>
        <h2>Let the Scheduler Remember for You</h2>
        <div className="calendar-asset"></div>
        <StyledButton buttonStyle="primary" handleClick={handleClick}>
          {setButtonText(props.showEvents)}
        </StyledButton>
      </div>
    </div>
  );
};

export default Jumbotron;
