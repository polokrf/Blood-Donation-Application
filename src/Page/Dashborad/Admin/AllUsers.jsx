

import React, { useState } from 'react';
import useAxios from '../../../Hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import { HiOutlineDotsVertical, HiOutlineFilter } from 'react-icons/hi';
import { FaUserShield, FaUserEdit, FaBan, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loader from '../../../LodingAndErrorPage/Loader';

const AllUsers = () => {
  const instance = useAxios();
  const limit = 10;
  const [userStatus, setUserStatus] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['all-users', userStatus, limit, currentPage],
    queryFn: async () => {
      const res = await instance.get(
        `/all-users?status=${userStatus}&limit=${limit}&skip=${currentPage * limit}`,
      );
      const page = Math.ceil(res.data.dataCount / limit);
      setTotalPage(page);
      return res.data.result;
    },
  });

  const roleUpdate = (id, role) => {
    instance
      .patch(`/user-role/${id}`, { role })
      .then(() => {
        toast.success(`Role updated to ${role}`);
        refetch();
      })
      .catch(err => console.error(err));
  };

  const statusUpdate = (id, status) => {
    instance
      .patch(`/user-status/${id}`, { status })
      .then(() => {
        status === 'Blocked'
          ? toast.error('User Blocked')
          : toast.success('User Activated');
        refetch();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className=" bg-slate-50  ">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tight text-slate-900 mb-4">
            User <span className="text-red-600">Directory</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 font-medium">
            Administrative control panel for user verification, role assignment,
            and access management.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-3 rounded-2xl text-red-600">
              <HiOutlineFilter size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Filter By
              </p>
              <select
                value={userStatus}
                onChange={e => {
                  setUserStatus(e.target.value);
                  setCurrentPage(0);
                }}
                className="bg-transparent font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="">All Users</option>
                <option value="Active">Active Status</option>
                <option value="Blocked">Blocked Status</option>
              </select>
            </div>
          </div>
          
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full border-collapse">
                {/* Modern Table Head */}
                <thead className="bg-slate-900 text-white border-none">
                  <tr className="border-none text-[11px] uppercase tracking-[0.15em]">
                    <th className="py-6 px-8 rounded-tl-[2.5rem]">SL</th>
                    <th>User Profile</th>
                    <th>Email Address</th>
                    <th>Current Role</th>
                    <th>Account Status</th>
                    <th className="text-center rounded-tr-[2.5rem]">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="text-slate-600 font-medium">
                  {users.map((u, i) => (
                    <tr
                      key={u._id}
                      className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="px-8 font-black text-slate-300">
                        {currentPage * limit + i + 1}
                      </td>
                      <td>
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12 ring-2 ring-slate-100 ring-offset-2">
                              <img src={u.photo} alt={u.name} />
                            </div>
                          </div>
                          <div>
                            <div className="font-black text-slate-800">
                              {u.name}
                            </div>
                            <div className="text-[10px] uppercase text-slate-400 font-bold">
                              Verified User
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-sm font-semibold">{u.email}</td>
                      <td>
                        <span
                          className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm 
                          ${
                            u.role === 'Admin'
                              ? 'bg-slate-900 text-white'
                              : u.role === 'Volunteer'
                                ? 'bg-red-600 text-white'
                                : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <div
                          className={`flex items-center gap-1.5 font-black text-xs ${u.status === 'Active' ? 'text-emerald-500' : 'text-red-500'}`}
                        >
                          {u.status === 'Active' ? (
                            <FaCheckCircle size={10} />
                          ) : (
                            <FaBan size={10} />
                          )}
                          {u.status}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="dropdown dropdown-end">
                          <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-sm hover:bg-slate-200 rounded-xl"
                          >
                            <HiOutlineDotsVertical size={18} />
                          </div>
                          <div
                            tabIndex={0}
                            className="dropdown-content menu p-4 shadow-2xl bg-white rounded-3xl z-[1] w-56 border border-slate-100"
                          >
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-2">
                              Modify Permissions
                            </p>
                            <div className="space-y-1 mb-4">
                              {u.role !== 'Admin' && (
                                <button
                                  onClick={() => roleUpdate(u._id, 'Admin')}
                                  className=" cursor-pointer w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-slate-700 rounded-xl transition-colors text-sm font-bold"
                                >
                                  <FaUserShield className="text-red-600" /> Make
                                  Admin
                                </button>
                              )}
                              {u.role !== 'Volunteer' && (
                                <button
                                  onClick={() => roleUpdate(u._id, 'Volunteer')}
                                  className=" cursor-pointer w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-slate-700 rounded-xl transition-colors text-sm font-bold"
                                >
                                  <FaUserEdit className="text-red-600" /> Make
                                  Volunteer
                                </button>
                              )}
                              {u.role !== 'Donor' && (
                                <button
                                  onClick={() => roleUpdate(u._id, 'Donor')}
                                  className=" cursor-pointer w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-slate-700 rounded-xl transition-colors text-sm font-bold"
                                >
                                  <FaUserShield className="text-red-600" /> Make
                                  Donor
                                </button>
                              )}
                            </div>

                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-2">
                              Account Safety
                            </p>
                            {u.status === 'Blocked' ? (
                              <button
                                onClick={() => handleUnblock(u._id)}
                                className="cursor-pointer w-full bg-emerald-500 text-white py-2 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-emerald-600 shadow-lg shadow-emerald-100"
                              >
                                Unblock
                              </button>
                            ) : (
                              <button
                                onClick={() => handleBlock(u._id)}
                                className=" cursor-pointer w-full bg-slate-900 text-white py-2 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-red-600 shadow-lg shadow-slate-200"
                              >
                                Block User
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Improved Pagination */}
        <div className="mt-12 flex justify-center items-center gap-2">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-6 py-3 rounded-2xl bg-white border border-slate-200 font-bold text-slate-600 hover:border-red-600 hover:text-red-600 transition-all shadow-sm"
            >
              Prev
            </button>
          )}

          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
            {[...Array(totalPage).keys()].map(i => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-12 h-12 rounded-xl font-black text-sm transition-all ${
                  i === currentPage
                    ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                    : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {currentPage < totalPage - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-6 py-3 rounded-2xl bg-white border border-slate-200 font-bold text-slate-600 hover:border-red-600 hover:text-red-600 transition-all shadow-sm"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;