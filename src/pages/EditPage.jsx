import { useLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

const EditPage = () => {

  const event = useLoaderData();
  // console.log(event);
  
  return <EventForm method='PUT' event={event} />;
};

export default EditPage;
