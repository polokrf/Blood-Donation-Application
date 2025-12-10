import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Page/Home/Home";
import Login from "../Page/AuthPage/Login";
import Register from "../Page/AuthPage/Register";
import PrivetRouters from "../PrivetRoutrs/PrivetRouters";
import Dashboard from "../Page/Dashborad/Dashboard";
import MyProfile from "../Page/Dashborad/MyProfile";
import CreateDonation from "../Page/Dashborad/CreateDonation";
import MyDonationRequests from "../Page/Dashborad/MyDonationRequests";
import EditPage from "../Page/Dashborad/EditPage";
import ViewPage from "../Page/Dashborad/ViewPage";
import AllUsers from "../Page/Dashborad/Admin/AllUsers";
import AllBloodDonation from "../Page/Dashborad/Admin/AllBloodDonation";
import AdminPrivetRouter from "../PrivetRoutrs/AdminPrivet/AdminPrivetRouter";
import VolunteerAdminPrivet from "../PrivetRoutrs/AdminPrivet/VolunteerAdminPrivet";
import DonorWelcome from "../Page/Dashborad/WelComePage/DonorWelcome";
import Funding from "../Page/Dashborad/Payment/Funding";
import PaymentSuccess from "../Page/Dashborad/Payment/PaymentSuccess";
import PAymentCanceled from "../Page/Dashborad/Payment/PAymentCanceled";




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
        index: 'dashboard',
        element: (
          <PrivetRouters>
            <DonorWelcome></DonorWelcome>
          </PrivetRouters>
        ),
      },
      {
        path: 'founding',
        element: (
          <PrivetRouters>
            <Funding></Funding>
          </PrivetRouters>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivetRouters>
            <MyProfile></MyProfile>
          </PrivetRouters>
        ),
      },
      {
        path: 'create-donation-request',
        element: (
          <PrivetRouters>
            <CreateDonation></CreateDonation>
          </PrivetRouters>
        ),
        loader: () => fetch('/district.json'),
      },
      {
        path: 'my-donation-requests',
        element: (
          <PrivetRouters>
            <MyDonationRequests></MyDonationRequests>
          </PrivetRouters>
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <PrivetRouters>
            <EditPage></EditPage>
          </PrivetRouters>
        ),
        loader: () => fetch('/district.json'),
      },
      {
        path: 'view/:id',
        element: (
          <PrivetRouters>
            <ViewPage></ViewPage>
          </PrivetRouters>
        ),
        loader: () => fetch('/district.json'),
      },
      {
        path: 'all-users',
        element: (
          <AdminPrivetRouter>
            <PrivetRouters>
              <AllUsers></AllUsers>
            </PrivetRouters>
          </AdminPrivetRouter>
        ),
      },
      {
        path: 'all-blood-donation-request',
        element: (
          <VolunteerAdminPrivet>
            <PrivetRouters>
              <AllBloodDonation></AllBloodDonation>
            </PrivetRouters>
          </VolunteerAdminPrivet>
        ),
      },
      {
        path: 'payment-success',
        element: (
          <PrivetRouters>
            <PaymentSuccess></PaymentSuccess>
          </PrivetRouters>
        ),
      },
      {
        path: 'payment-canceled',
        element: (
          <PrivetRouters>
            <PAymentCanceled></PAymentCanceled>
          </PrivetRouters>
        ),
      },
    ],
  },
]);