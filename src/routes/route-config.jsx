import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import EventsPage, { loader as eventsLoader } from '../pages/EventsPage';
import RootLayout from '../layout/RootLayout';
import EventDetailPage, { loader as eventDetailLoader, deleteAction } from '../pages/EventDetailPage';
import EventLayout from '../layout/EventLayout';
import NewEventPage, {action as manipulateAction} from '../pages/NewEventPage';
import EditPage from '../pages/EditPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
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
            // loader: eventsLoader,
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateAction,
          },
          {
            path: ':eventId',
            element: <EventDetailPage />,
            loader: eventDetailLoader,
            action: deleteAction
          },
          {
            path: ':eventId/edit',
            element: <EditPage />,
            loader: eventDetailLoader,
            action: manipulateAction,
          },
        ],
      },
    ],
  },
]);

export default router;
