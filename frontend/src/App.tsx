import React, { useState, useRef, useEffect } from "react";
import NavigationBar from "./components/navbar";
import Jumbotron from "./components/jumbotron";
import EventsContainer from "./components/events";

import { transformEventArrayToMap } from "./utils/data-normalizer";
import { IMapGeneratedEvent } from "./types/events";

const dummyEventData = [
  {
    category: "Appreciation",
    description: "Appreciation description goes here",
    datetime: new Date().toISOString(),
  },
  {
    category: "Gift",
    description: "Gift description goes here",
    datetime: new Date().toISOString(),
  },
  {
    category: "Experience",
    description: "Experience description goes here",
    datetime: new Date().toISOString(),
  },
  {
    category: "Activity",
    description: "Activity description goes here",
    datetime: new Date().toISOString(),
  },
  {
    category: "Activity",
    description: "Activity description goes here",
    datetime: new Date().toISOString(),
  },
  {
    category: "Gift",
    description: "Gift description goes here",
    datetime: new Date().toISOString(),
  },
];

const App = () => {
  const [showEvents, setShowEvents] = useState(false);
  const [events, setEvents] = useState<IMapGeneratedEvent>({});
  const eventsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEvents(transformEventArrayToMap(dummyEventData));
  }, []);

  return (
    <div className="App">
      <NavigationBar />
      <Jumbotron
        eventsRef={eventsRef}
        showEvents={showEvents}
        setEvents={setEvents}
        setShowEvents={setShowEvents}
      />
      <EventsContainer
        setRef={eventsRef}
        events={events}
        showEvents={showEvents}
      />
    </div>
  );
};

export default App;
