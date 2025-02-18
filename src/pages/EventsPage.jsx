import { useEffect, useState } from "react";
import EventList from "../components/EventList";

const EventsPage = () => {

  const [eventList, setEventList] = useState([]);

  useEffect(() => { 

    const fetchEvents = async () => { 
      const response = await fetch(`http://localhost:9000/api/events`);
      const responseData = await response.json();

      setEventList(responseData);
    };

    fetchEvents();

  }, []);


  return <EventList eventList={eventList} />;
};

export default EventsPage;
