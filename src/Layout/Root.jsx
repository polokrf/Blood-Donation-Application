import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lenis from 'lenis';
import LoadingScreen from '../LodingAndErrorPage/LoadingScreen';
  AOS.init({
    duration: 1000, 
    once: true, 
  });
const Root = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis smooth scrolling after loading is complete
    if (!isLoading) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      // Animation frame loop for Lenis
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Cleanup
      return () => {
        lenis.destroy();
      };
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="flex flex-col min-h-screen  ">
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