import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Page/Home/Home";
import Login from "../Page/AuthPage/Login";
import Register from "../Page/AuthPage/Register";
import PrivetRouters from "../PrivetRoutrs/PrivetRouters";
import Dashboard from "../Page/Dashborad/Dashboard";
import MyProfile from "../Page/Dashborad/MyProfile";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <p>Error</p>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
        loader: () => fetch('/district.json'),
      },
    ],
  },

  {
    path: 'dashboard',
    element: (
      <PrivetRouters>
        <Dashboard></Dashboard>
      </PrivetRouters>
    ),
    errorElement: <p>error</p>,
    children: [
      {
        path: 'profile',
        element: <PrivetRouters>
          <MyProfile></MyProfile>
        </PrivetRouters>
    }
    ],
  },
]);