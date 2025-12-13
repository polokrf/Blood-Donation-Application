import React, { use } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hook/useAuth';
import Loader from '../LodingAndErrorPage/Loader';


const PrivetRouters = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loader></Loader>;
  }
  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivetRouters;
