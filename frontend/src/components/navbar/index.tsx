import React, { useRef, useEffect } from 'react';
import './navigation-bar.scss';

const NavigationBar = () => {
  const navRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 70) {
      navRef.current?.setAttribute('data-hidden', 'true');
    } else {
      navRef.current?.setAttribute('data-hidden', 'false');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bae-navbar" ref={navRef}>
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
