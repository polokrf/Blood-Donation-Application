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
    <div className="flex flex-col min-h-screen  overflow-hidden ">
      <div className="sticky top-0 z-10 ">
        <Header></Header>
      </div>
      <div className="flex-1 md:max-w-[1300px] mx-auto w-full">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;