import React from 'react';
import useRole from '../../../Hook/useRole';
import DonorWelcome from './DonorWelcome';
import AdminWelcome from './AdminWelcome';
import Loader from '../../../LodingAndErrorPage/Loader';

const WelcomePage = () => {
  const { role, isLoading } = useRole();
  if (isLoading) {
    return <Loader></Loader>
  }
  
  return (
    <div>
      {role === 'Donor' ?<DonorWelcome></DonorWelcome>:<AdminWelcome></AdminWelcome>}
    </div>
  );
};

export default WelcomePage;