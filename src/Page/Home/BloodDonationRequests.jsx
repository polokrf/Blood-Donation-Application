import React, { useState } from 'react';
import useAxios from '../../Hook/useAxios';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router';
import {
  MdBloodtype,
  MdOutlineLocationOn,
  MdAccessTime,
  MdCalendarToday,
} from 'react-icons/md';
import { useQuery } from '@tanstack/react-query'; // Ensure useQuery is imported
import Loader from '../../LodingAndErrorPage/Loader';

const BloodDonationRequests = () => {
  const instance = useAxios();
  const limit = 10;
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [order, setOrder] = useState('desc');

  const status = 'pending';
  const { data: pendingData = [], isLoading } = useQuery({
    queryKey: ['all-pending', status, limit, currentPage, order],
    queryFn: async () => {
      const res = await instance.get(
        `/pending-donation?status=${status}&limit=${limit}&skip=${
          currentPage * limit
        }&sort=donation_date&order=${order}`,
      );
      const page = Math.ceil(res.data.countData / limit);
      setTotalPage(page);
      return res.data.result;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white pb-20">
      <div className="md:max-w-[1300px] w-full mx-auto ">
        {/* Modern Header */}
        <div className=" pb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-red-50 text-red-600 rounded-full text-xs font-black uppercase tracking-widest border border-red-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            Live Requests
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none">
            Pending <span className="text-red-600">Requests</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg max-w-xl mx-auto italic">
            "Your blood can give someone a second chance at life."
          </p>
        </div>

        {/* Sort & Filter UI */}
        <div className="flex justify-center mb-16">
          <div className="bg-gray-50 p-2 rounded-[2rem] border border-gray-100 flex items-center shadow-inner">
            <label className="pl-6 pr-3 text-xs font-black uppercase text-gray-400">
              Sort By:
            </label>
            <select
              value={order}
              onChange={e => setOrder(e.target.value)}
              className="bg-white px-8 py-3 rounded-full border-none outline-none font-bold text-gray-700 shadow-sm cursor-pointer hover:text-red-600 transition-colors appearance-none"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pendingData.map(donation => (
            <div
              key={donation._id}
              className="group relative bg-white border-2 border-red-50 rounded-[3rem] p-8 transition-all duration-500 hover:border-red-500 hover:shadow-[0_30px_60px_-15px_rgba(220,38,38,0.15)] overflow-hidden"
              data-aos="fade-up"
            >
              {/* Blood Group Badge */}
              <div className="absolute top-0 right-0 p-8">
                <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-red-200 rotate-3 group-hover:rotate-0 transition-transform">
                  <MdBloodtype className="text-2xl" />
                  <span className="font-black text-lg leading-none">
                    {donation?.blood_group}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block mb-1">
                    Recipient Name
                  </span>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter truncate pr-20">
                    {donation?.recipient_name}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-1.5 bg-red-50 rounded-lg text-red-500">
                        <MdOutlineLocationOn />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase">
                          Location
                        </p>
                        <p className="text-sm font-bold text-gray-700">
                          {donation?.recipient_district}
                        </p>
                        <p className="text-xs font-medium text-gray-500">
                          {donation?.recipient_upazila}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-1.5 bg-red-50 rounded-lg text-red-500">
                        <MdCalendarToday />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase">
                          Schedule
                        </p>
                        <p className="text-sm font-bold text-gray-700">
                          {donation?.donation_date}
                        </p>
                        <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                          <MdAccessTime className="text-red-300" />{' '}
                          {donation?.donation_time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Button */}
                <Link
                  to={`/blood-donation-details/${donation._id}`}
                  className="block w-full text-center py-5 bg-gray-950 text-white font-black rounded-2xl group-hover:bg-red-600 transition-all uppercase tracking-widest text-xs shadow-xl active:scale-95"
                >
                  View Details
                </Link>
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          ))}
        </div>

        {/* Improved Pagination */}
        <div className="mt-20 flex items-center justify-center gap-4">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="h-14 px-8 rounded-2xl bg-white border-2 border-red-50 font-black text-xs uppercase tracking-widest hover:border-red-500 transition-all"
            >
              Prev
            </button>
          )}

          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
            {[...Array(totalPage).keys()].map(i => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${
                  i === currentPage
                    ? 'bg-red-600 text-white shadow-lg shadow-red-200 scale-110'
                    : 'text-gray-400 hover:text-red-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {currentPage < totalPage - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="h-14 px-8 rounded-2xl bg-red-600 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-red-200 hover:bg-gray-950 transition-all"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodDonationRequests;
