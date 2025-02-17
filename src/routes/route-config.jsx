import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import EventsPage from "../pages/EventsPage";
import RootLayout from "../layout/RootLayout";
import EventDetailPage from "../pages/EventDetailPage";

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
        element: <EventsPage />,
      },
      {
        path: '/events/:eventId',
        element: <EventDetailPage />
      }
    ],
  },
]);

export default router;