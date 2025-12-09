import React from 'react';
import useRole from '../../Hook/useRole';
import { Navigate } from 'react-router';

const VolunteerAdminPrivet = ({children}) => {
  const { role, isLoading } = useRole();
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (role === 'Admin' || role === 'Volunteer') {
    return children;
  }
  return <Navigate to='/'></Navigate>
};

export default VolunteerAdminPrivet;