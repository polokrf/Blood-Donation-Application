import React from 'react';
import useRole from '../../Hook/useRole';
import { Navigate } from 'react-router';
import Loading from '../../LodingAndErrorPage/Loader';
import Loader from '../../LodingAndErrorPage/Loader';

const VolunteerAdminPrivet = ({ children }) => {
  const { role, isLoading } = useRole();
  if (isLoading) {
    return <Loader></Loader>;
  }
  if (role === 'Admin' || role === 'Volunteer') {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default VolunteerAdminPrivet;
