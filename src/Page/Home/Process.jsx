// import React from 'react';
// import { Link } from 'react-router';

// const Process = () => {
//   return (
//     <div className=" grid grid-cols-1 md:grid-cols-2 my-[25px] p-2 gap-2 ">
//       <div>
//         <h1 className=" text-center md:text-left titles">Our Simple Process</h1>
//         <p className=" mb-2">
//           Our simple process is designed to help patients find blood donors
//           quickly and easily. Users can submit a blood request in just a few
//           steps, and our system instantly connects them with nearby voluntary
//           donors. This fast and reliable process saves valuable time during
//           emergencies and helps ensure that no life is lost due to a lack of
//           blood.
//         </p>
//         <Link to="/register" className=" btn btn-secondary  mb-3">
//           Join as donor
//         </Link>
//       </div>

//       <div>
//         <video
//           className=" w-full h-[350px] shadow-sm rounded-xl shadow-blue-300 cursor-pointer hover:translate-1.5 duration-300"
//           controls
//         >
//           <source
//             src="/862d7d41-6d34-46a6-b99b-80a510f8ba59 (1).mp4"
//             type="video/mp4"
//           ></source>
//         </video>
//       </div>
//     </div>
//   );
// };

// export default Process;

import React from 'react';
import { Link } from 'react-router';
import { BiPlayCircle } from 'react-icons/bi';
import { FaArrowRight } from 'react-icons/fa6';

const Process = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 my-20 px-4 gap-12 items-center max-w-[1300px] mx-auto relative">
      {/* Background Decoration - Soft Red Blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-50 rounded-full blur-3xl -z-10 opacity-60 animate-pulse"></div>

      {/* Left Content Side */}
      <div className="space-y-6" data-aos="fade-right">
        <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          <span className="text-red-500 font-black text-xs uppercase tracking-[0.2em]">
            Step-by-Step
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
          Our Simple <span className="text-red-500">Process</span>
        </h1>

        <div className="relative pl-6 border-l-4 border-red-100">
          <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed">
            Our simple process is designed to help patients find blood donors
            quickly and easily. Users can submit a blood request in just a few
            steps, and our system instantly connects them with nearby voluntary
            donors.
          </p>
          <p className="text-gray-500 mt-4 leading-relaxed italic">
            This fast and reliable process saves valuable time during
            emergencies and helps ensure that no life is lost due to a lack of
            blood.
          </p>
        </div>

        <div className="pt-4">
          <Link
            to="/register"
            className="group flex items-center justify-between w-full md:w-64 px-6 py-5 bg-red-500 text-white font-black rounded-[2rem] shadow-xl shadow-red-200 transition-all hover:bg-red-600 active:scale-95 uppercase tracking-widest"
          >
            <span>Join as donor</span>
            <div className="bg-white text-red-500 p-2 rounded-full group-hover:translate-x-2 transition-transform duration-300">
              <FaArrowRight />
            </div>
          </Link>
        </div>
      </div>

      {/* Right Video Side */}
      <div className="relative group" data-aos="zoom-in">
        {/* Decorative Frame */}
        <div className="absolute -inset-4 border-2 border-red-50 rounded-[2.5rem] -z-10 group-hover:border-red-200 transition-colors duration-500"></div>

        {/* Main Video Container */}
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-red-100 border-8 border-white group-hover:rotate-1 transition-transform duration-500">
          <video
            className="w-full h-[350px] md:h-[450px] object-cover cursor-pointer"
            controls
            poster="https://i.ibb.co.com/8N45zCg/blood-donation-banner.jpg"
          >
            <source
              src="/862d7d41-6d34-46a6-b99b-80a510f8ba59 (1).mp4"
              type="video/mp4"
            ></source>
          </video>

          {/* Custom Overlay - Only visible when not playing */}
          <div className="absolute inset-0 bg-red-500/10 pointer-events-none group-hover:bg-transparent transition-all duration-500"></div>
        </div>

        {/* Floating Badge */}
        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 border border-red-50 animate-bounce transition-all duration-1000">
          <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-red-200">
            <BiPlayCircle />
          </div>
          <div>
            <p className="text-xs font-black text-gray-800 uppercase tracking-widest leading-none">
              Watch
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;