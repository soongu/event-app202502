import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import EventsPage, { loader as eventsLoader } from '../pages/EventsPage';
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
            // loader함수는 이 페이지가 라우팅될 때 자동으로 트리거되는 함수
            loader: eventsLoader,
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
