import React from 'react';
import useAuth from '../../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hook/useAxios';
import { Link } from 'react-router';
import { HiDotsHorizontal, HiOutlineArrowRight } from 'react-icons/hi';
import {
  MdBloodtype,
  MdOutlineLocationOn,
  MdOutlineAccessTime,
  MdCalendarToday,
} from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation } from 'react-router';

const DonorWelcome = () => {
  const { user } = useAuth();
  const location = useLocation();
  const instance = useAxios();

  const { data: recent = [], refetch } = useQuery({
    queryKey: ['recent-request', user?.email],
    queryFn: async () => {
      const res = await instance.get(`/recent-donation?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = donation => {
    Swal.fire({
      title: 'Confirm Deletion?',
      text: 'This action will permanently remove the request.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E11D48',
      cancelButtonColor: '#0F172A',
      confirmButtonText: 'Yes, delete',
    }).then(result => {
      if (result.isConfirmed) {
        instance
          .delete(`/delete-donation/${donation._id}`)
          .then(() => {
            Swal.fire('Deleted!', 'Request has been removed.', 'success');
            refetch();
          })
          .catch(err => console.log(err));
      }
    });
  };

  const statusUpdate = (id, status) => {
    instance
      .patch(`/only-status-update/${id}`, { status })
      .then(() => {
        toast.info(`Status: ${status.toUpperCase()}`);
        refetch();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className=" bg-[#F8FAFC] pb-24">
      {/* Premium Header Section */}
      <div className="bg-[#0F172A] pt-24 pb-40 px-2 relative overflow-hidden">
        {/* Animated Background Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full -mr-32 -mt-32 blur-[100px] animate-pulse"></div>

        <div className="max-w-6xl mx-auto relative z-10" data-aos="fade-right">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-red-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative p-1 bg-[#1E293B] rounded-full border border-white/10">
                <FaUserCircle
                  className="text-white group-hover:text-red-500 transition-colors"
                  size={85}
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-white font-black text-5xl md:text-6xl tracking-tight leading-none">
                HELLO, <br />
                <span className="text-red-600 uppercase italic underline decoration-white/10 underline-offset-8">
                  {user?.displayName}
                </span>
              </h1>
             
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="max-w-[1440px] mx-auto md:p-3  lg:px-6 -mt-24">
        {recent.length > 0 ? (
          <div className="space-y-10">
            <div
              className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(15,23,42,0.1)] border border-slate-100 overflow-hidden"
              data-aos="fade-up"
            >
              <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-center bg-white gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
                    Recent Activity Log
                  </h3>
                  <p className="text-slate-400 text-xs font-medium uppercase mt-1">
                    Real-time donation tracking
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-xl border border-red-100">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                  <span className="text-red-700 text-[11px] font-black uppercase tracking-wider">
                    {recent.length} recent Requests
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="table w-full border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-500 border-none">
                      <th className="py-6 pl-10 text-[11px] uppercase tracking-widest font-black">
                        #
                      </th>
                      <th className="text-[11px] uppercase tracking-widest font-black">
                        Recipient
                      </th>
                      <th className="text-[11px] uppercase tracking-widest font-black">
                        Location
                      </th>
                      <th className="text-[11px] uppercase tracking-widest font-black">
                        Schedule
                      </th>
                      <th className="text-[11px] uppercase tracking-widest font-black text-center">
                        Group
                      </th>
                      <th className="text-[11px] uppercase tracking-widest font-black">
                        Status
                      </th>
                      <th className="text-[11px] uppercase tracking-widest font-black text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {recent.map((donation, i) => (
                      <tr
                        key={donation._id}
                        className="group hover:bg-slate-50 transition-all duration-300"
                      >
                        <td className="pl-10 font-black text-slate-300 group-hover:text-red-600 transition-colors">
                          {(i + 1).toString().padStart(2, '0')}
                        </td>
                        <td className="py-6">
                          <p className="text-slate-900 font-black text-base leading-none mb-1 uppercase tracking-tight">
                            {donation?.recipient_name}
                          </p>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            Priority Request
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase">
                            <MdOutlineLocationOn className="text-red-600 text-lg" />
                            <span>
                              {donation?.recipient_district},{' '}
                              {donation?.recipient_upazila}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-slate-800 font-black text-xs">
                              <MdOutlineAccessTime className="text-red-600" />{' '}
                              {donation?.donation_time}
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase">
                              <MdCalendarToday size={12} />{' '}
                              {donation?.donation_date}
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-600 font-black border-2 border-red-100 group-hover:scale-110 transition-transform shadow-sm">
                            {donation?.blood_group}
                          </span>
                        </td>
                        <td>
                          <div
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 border
                            ${
                              donation?.status === 'pending'
                                ? 'bg-amber-50 text-amber-600 border-amber-100'
                                : donation?.status === 'inprogress'
                                  ? 'bg-blue-50 text-blue-600 border-blue-100'
                                  : donation?.status === 'done'
                                    ? 'bg-slate-900 text-white border-slate-900'
                                    : 'bg-slate-50 text-slate-400 border-slate-100'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${donation?.status === 'pending' ? 'bg-amber-600' : 'bg-current'}`}
                            ></span>
                            {donation?.status}
                          </div>
                        </td>
                        <td className="pr-10 text-center">
                          {donation?.status === 'pending' ||
                          donation?.status === 'inprogress' ? (
                            <div className="dropdown dropdown-end">
                              <button
                                tabIndex={0}
                                role="button"
                                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-lg border border-transparent hover:border-slate-100 transition-all cursor-pointer text-slate-400 hover:text-red-600"
                              >
                                <HiDotsHorizontal size={24} />
                              </button>
                              <ul
                                tabIndex={0}
                                className="dropdown-content menu p-2 shadow-2xl bg-[#0F172A] text-white rounded-2xl z-20 w-56 border border-white/5"
                              >
                                {donation.status === 'pending' && (
                                  <>
                                    <li className="mb-1">
                                      <Link
                                        className="cursor-pointer hover:bg-white/10 text-xs font-bold uppercase p-3 rounded-xl transition-all"
                                        to={`/dashboard/edit/${donation._id}`}
                                        state={location?.pathname}
                                      >
                                        Edit Request
                                      </Link>
                                    </li>
                                    <li className="mb-1">
                                      <button
                                        onClick={() => handleDelete(donation)}
                                        className="cursor-pointer hover:bg-red-600/20 text-xs font-bold uppercase p-3 rounded-xl text-red-500 transition-all"
                                      >
                                        Remove 
                                      </button>
                                    </li>
                                    <li>
                                      <Link
                                        className="cursor-pointer hover:bg-white/10 text-xs font-bold uppercase p-3 rounded-xl transition-all"
                                        to={`/dashboard/view/${donation._id}`}
                                        state={location?.pathname}
                                      >
                                        view details
                                      </Link>
                                    </li>
                                  </>
                                )}
                                {donation?.status === 'inprogress' && (
                                  <>
                                    <li className="mb-1">
                                      <button
                                        onClick={() =>
                                          statusUpdate(donation._id, 'done')
                                        }
                                        className="cursor-pointer bg-white text-slate-900 hover:bg-red-600 hover:text-white text-xs font-black uppercase p-3 rounded-xl transition-all shadow-lg"
                                      >
                                        Complete Success
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        onClick={() =>
                                          statusUpdate(donation._id, 'canceled')
                                        }
                                        className="cursor-pointer hover:bg-white/10 text-xs font-bold uppercase p-3 rounded-xl text-slate-400 transition-all"
                                      >
                                        Cancel Task
                                      </button>
                                    </li>
                                  </>
                                )}
                              </ul>
                            </div>
                          ) : (
                            <span className="text-slate-200 font-black italic tracking-widest text-xs">
                              ARCHIVED
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-center pb-10">
              <Link
                state={location?.pathname}
                className="group relative inline-flex items-center gap-4 bg-[#0F172A] hover:bg-red-600 text-white px-10 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-500 shadow-2xl shadow-slate-200 cursor-pointer overflow-hidden"
                to="/dashboard/my-donation-requests"
              >
                <span className="relative z-10">Explore All Requests</span>
                <HiOutlineArrowRight className="relative z-10 text-lg group-hover:translate-x-2 transition-transform duration-500" />
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </Link>
            </div>
          </div>
        ) : (
          <div
            className="bg-white rounded-[3rem] p-24 text-center shadow-2xl border border-slate-50 max-w-2xl mx-auto"
            data-aos="zoom-in"
          >
            <div className="w-24 h-24 bg-red-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-red-100 transform rotate-12">
              <MdBloodtype className="text-red-600" size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">
              Your Queue is Empty
            </h3>
            <p className="text-slate-400 font-bold leading-relaxed max-w-sm mx-auto uppercase text-[10px] tracking-widest">
              You haven't initiated any donation requests yet. Your latest
              activities will populate this space.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorWelcome;