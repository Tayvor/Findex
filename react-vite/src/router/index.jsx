import { createBrowserRouter } from 'react-router-dom';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ThreadDetails from '../components/Threads/ThreadDetails';
import EditThread from '../components/Threads/EditThread';
import Base from '../components/Base';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Base />,
      },
      {
        path: "/threads/:threadId",
        element: <ThreadDetails />,
      },
      {
        path: "/threads/:threadId/edit",
        element: <EditThread />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      }
    ],
  },
]);
