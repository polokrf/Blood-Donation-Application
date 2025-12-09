import axios from 'axios';

import React, { useEffect } from 'react';
import useAuth from './useAuth';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

const useAxios = () => {
  const {user,logOut} =useAuth()

  useEffect(() => {
   const chakUSerInfo = instance.interceptors.request.use(config => {
      if (user) {
        config.headers.Authorization =`Bearer ${user?.accessToken}`;
    }
      return config
   })
    
    const chakeResponce = instance.interceptors.response.use(res => { 
      return res
    }, error => {

      const errorStatus = error.response.status;
      if (errorStatus === 401 && errorStatus === 403) {
        return logOut().then(res => {
          
        }).catch(err => {
          console.log(err)
        })
      }
      return error
    })
    
    return () => {
      instance.interceptors.request.eject(chakUSerInfo);
      instance.interceptors.response.eject(chakeResponce)
    }
  },[user,logOut])
  return instance;

};

export default useAxios;