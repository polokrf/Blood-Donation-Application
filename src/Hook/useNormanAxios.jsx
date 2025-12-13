import axios from 'axios';
import React from 'react';

const instance = axios.create({
  baseURL: 'https://blood-donation-server-rho.vercel.app',
});

const useNormanAxios = () => {
  return instance;
};

export default useNormanAxios;
