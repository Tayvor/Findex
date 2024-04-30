import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Communities from '../components/Communities';
import Threads from '../components/Threads'
import ThreadDetails from '../components/Threads/ThreadDetails';
// import EditThread from '../components/Threads/EditThread';
// import SignupFormPage from '../components/SignupFormPage';

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
      // {
      //   path: "/signup",
      //   element: <SignupFormPage />,
      // }
    ],
  },
]);
