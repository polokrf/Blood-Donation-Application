import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
  AOS.init({
    duration: 1000, 
    once: true, 
  });
const Root = () => {
  return (
    <div className='flex flex-col min-h-screen  overflow-hidden'>
      <Header></Header> 
      <div className='flex-1'><Outlet></Outlet></div>
      <Footer></Footer>
    </div>
  );
};

export default Root;