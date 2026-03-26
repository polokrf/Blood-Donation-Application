// import React from 'react';
// import { Link } from 'react-router';

// const WhatWeDo = () => {
//   return (
//     <div className=" smp hover:translate-2 duration-300  cursor-pointer">
//       <div className=" shadow-sm p-4 rounded-xl ">
//         <h1 className=" titles md:text-left text-center"> What We Do</h1>
//         <p className=" md:text-left text-center">
//           We provide a reliable platform that connects blood donors with
//           patients who need blood during emergencies. Our system allows users to
//           create blood requests easily and helps donors respond quickly. We
//           focus on speed, accuracy, and trust to ensure that patients receive
//           the right blood at the right time. Through our work, we support
//           communities and help save lives every day.
//         </p>
//         <Link to="/register" className=" btn btn-secondary mt-3">
//           {' '}
//           Join as a donor
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default WhatWeDo;

import React from 'react';
import { Link } from 'react-router';
import { BiDonateHeart } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa6';

const WhatWeDo = () => {
  return (
    <div className="my-20 px-4 group overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        {/* Decorative Background Elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-50 rounded-full blur-3xl opacity-50 group-hover:bg-red-100 transition-colors duration-500"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-50 rounded-full blur-2xl opacity-40"></div>

        <div className="relative  bg-white p-8 md:p-16 rounded-[3rem] border-2 border-red-50 shadow-2xl shadow-red-50 hover:border-red-500 transition-all duration-500 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
          {/* Left Side: Animated Icon Box */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-red-500 text-white rounded-[2.5rem] flex items-center justify-center text-5xl md:text-6xl shadow-xl shadow-red-200 group-hover:rotate-12 transition-transform duration-500 relative ">
              <BiDonateHeart />
            </div>
            {/* Floating Plus Icons */}
            <FaPlus className="absolute -top-4 -right-4 text-red-300 text-2xl animate-pulse" />
            <FaPlus className="absolute -bottom-2 -left-6 text-red-200 text-xl animate-bounce delay-700" />
          </div>

          {/* Right Side: Content */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div>
             
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter leading-tight">
                What We <span className="text-red-500">Do</span>
              </h1>
            </div>

            <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed">
              We provide a reliable platform that connects blood donors with
              patients who need blood during emergencies. Our system allows
              users to create blood requests easily and helps donors respond
              quickly.
            </p>

            <div className="bg-red-50 p-6 rounded-2xl border-l-8 border-red-500 group-hover:bg-white group-hover:shadow-lg transition-all duration-500">
              <p className="text-gray-500 italic font-medium">
                We focus on speed, accuracy, and trust to ensure that patients
                receive the right blood at the right time. Through our work, we
                support communities and help save lives every day.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-3 px-10 py-5 bg-red-500 hover:bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-200 transition-all active:scale-95 uppercase tracking-widest group/btn"
              >
                Join as a donor
                <span className="w-2 h-2 bg-white rounded-full group-hover/btn:scale-150 transition-transform"></span>
              </Link>
            </div>
          </div>

          {/* Bottom Unique Shape Accent */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-500 rounded-tl-[5rem] translate-y-16 translate-x-16 group-hover:translate-y-12 group-hover:translate-x-12 transition-transform duration-700 opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;