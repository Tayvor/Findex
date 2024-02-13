import { createBrowserRouter } from 'react-router-dom';
// import LoginFormPage from '../components/LoginFormPage';
// import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ThreadDetails from '../components/Threads/ThreadDetails';
import EditThread from '../components/Threads/EditThread';
import Home from '../components/Home';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
