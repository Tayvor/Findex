import { createBrowserRouter } from 'react-router-dom';
// import LoginFormPage from '../components/LoginFormPage';
// import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Threads from '../components/Threads';
import CreateThread from '../components/Threads/CreateThread';
import ThreadDetails from '../components/Threads/ThreadDetails';
import EditThread from '../components/Threads/EditThread';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Threads />,
      },
      {
        path: "/create-thread",
        element: <CreateThread />,
      },
      {
        path: "/threads/:threadId",
        element: <ThreadDetails />,
      },
      {
        path: "/threads/:threadId/edit",
        element: <EditThread />,
      },
      // {
      //   path: "/threads/:threadId/reply",
      //   element: <EditThread />,
      // },
      // {
      //   path: "login",
      //   element: <LoginFormPage />,
      // },
      // {
      //   path: "signup",
      //   element: <SignupFormPage />,
      // },
    ],
  },
]);
