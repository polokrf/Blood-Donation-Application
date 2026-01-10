import React from 'react';
import { Link } from 'react-router';

const Process = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 my-[25px] p-2 gap-2 ">
      <div>
        <h1 className=" text-center md:text-left titles">Our Simple Process</h1>
        <p className=" mb-2">
          Our simple process is designed to help patients find blood donors
          quickly and easily. Users can submit a blood request in just a few
          steps, and our system instantly connects them with nearby voluntary
          donors. This fast and reliable process saves valuable time during
          emergencies and helps ensure that no life is lost due to a lack of
          blood.
        </p>
        <Link to="/register" className=" btn btn-secondary  mb-3">
          Join as donor
        </Link>
      </div>

      <div>
        <video
          className=" w-full h-[350px] shadow-sm rounded-xl shadow-blue-300 cursor-pointer hover:translate-1.5 duration-300"
          controls
        >
          <source
            src="/862d7d41-6d34-46a6-b99b-80a510f8ba59 (1).mp4"
            type="video/mp4"
          ></source>
        </video>
      </div>
    </div>
  );
};

export default Process;