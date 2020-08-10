import React, { useState } from 'react';
import StyledButton from '../buttons';
import './jumbotron.scss';

const SCROLL_DELAY_TIME = 100;

const setButtonText = (isClicked: boolean): string => {
  return isClicked ? 'Regenerate Events' : 'Generate Events';
};

const Jumbotron = (props: { eventsRef: React.RefObject<HTMLDivElement> }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    props.eventsRef.current?.setAttribute('data-show', 'true');

    setTimeout(() => {
      props.eventsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, SCROLL_DELAY_TIME);
    setIsClicked(true);
  };

  return (
    <div className="bae-jumbotron">
      <div className="jumbotron-content">
        <h1>Simplify Appreciating Your Loved Ones</h1>
        <h2>Let the Scheduler Plan for You</h2>
        <img className="calendar-asset" src="/images/bae-calendar.png" />
      </div>
      <StyledButton buttonStyle="primary" handleClick={handleClick}>
        {setButtonText(isClicked)}
      </StyledButton>
    </div>
  );
};

export default Jumbotron;
