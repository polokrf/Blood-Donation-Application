import React from 'react';
import useRole from '../../../Hook/useRole';
import DonorWelcome from './DonorWelcome';
import AdminWelcome from './AdminWelcome';

const WelcomePage = () => {
  const role = useRole()
  return (
    <div>
      {role === 'Donor' ?<DonorWelcome></DonorWelcome>:<AdminWelcome></AdminWelcome>}
    </div>
  );
};

export default WelcomePage;