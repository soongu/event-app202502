import { useEffect, useState } from "react";
import EventList from "../components/EventList";
import { useLoaderData } from "react-router-dom";

const EventsPage = () => {

  // loader가 리턴한 데이터 받아오기
  const eventList = useLoaderData();

  // const [eventList, setEventList] = useState([]);

  // useEffect는 렌더링 이후에 실행됨
  // useEffect(() => { 

  //   const fetchEvents = async () => { 
  //     const response = await fetch(`http://localhost:9000/api/events`);
  //     const responseData = await response.json();

  //     setEventList(responseData);
  //   };

  //   fetchEvents();

  // }, []);

  // console.log('event page render!!');
  
  return <EventList eventList={eventList} />;
};

export default EventsPage;
