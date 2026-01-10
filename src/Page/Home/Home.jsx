import React, { Suspense } from 'react';
import { Link } from 'react-router';
import Banner from './Banner';
import Feature from './Feature';
import Loader from '../../LodingAndErrorPage/Loader';
import Highlight from './Highlight';
import Process from './Process';
import OurTeam from './OurTeam';
import OurService from './OurService';
import OurMission from './OurMisson';
import WhatWeDo from './WhatWeDo';
import BecomeDonor from './BecomeDonor';
import ContactUs from './ContactUs';


const featureData = fetch('/Feature.json').then(res => res.json());

const Home = () => {
  return (
    <div>
      <header className="mb-[25px] mx-auto  ">
        <Banner></Banner>
      </header>
      <section className=" w-full mx-auto p-2">
        <div className=" mb-[25px]">
          <h1 className="text-center titles">Why Donating Blood Matters</h1>
        </div>
        <div>
          <Suspense fallback={<Loader></Loader>}>
            <Feature featureData={featureData}></Feature>
          </Suspense>
        </div>
      </section>

      <section>
        <div className=" mb-[30px]">
          <h1 className="text-center titles">Stories of Hope</h1>
        </div>

        <Highlight></Highlight>
      </section>

      <section>
        <Process></Process>
      </section>
      <section>
        <OurTeam></OurTeam>
      </section>
      <section>
        <OurService></OurService>
      </section>
      <section>
        <OurMission></OurMission>
      </section>
      <section>
        <WhatWeDo></WhatWeDo>
      </section>
      <section>
        <BecomeDonor></BecomeDonor>
      </section>
      <section>
        <ContactUs></ContactUs>
      </section>
    </div>
  );
};

export default Home;
