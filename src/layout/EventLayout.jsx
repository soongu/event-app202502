import EventsNavigation from './EventsNavigation';
import { Outlet } from 'react-router-dom';

const EventLayout = () => {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
};

export default EventLayout;
