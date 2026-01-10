import React from 'react';
import image from '../../assets/expressive-young-woman-posing-studio.jpg';

const OurMission = () => {
  return (
    <div className=" smp hover:translate-2 duration-300  cursor-pointer">
      <div className=" mb-[25px] text-center ">
        <h1 className=" titles">Our Mission</h1>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-3 items-center justify-center shadow-sm  p-4 rounded-xl">
        <img
          src={image}
          alt=""
          className=" h-[300px] w-full object-cover   rounded-xl"
        />
        <p className=" line-3 font-semibold md:text-left text-center ">
          Our mission is to save lives by making blood donation fast, simple,
          and accessible for everyone. We aim to connect patients with voluntary
          blood donors during emergencies, ensuring that no life is lost due to
          a lack of blood. Through this platform, we work to build a strong,
          trusted community where people can help one another and respond
          quickly when help is needed most.
        </p>
      </div>
    </div>
  );
};

export default OurMission;