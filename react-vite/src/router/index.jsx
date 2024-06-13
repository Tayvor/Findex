import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Communities from '../components/Communities';
import Threads from '../components/Threads'
import ThreadDetails from '../components/Threads/ThreadDetails';
import SignupForm from '../components/SignupForm';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Communities />,
      },
      {
        path: "/communities/:communityId",
        element: <Threads />,
      },
      {
        path: "/communities/:communityId/threads/:threadId",
        element: <ThreadDetails />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      }
    ],
  },
]);
