
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import useAxios from '../../Hook/useAxios';
import {
  MdBloodtype,
  MdOutlineLocationOn,
  MdOutlineAccessTime,
  MdLocalHospital,
} from 'react-icons/md';
import { HiOutlineCalendar } from 'react-icons/hi';
import { IoArrowBackOutline } from 'react-icons/io5';
import Loader from '../../LodingAndErrorPage/Loader';
import { GrUserManager } from 'react-icons/gr';

const ViewPage = () => {
  const { id } = useParams();
  const instance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location)

  const { data: view = {}, isLoading } = useQuery({
    queryKey: ['view', id],
    queryFn: async () => {
      const res = await instance.get(`/one-donationInfo/${id}`);
      return res.data;
    },
  });

  const handleClick = () => {
    navigate(location.state || '/');
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className=" bg-slate-50 ">
      {/* Back Button & Title */}
      <div className="max-w-xl mx-auto mb-8 flex flex-col items-center">
        <button
          onClick={handleClick}
          className=" cursor-pointer group mb-6 flex items-center gap-2 text-slate-500 hover:text-red-600 font-bold transition-colors"
        >
          <IoArrowBackOutline className="group-hover:-translate-x-1 transition-transform" />
          Return to List
        </button>
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
          Request <span className="text-red-600">Details</span>
        </h1>
      </div>

      <div className="max-w-xl mx-auto">
        <div
          className="relative bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden"
          data-aos="fade-up"
        >
          {/* Status Header */}
          <div className="bg-slate-900 px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
                Status: {view.status || 'Pending'}
              </span>
            </div>
            <span className="text-slate-500 text-[10px] font-bold">
              ID: {id?.slice(-8)}
            </span>
          </div>

          <div className="p-8 md:p-10">
            {/* Header: Name & Blood Group */}
            <div className="flex justify-between items-start mb-10">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 shadow-sm border border-red-100">
                  <GrUserManager size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 leading-tight">
                    {view?.recipient_name}
                  </h2>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
                    Recipient
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-red-600 w-16 h-16 rounded-full flex flex-col items-center justify-center text-white shadow-lg shadow-red-200">
                  <MdBloodtype size={24} />
                  <span className="font-black text-lg -mt-1">
                    {view?.blood_group}
                  </span>
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-2 gap-8 mb-10 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              {/* Location Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MdOutlineLocationOn
                    className="text-red-500 mt-1"
                    size={20}
                  />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                      Location
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {view?.recipient_upazila}, {view?.recipient_district}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MdLocalHospital className="text-red-500 mt-1" size={20} />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                      Hospital
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {view?.hospital_name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Schedule Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <HiOutlineCalendar className="text-red-500 mt-1" size={20} />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                      Required Date
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {view?.donation_date}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MdOutlineAccessTime
                    className="text-red-500 mt-1"
                    size={20}
                  />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                      Preferred Time
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {view?.donation_time}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address & Message */}
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">
                  Exact Address
                </p>
                <p className="text-slate-700 font-medium italic">
                  "{view.full_address}"
                </p>
              </div>

              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">
                  Emergency Message
                </p>
                <div className="bg-red-50/50 p-6 rounded-3xl text-slate-600 leading-relaxed font-medium">
                  {view.message}
                </div>
              </div>
            </div>

            {/* Footer Decorative Bar */}
            <div className="mt-10 flex justify-center">
              <div className="flex gap-1">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-1 bg-slate-100 rounded-full"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ViewPage;