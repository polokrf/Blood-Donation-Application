import React from 'react';
import { MdBloodtype } from 'react-icons/md';
import { FaExternalLinkAlt, FaMapMarkerAlt } from 'react-icons/fa';

const SearchDonor = ({ donor }) => {
  return (
    <div className="group relative" data-aos="zoom-in">
      {/* Hover Glow Effect using Tailwind only */}
      <div className="absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-r from-red-600 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

      <div className="relative bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
        {/* Top Accent Bar */}
        <div className="h-1.5 w-full bg-slate-200 group-hover:bg-red-600 transition-colors duration-500"></div>

        <div className="p-8">
          {/* Profile Image Section */}
          <div className="relative mx-auto w-[130px] h-[130px] mb-6 flex items-center justify-center">
            {/* Spinning Border using Tailwind animate-spin */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-300 group-hover:border-red-600 animate-[spin_10s_linear_infinite] transition-colors duration-500"></div>

            <img
              src={donor?.photo}
              alt={donor?.name}
              className="w-[110px] h-[110px] rounded-full object-cover p-1.5 bg-white relative z-10"
            />

            {/* Blood Group Badge */}
            <div className="absolute -right-1 bottom-2 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-20">
              <span className="text-[12px] font-black tracking-tighter">
                {donor.blood_group}
              </span>
            </div>
          </div>

          {/* Name and Tagline */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-tighter group-hover:text-red-700 transition-colors">
              {donor?.name}
            </h2>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <MdBloodtype className="text-red-600 font-bold" />
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">
                Verified Donor
              </span>
            </div>
          </div>

          {/* Location Info Box */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 group-hover:bg-white group-hover:border-red-100 transition-all duration-500">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-red-600 shadow-sm border border-slate-100">
                <FaMapMarkerAlt size={12} />
              </div>
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">
                  District
                </p>
                <p className="text-[13px] font-bold text-black">
                  {donor?.district}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-500 shadow-sm border border-slate-100">
                <FaMapMarkerAlt size={12} />
              </div>
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">
                  Upazila
                </p>
                <p className="text-[13px] font-bold text-black">
                  {donor?.upazaila}
                </p>
              </div>
            </div>
          </div>

          {/* View Profile Button */}
          {/* <button className="w-full mt-6 py-4 bg-[#0F172A] hover:bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-500 shadow-lg shadow-slate-200 hover:shadow-red-200 cursor-pointer">
            Details <FaExternalLinkAlt size={10} />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SearchDonor;
