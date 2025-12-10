import React from 'react';
import useAuth from '../../../Hook/useAuth';

const AdminWelcome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>welcome { user?.displayName}</h2>
    </div>
  );
};

export default AdminWelcome;