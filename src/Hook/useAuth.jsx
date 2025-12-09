import React, { use } from 'react';

import { AuthContext } from '../Auth/AuthContext';


const useAuth = () => {
  const authCon = use(AuthContext);

  return authCon
};

export default useAuth;