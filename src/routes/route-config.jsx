import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import EventsPage from '../pages/EventsPage';
import RootLayout from '../layout/RootLayout';
import EventDetailPage from '../pages/EventDetailPage';
import EventLayout from '../layout/EventLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/events',
        element: <EventLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
          },
          {
            path: ':eventId',
            element: <EventDetailPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
