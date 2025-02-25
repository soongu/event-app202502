import { redirect, useLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';
import { EVENT_API_URL } from '../config/host-config';
import { getUserToken } from '../config/auth-config';
import { fetchWithAuth } from '../services/api';


const EventDetailPage = () => {

  const eventData = useLoaderData();
  
  // const { eventId } = useParams();

  // const [eventData, setEventData] = useState({});

  // useEffect(() => {
  //   const fetchDetailEvent = async () => {
  //     const response = await fetch(
  //       `http://localhost:9000/api/events/${eventId}`
  //     );
  //     const data = await response.json();
  //     setEventData(data);
  //   };

  //   fetchDetailEvent();
  // }, []);

  return <EventItem event={eventData} />;
};

export default EventDetailPage;

export const loader = async ({ params }) => {

  const { eventId } = params;

  // console.log(x);
  // console.log(params.eventId);

  const response = await fetchWithAuth(`${EVENT_API_URL}/${eventId}`);

  return response;
};


// 삭제처리 액션 함수
export const deleteAction = async ({ params }) => {
  // console.log('삭제 액션 트리거!');

  if (!confirm('정말 삭제하시겠습니까?')) return;

  const res = await fetchWithAuth(`${EVENT_API_URL}/${params.eventId}`, 'DELETE');
  
  return redirect('/events');
};