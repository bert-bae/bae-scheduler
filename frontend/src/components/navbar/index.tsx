import React from 'react';
import './navigation-bar.scss';

const NavigationBar = () => {
  return (
    <div className="bae-navbar">
      <div className="navbar-content">
        <div className="logo-container">
          <img
            className="bae-logo"
            src="/images/logo.svg"
            alt="Bae site logo"
          />
          <p className="logo-sub">Scheduler</p>
        </div>
      </div>
      <div className="navbar-content right"></div>
    </div>
  );
};

export default NavigationBar;
