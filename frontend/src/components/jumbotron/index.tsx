import React from 'react';
import StyledButton from '../buttons';
import './jumbotron.scss';

function Jumbotron(props: { setToggleEvents: Function }) {
  const handleClick = () => {
    props.setToggleEvents((t: boolean) => !t);
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
}

export default Jumbotron;
