import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetailPage = () => {

  const { eventId } = useParams();

  const [ eventData, setEventData ] = useState({});

  useEffect(() => { 
    const fetchDetailEvent = async () => { 
      const response = await fetch(`http://localhost:9000/api/events/${eventId}`);
      const data = await response.json();
      setEventData(data);
    };

    fetchDetailEvent();
  }, []);
  
  return (
    <>
      <h1>Event detail Page</h1>
      <p>Event Id: { eventId }</p>
      <p>Event title: { eventData?.title }</p>
      <p>Event description: { eventData?.desc }</p>
      <p>Event Date: {eventData?.["start-date"]}</p>
    </>
  );
};

export default EventDetailPage;
