import { createBrowserRouter } from 'react-router-dom';
// import LoginFormPage from '../components/LoginFormPage';
// import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Threads from '../components/Threads';
import CreateThread from '../components/Threads/CreateThread';

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
        element: <div>viewing a thread</div>,
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
