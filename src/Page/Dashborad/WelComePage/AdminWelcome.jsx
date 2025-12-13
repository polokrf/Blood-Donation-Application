import React, { useState } from 'react';
import useAuth from '../../../Hook/useAuth';
import { FaDonate, FaUserInjured, FaUsers } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hook/useAxios';
import { MdBloodtype } from 'react-icons/md';

const AdminWelcome = () => {
  const { user } = useAuth();
  const instance = useAxios();
  const [totalDonors,setTotalDonors] =useState()
  const [totalAmount,setTotalAmount] =useState()
  const [totalRequest,setTotalRequest] =useState()

  const { data } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const res = await instance.get('/dashboard-stats');
      setTotalDonors(res.data.donor)
      setTotalRequest(res.data.request);
      setTotalAmount(res.data.totalAmount[0].total)
      return res.data
    }
  });
  
  return (
    <div className="bg-linear-to-br  from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] min-h-screen flex flex-col justify-center items-center">
      <div className="py-[60px] text-center" data-aos="fade-down">
        <h2 className=" text-center mb-2">
          <FaUserInjured
            style={{ color: 'white' }}
            className=" inline-block "
            size={60}
          />
        </h2>
        <h1 className="text-white font-bold text-4xl capitalize">
          <span>Welcome</span>

          <span className="block   mt-3">{user?.displayName}</span>
        </h1>
      </div>

      {/* users amount donation all count */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-aos="fade-up">
        <div className=" bg-blue-800 p-3 text-center text-white shadow-xl transform hover:scale-115 transition duration-500 rounded-xl">
          <h2 className="title">
            <FaUsers className='inline-block' /> Total-Donors
          </h2>
          <h3 className="stat-value">{totalDonors}</h3>
        </div>

        <div className="bg-blue-800 p-3 text-center text-white shadow-xl transform hover:scale-115 transition duration-500 rounded-xl">
          <h2 className="title">
            {' '}
            <FaDonate className='inline-block text-amber-300' />
            Total-Funding
          </h2>
          <h3 className="stat-value text-secondary">{totalAmount} TK</h3>
        </div>

        <div className="bg-blue-800 p-3 text-center text-white shadow-xl transform hover:scale-115 transition duration-500 rounded-xl">
          <h2 className="title text-white">
            <MdBloodtype className='inline-block text-red-500' /> Total Donation Request
          </h2>
          <h3 className="stat-value">{totalRequest}</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcome;