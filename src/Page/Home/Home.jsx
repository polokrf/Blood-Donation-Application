import React, { Suspense } from 'react';
import Banner from './Banner';
import Feature from './Feature';
import Loader from '../../LodingAndErrorPage/Loader';
import Highlight from './Highlight';
import Process from './Process';
import OurService from './OurService';
import WhatWeDo from './WhatWeDo';
import ContactUs from './ContactUs';

// Data fetching outside to prevent re-renders
const featureData = fetch('/Feature.json').then(res => res.json());

const Home = () => {
  return (
    <div className="bg-white min-h-screen overflow-hidden">
      {/* 1. Hero Section */}
      <header className="mb-10 lg:mb-20">
        <Banner />
      </header>

      <main className="md:max-w-[1350px] mx-auto w-full  space-y-24 md:space-y-32">
        {/* 2. Feature Section (Why Donating Matters) */}
        <section className="w-full">
          <div className="text-center mb-12" data-aos="fade-up">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter">
              Why Donating <span className="text-red-500">Blood Matters</span>
            </h1>
            <div className="w-24 h-1.5 bg-red-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <Suspense fallback={<Loader />}>
            <Feature featureData={featureData} />
          </Suspense>
        </section>

        {/* 3. Testimonials / Highlights */}
        <section data-aos="fade-up">
          <Highlight />
        </section>

        {/* 4. The Process Flow */}
        <section data-aos="fade-right">
          <Process />
        </section>

        {/* 5. Core Services */}
        <section data-aos="fade-up">
          <OurService />
        </section>

        {/* 6. Mission Statement (What We Do) */}
        <section data-aos="zoom-in">
          <WhatWeDo />
        </section>

        {/* 7. Final Contact Section */}
        <section className="" data-aos="fade-up">
          <ContactUs />
        </section>
      </main>
    </div>
  );
};

export default Home;
