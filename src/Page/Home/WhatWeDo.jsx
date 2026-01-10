import React from 'react';
import { Link } from 'react-router';

const WhatWeDo = () => {
  return (
    <div className=" smp hover:translate-2 duration-300  cursor-pointer">
      <div className=" shadow-sm p-4 rounded-xl ">
        <h1 className=" titles md:text-left text-center"> What We Do</h1>
        <p className=" md:text-left text-center">
          We provide a reliable platform that connects blood donors with
          patients who need blood during emergencies. Our system allows users to
          create blood requests easily and helps donors respond quickly. We
          focus on speed, accuracy, and trust to ensure that patients receive
          the right blood at the right time. Through our work, we support
          communities and help save lives every day.
        </p>
        <Link to="/register" className=" btn btn-secondary mt-3">
          {' '}
          Join as a donor
        </Link>
      </div>
    </div>
  );
};

export default WhatWeDo;