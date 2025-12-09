import React, { use } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hook/useAuth';

const PrivetRouters = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <p>Loading...</p>
  }
  if (user){
    return children
  };
  
  return  <Navigate state={location.pathname}  to='/login'></Navigate>
};

export default PrivetRouters;