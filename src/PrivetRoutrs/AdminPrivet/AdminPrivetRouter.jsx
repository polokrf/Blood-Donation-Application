import React from 'react';
import useRole from '../../Hook/useRole';
import { Navigate } from 'react-router';

import Loader from '../../LodingAndErrorPage/Loader';

const AdminPrivetRouter = ({ children }) => {
  const { role, isLoading } = useRole();
  if (isLoading) {
    return <Loader></Loader>;
  }
  if (role === 'Admin') {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default AdminPrivetRouter;
