import React from 'react';
import useAuth from './useAuth';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
  const { user } = useAuth();
  const instance = useAxios();

  const { data: role ='Donor',isLoading } = useQuery({
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      const res = await instance.get(`/users/${user?.email}/role`)
      return res.data.role
    }
  });
  
  return {role,isLoading}
};

export default useRole;