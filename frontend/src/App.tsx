import React, { useState, useRef } from 'react';
import NavigationBar from './components/navbar';
import Jumbotron from './components/jumbotron';
import EventsContainer from './components/events';

const dummyEventData = [
  {
    category: 'Appreciation',
    description: 'Appreciation description goes here',
    datetime: new Date().toISOString(),
  },
  {
    category: 'Gift',
    description: 'Gift description goes here',
    datetime: new Date().toISOString(),
  },
  {
    category: 'Experience',
    description: 'Experience description goes here',
    datetime: new Date().toISOString(),
  },
  {
    category: 'Activity',
    description: 'Activity description goes here',
    datetime: new Date().toISOString(),
  },
  {
    category: 'Activity',
    description: 'Activity description goes here',
    datetime: new Date().toISOString(),
  },
  {
    category: 'Gift',
    description: 'Gift description goes here',
    datetime: new Date().toISOString(),
  },
];

function App() {
  const [toggleEvents, setToggleEvents] = useState(false);
  const eventsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <NavigationBar />
      <Jumbotron setToggleEvents={setToggleEvents} eventsRef={eventsRef} />
      <EventsContainer
        setRef={eventsRef}
        events={dummyEventData}
        toggle={toggleEvents}
      />
    </div>
  );
}

export default App;
