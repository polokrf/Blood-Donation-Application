import React, { useState } from 'react';
import useAuth from '../../../Hook/useAuth';
import { FaDonate, FaUserInjured, FaUsers } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hook/useAxios';
import { MdBloodtype } from 'react-icons/md';
import Loader from '../../../LodingAndErrorPage/Loader';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';



const AdminWelcome = () => {
  const { user } = useAuth();
  const instance = useAxios();
  const [totalDonors,setTotalDonors] =useState()
  const [totalAmount,setTotalAmount] =useState()
  const [totalRequest,setTotalRequest] =useState()
  
  const dataInfo = [
    {name:'Donors',value:totalDonors},
    {name:'Amount',value:totalAmount},
    {name:'Request',value:totalRequest}
  ]
  const { data ,isLoading} = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const res = await instance.get('/dashboard-stats');
      setTotalDonors(res.data.donor)
      setTotalRequest(res.data.request);
      setTotalAmount(res.data.totalAmount[0].total)
      return res.data
    }
  });
  
  if (isLoading) {
    return <Loader></Loader>
  }
  
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-[25px]" data-aos="fade-up">
        <div className=" bg-blue-800 p-3 text-center text-white shadow-xl transform hover:scale-115 transition duration-500 rounded-xl cursor-pointer">
          <h2 className="title">
            <FaUsers className="inline-block" /> Total-Donors
          </h2>
          <h3 className="stat-value">{totalDonors}</h3>
        </div>

        <div className="bg-blue-800 p-3 text-center text-white shadow-xl transform hover:scale-115 transition duration-500 rounded-xl cursor-pointer">
          <h2 className="title">
            {' '}
            <FaDonate className="inline-block text-amber-300" />
            Total-Funding
          </h2>
          <h3 className="stat-value text-secondary">{totalAmount} TK</h3>
        </div>

        <div className="bg-blue-800 p-3 text-center text-white shadow-xl transform hover:scale-115 transition duration-500 rounded-xl cursor-pointer">
          <h2 className="title text-white">
            <MdBloodtype className="inline-block text-red-500" /> Total Donation
            Request
          </h2>
          <h3 className="stat-value">{totalRequest}</h3>
        </div>
      </div>

      {/* reChart */}
      
        <LineChart
          style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }}
          responsive
          data={dataInfo}
          margin={{
            top: 20,
            right: 20,
            bottom: 5,
            left: 0,
          }}
        >
          <CartesianGrid stroke="#58B19F" strokeDasharray="5 5" />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#55E6C1"
            strokeWidth={2}
            name="total"
          />
          <XAxis dataKey="name" stroke="#ffff" />
          <YAxis
            width="auto"
            label={{
              value: 'value',

              position: 'insideLeft',
              angle: -90,
            }}
            stroke="#ffff"
          />
          <Legend align="right" />
          <Tooltip />
          <RechartsDevtools></RechartsDevtools>
        </LineChart>
      </div>
    
  );
};

export default AdminWelcome;