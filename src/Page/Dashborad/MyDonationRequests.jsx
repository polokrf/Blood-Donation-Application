import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../Hook/useAuth';
import useAxios from '../../Hook/useAxios';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link, useLocation } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Loader from '../../LodingAndErrorPage/Loader';
import {
  FaFilter,
  FaUserEdit,
  FaTrashAlt,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

const MyDonationRequests = () => {
  const { user } = useAuth();
  const location = useLocation();
  const instance = useAxios();
  const [statusF, setStatusF] = useState('');
  const limit = 10;
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: myDonation = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [
      'my-donation-requests',
      user?.email,
      statusF,
      limit,
      currentPage,
    ],
    queryFn: async () => {
      const res = await instance.get(
        `/my-donation-request?email=${user?.email}&status=${statusF}&limit=${limit}&skip=${currentPage * limit}`,
      );
      const page = Math.ceil(res.data.countData / limit);
      setTotalPage(page);
      return res.data.result;
    },
  });

  const handleDelete = donation => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
      customClass: { popup: 'rounded-3xl' },
    }).then(result => {
      if (result.isConfirmed) {
        instance.delete(`/delete-donation/${donation._id}`).then(() => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Request removed.',
            icon: 'success',
            customClass: { popup: 'rounded-3xl' },
          });
          refetch();
        });
      }
    });
  };

  const statusUpdate = (id, status) => {
    instance.patch(`/only-status-update/${id}`, { status }).then(() => {
      toast.info(`Status updated to ${status}`);
      refetch();
    });
  };

  const getStatusStyle = status => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'inprogress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'done':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'canceled':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-slate-50   pb-20">
      <div className="max-w-[1440px] mx-auto ">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end  mb-10 gap-6 ">
          <div className="max-w-2xl">
            <h1 className="text-4xl text-center md:text-left font-black text-slate-800 uppercase tracking-tighter mb-3">
              My <span className="text-red-600 font-black">Donations</span>
            </h1>
            <p className="text-slate-500 font-medium">
              Manage your active requests and track donors who have stepped up
              to help.
            </p>
          </div>

          {/* Filter UI */}
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
              <span className="pl-3 text-slate-400">
                <FaFilter size={14} />
              </span>
              <select
                value={statusF}
                onChange={e => setStatusF(e.target.value)}
                className="select select-ghost focus:bg-transparent focus:outline-none font-bold text-slate-700"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full border-separate border-spacing-0">
                <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-widest font-black">
                  <tr>
                    <th className="py-5 pl-8">SL</th>
                    <th>Recipient</th>
                    <th>Location</th>
                    <th>Date & Time</th>
                    <th>Group</th>
                    <th>Status</th>
                    <th>Donor Info</th>
                    <th className="text-center pr-8">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 font-medium">
                  {myDonation.map((donation, i) => (
                    <tr
                      key={donation._id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="py-4 pl-8 font-bold text-slate-400">
                        {i + 1 + currentPage * limit}
                      </td>
                      <td className="font-bold text-slate-800">
                        {donation?.recipient_name}
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <span className="text-slate-700 font-bold">
                            {donation?.recipient_district}
                          </span>
                          <span className="text-xs text-slate-400">
                            {donation?.recipient_upazila}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <span className="font-bold">
                            {donation?.donation_date}
                          </span>
                          <span className="text-xs text-slate-400 uppercase">
                            {donation?.donation_time}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="px-3 py-1 bg-red-50 text-red-600 rounded-lg font-black border border-red-100">
                          {donation?.blood_group}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] uppercase font-black border ${getStatusStyle(donation.status)}`}
                        >
                          {donation?.status}
                        </span>
                      </td>
                      <td>
                        {donation?.status === 'inprogress' ||
                        donation?.status === 'done' ? (
                          <div className="flex flex-col text-xs">
                            <span className="font-bold text-slate-700">
                              {donation?.donor_name}
                            </span>
                            <span className="text-slate-400 lowercase">
                              {donation?.donor_email}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-300">---</span>
                        )}
                      </td>

                      <td className="text-center pr-8">
                        {donation.status === 'pending' ||
                        donation?.status === 'inprogress' ? (
                          <div className="dropdown dropdown-left">
                            <button
                              tabIndex={0}
                              className="btn btn-ghost btn-circle group-hover:bg-white shadow-none"
                            >
                              <HiDotsHorizontal
                                size={20}
                                className="text-slate-400"
                              />
                            </button>
                            <ul
                              tabIndex={0}
                              className="dropdown-content menu p-2 shadow-2xl bg-white rounded-2xl w-44 border border-slate-100 z-50"
                            >
                              {donation.status === 'pending' && (
                                <>
                                  <li>
                                    <Link
                                      state={location?.pathname}
                                      to={`/dashboard/edit/${donation._id}`}
                                      className="hover:bg-blue-50 text-blue-600 font-bold py-2"
                                    >
                                      <FaUserEdit /> Edit
                                    </Link>
                                  </li>
                                  <li>
                                    <button
                                      state={location?.pathname}
                                      onClick={() => handleDelete(donation)}
                                      className="hover:bg-rose-50 text-rose-600 font-bold py-2"
                                    >
                                      <FaTrashAlt /> Delete
                                    </button>
                                  </li>
                                </>
                              )}
                              <li>
                                <Link
                                  state={location?.pathname}
                                  to={`/dashboard/view/${donation._id}`}
                                  className="hover:bg-slate-50 text-slate-700 font-bold py-2"
                                >
                                  <FaEye /> View Details
                                </Link>
                              </li>
                              {donation.status === 'inprogress' && (
                                <>
                                  <div className="divider my-1 opacity-50"></div>
                                  <li>
                                    <button
                                      onClick={() =>
                                        statusUpdate(donation._id, 'done')
                                      }
                                      className="hover:bg-emerald-50 text-emerald-600 font-bold py-2"
                                    >
                                      <FaCheckCircle /> Mark Done
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() =>
                                        statusUpdate(donation._id, 'canceled')
                                      }
                                      className="hover:bg-rose-50 text-rose-600 font-bold py-2"
                                    >
                                      <FaTimesCircle /> Cancel
                                    </button>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        ) : (
                          <span className="text-slate-300">Locked</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {myDonation.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-slate-400 font-bold uppercase tracking-widest">
                    No requests found
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pagination Section */}
        <div className="mt-12 flex justify-center items-center gap-2">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn btn-outline border-slate-200 hover:bg-slate-900 px-6 rounded-xl"
            >
              Prev
            </button>
          )}

          <div className="flex bg-white p-1 rounded-2xl border border-slate-200">
            {[...Array(totalPage).keys()].map(i => (
              <button
                key={i}
                className={`w-12 h-12 rounded-xl font-black transition-all ${i === currentPage ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'text-slate-400 hover:bg-slate-50'}`}
                onClick={() => setCurrentPage(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {currentPage < totalPage - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn btn-outline border-slate-200 hover:bg-slate-900 px-6 rounded-xl"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyDonationRequests;
