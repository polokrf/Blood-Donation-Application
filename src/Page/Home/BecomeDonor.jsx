import React from 'react';

const BecomeDonor = () => {
  return (
    <div className=" smp hover:translate-2 duration-300  cursor-pointer">
      <div className=" mb-[25px] text-center">
        <h1 className=" titles">Become a Donor</h1>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-3 items-center justify-center shadow-sm  p-4 rounded-xl ">
        <p className="md:text-left text-center">
          Become a blood donor and help save lives. By joining our platform, you
          can register easily and be ready to help someone in need during
          emergencies. Your single donation can make a big difference and give
          hope to patients and their families. Join our donor community today
          and be a reason for someone’s survival
        </p>
        <img
          src="https://i.ibb.co.com/9mrfwnxP/development-movements-radial-wrist-joint-functional-board-hand.jpg"
          alt=""
          className=" h-[300px] w-full rounded-xl object-cover"
        />
      </div>
    </div>
  );
};

export default BecomeDonor;