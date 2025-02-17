import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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


  return (
    <>
      <h1>Events Page</h1>
      <ul>
        {eventList.map((ev) => (
          <li key={ev.eventId}>
            <Link to={`/events/${ev.eventId}`}>{ev.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EventsPage;
