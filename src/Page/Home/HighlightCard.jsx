import React from 'react';
import { FaQuoteRight } from 'react-icons/fa';
import { BiSolidUserCircle } from 'react-icons/bi';

const HighlightCard = ({ fed }) => {
  return (
    <div className="group relative bg-white w-full h-[220px] p-6 rounded-[2rem] border-2 border-red-50 hover:border-red-500 transition-all duration-500 shadow-lg shadow-red-50 overflow-hidden flex flex-col justify-between">
      {/* Unique Floating Icon - Only visible on hover */}
      <div className="absolute -right-4 -top-4 bg-red-500 text-white p-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 shadow-lg shadow-red-200">
        <FaQuoteRight className="text-2xl" />
      </div>

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-red-50 rounded-xl text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
            <BiSolidUserCircle className="text-2xl" />
          </div>
          <h2 className="font-black text-gray-800 text-lg uppercase tracking-tighter group-hover:text-red-500 transition-colors">
            {fed.name}
          </h2>
        </div>

        <p className="text-gray-500 font-medium text-sm leading-relaxed line-clamp-3 italic">
          "{fed.description}"
        </p>
      </div>

      {/* Bottom Visual Accent */}
      <div className="flex items-center justify-between mt-4">
        <div className="h-1 w-12 bg-red-500 rounded-full group-hover:w-full transition-all duration-700"></div>
        <span className="text-[10px] font-bold text-red-300 uppercase tracking-[0.2em] ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Verified Donor
        </span>
      </div>

      {/* Subtle Background Number/Pattern */}
      <div className="absolute bottom-[-20px] right-[-10px] text-red-50 font-black text-8xl opacity-20 pointer-events-none select-none">
        “
      </div>
    </div>
  );
};

export default HighlightCard;
