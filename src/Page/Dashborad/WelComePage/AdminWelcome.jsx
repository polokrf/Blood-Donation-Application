
import React from 'react';
import useAuth from '../../../Hook/useAuth';
import { FaDonate, FaHandHoldingHeart, FaUsers } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hook/useAxios';
import { MdBloodtype } from 'react-icons/md';
import Loader from '../../../LodingAndErrorPage/Loader';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

const AdminWelcome = () => {
  const { user } = useAuth();
  const instance = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const res = await instance.get('/dashboard-stats');
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  // Formatting data for the chart
  const dataInfo = [
    { name: 'Donors', value: data?.donor || 0 },
    { name: 'Funding', value: data?.totalAmount?.[0]?.total || 0 },
    { name: 'Requests', value: data?.request || 0 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Header Section */}
      <div className="text-center mb-12" data-aos="fade-down">
        <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
          <FaHandHoldingHeart className="text-red-600" size={40} />
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-800 uppercase tracking-tight">
          Welcome ,{' '}
          <span className="text-red-600">{user?.displayName}</span>
        </h1>
        <p className="text-slate-500 mt-2 font-medium tracking-wide">
          Administrator Overview Dashboard
        </p>
      </div>

      {/* Stats Cards Section */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12"
        data-aos="fade-up"
      >
        {/* Total Donors */}
        <div className="group bg-white border-b-4 border-red-600 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-600 group-hover:text-white transition-colors">
              <FaUsers size={28} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Live Data
            </span>
          </div>
          <h2 className="text-slate-500 font-bold text-sm uppercase">
            Total Donors
          </h2>
          <h3 className="text-4xl font-black text-slate-800 mt-1">
            {data?.donor || 0}
          </h3>
        </div>

        {/* Total Funding */}
        <div className="group bg-white border-b-4 border-amber-500 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 text-amber-500 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <FaDonate size={28} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Collections
            </span>
          </div>
          <h2 className="text-slate-500 font-bold text-sm uppercase">
            Total Funding
          </h2>
          <h3 className="text-4xl font-black text-slate-800 mt-1">
            {data?.totalAmount?.[0]?.total || 0}{' '}
            <span className="text-lg text-slate-400">TK</span>
          </h3>
        </div>

        {/* Total Requests */}
        <div className="group bg-white border-b-4 border-red-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 text-red-800 rounded-lg group-hover:bg-red-800 group-hover:text-white transition-colors">
              <MdBloodtype size={28} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Urgent
            </span>
          </div>
          <h2 className="text-slate-500 font-bold text-sm uppercase">
            Donation Requests
          </h2>
          <h3 className="text-4xl font-black text-slate-800 mt-1">
            {data?.request || 0}
          </h3>
        </div>
      </div>

      {/* ReChart Section */}
      <div className="max-w-6xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800">
            Platform Analytics
          </h2>
          <p className="text-sm text-slate-400 font-medium">
            Visual representation of platform growth
          </p>
        </div>

        <div className="w-full h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataInfo}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                }}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#dc2626"
                strokeWidth={4}
                dot={{ r: 6, fill: '#dc2626', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8, strokeWidth: 0 }}
                name="Statistics Overview"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcome;