import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Page/Home/Home";
import Login from "../Page/AuthPage/Login";
import Register from "../Page/AuthPage/Register";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <p>Error</p>,
    children: [
      {
        index: true,
        Component: Home
        
      },
      {
        path: 'login',
        Component:Login
      },
      {
        path: 'register',
        Component: Register,
        loader:()=>fetch('/district.json')
        
      }
    ]
  },
])