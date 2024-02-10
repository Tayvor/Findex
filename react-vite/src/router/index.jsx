import { createBrowserRouter } from 'react-router-dom';
// import LoginFormPage from '../components/LoginFormPage';
// import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import CreateThread from '../components/Threads/CreateThread';
import ThreadDetails from '../components/Threads/ThreadDetails';
import EditThread from '../components/Threads/EditThread';
import Home from '../components/Home';
import Images from '../components/Images';
import UploadImage from '../components/Images/UploadImage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/new-thread",
        element: <CreateThread />,
      },
      {
        path: "/new-image",
        element: <UploadImage />,
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
