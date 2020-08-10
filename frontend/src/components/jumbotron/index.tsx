import React from 'react';
import StyledButton from '../buttons';
import './jumbotron.scss';

const SCROLL_DELAY_TIME = 100;

const Jumbotron = (props: {
  setToggleEvents: Function;
  eventsRef: React.RefObject<HTMLDivElement>;
}) => {
  const handleClick = () => {
    props.setToggleEvents((t: boolean) => !t);
    setTimeout(() => {
      props.eventsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, SCROLL_DELAY_TIME);
  };

  return (
    <div className="bae-jumbotron">
      <div className="jumbotron-content">
        <h1>Simplify Appreciating Your Loved Ones</h1>
        <h2>Let the Scheduler Plan for You</h2>
        <img className="calendar-asset" src="/images/bae-calendar.png" />
      </div>
      <StyledButton buttonStyle="primary" handleClick={handleClick}>
        Generate Events
      </StyledButton>
    </div>
  );
};

export default Jumbotron;
