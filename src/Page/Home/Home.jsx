import React, { Suspense } from 'react';
import { Link } from 'react-router';
import Banner from './Banner';
import Feature from './Feature';
const featureData = fetch('/Feature.json').then(res => res.json())
const Home = () => {
  return (
    <div>
      <header className="mb-[45px]">
        <Banner></Banner>
      </header>
      <section className="md:max-w-[1200px] w-full mx-auto p-2">
        <div className="text-center text-2xl md:text-3xl font-bold text-red-950 mb-[30px]">
          <h1>Why Donating Blood Matters</h1>
        </div>
        <div >
          <Suspense fallback={<p>loading...</p>}>
            <Feature featureData={featureData}></Feature>
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default Home;