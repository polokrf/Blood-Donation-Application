import React from 'react';
import useRole from '../../Hook/useRole';
import { Navigate } from 'react-router';

const AdminPrivetRouter = ({children}) => {
  const { role, isLoading } = useRole();
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (role === 'Admin') {
    return children
  }
  return <Navigate to='/'></Navigate>
};

export default AdminPrivetRouter;