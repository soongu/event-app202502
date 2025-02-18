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

// loader를 아웃소싱
// export const loader = async () => fetch(`http://localhost:9000/api/events`);


export const loader = async () => {
  const res = await fetch(`http://localhost:9000/api/events`);
  // const jsonData = await res.json();

  // loader가 리턴한 데이터는 라우팅된 페이지와
  // 그 컴포넌트의 하위 컴포넌트에서 언제든 뽑아서 사용할 수 있음
  return res; // loader는 fetch결과를 바로 리턴하는 경우 json추출작업을 자동수행
};
