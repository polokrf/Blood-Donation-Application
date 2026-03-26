// import React, { useState } from 'react';
// import useAxios from '../../../Hook/useAxios';
// import { useQuery } from '@tanstack/react-query';
// import Swal from 'sweetalert2';
// import { Link, useLocation } from 'react-router';
// import { HiDotsHorizontal } from 'react-icons/hi';
// import useRole from '../../../Hook/useRole';
// import { toast } from 'react-toastify';
// import Loader from '../../../LodingAndErrorPage/Loader';

// const AllBloodDonation = () => {
//   const instance = useAxios();
//   const location = useLocation();

//   const [statusF, setStatusF] = useState('');
//   const limit = 10;
//   const [totalPage, setTotalPage] = useState(0);
//   const [currentPage, setCurrentPage] = useState(0)

//   const {role}=useRole()
//   const { data: allDOnation = [] ,refetch,isLoading} = useQuery({
//     queryKey: ['all-donation-request',statusF,limit,currentPage],
//     queryFn: async () => {
//       const res = await instance.get(`/all-blood-donation-request?status=${statusF}&limit=${limit}&skip=${currentPage * limit}`)
//       const page = Math.ceil(res.data.countData / limit);
//       setTotalPage(page)
//       return res.data.result;
//     }

//   })
//   const handleDelete = (donation) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!',
//     }).then(result => {
//       if (result.isConfirmed) {

//         instance.delete(`/delete-donation/${donation._id}`)
//           .then(res => {

//             Swal.fire({
//               title: 'Deleted!',
//               text: 'Your file has been deleted.',
//               icon: 'success',
//             });
//             refetch();

//           })
//           .catch(err => {
//             console.log(err);
//           });

//       }
//     });

//   }
//   const statusUpdate = (id, status) => {
//       instance.patch(`/only-status-update/${id}`, { status })
//         .then(res => {
//           toast.info(`Do you ${status}`)
//           refetch()
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     }

//     const hnadleStatusDone = (id) => {
//       statusUpdate(id,'done')
//     }
//     const hnadleStatusCancel = (id) => {
//       statusUpdate(id,'canceled')
//     }

//   return (
//     <div>
//       <div className="md:max-w-[1400px] w-full mx-auto py-[60px] px-2">
//         <div className="text-center my-10">
//           <h1 className="titles capitalize mb-2">
//             All Blood Donation Requests
//           </h1>
//           <p>
//             Manage and track blood donation requests. Admins have full control,
//             while volunteers can view requests and update donation status.
//           </p>
//         </div>
//         {/* filter  */}
//         <div className="my-[30px] text-center md:text-left">
//           <h3 className="mb-2 text-blue-400 capitalize ">Filter With Status</h3>
//           <select
//             value={statusF}
//             onChange={e => setStatusF(e.target.value)}
//             className="select"
//           >
//             <option value="">Filter status</option>
//             <option value="pending">pending</option>
//             <option value="inprogress">inprogress</option>
//             <option value="done">done</option>
//             <option value="canceled">canceled</option>
//           </select>
//         </div>
//         {isLoading && <Loader></Loader>}
//         <div className="overflow-x-auto">
//           <table className="table table-sm">
//             {isLoading || (
//               <thead className="bg-red-500 text-white">
//                 <tr>
//                   <th>SL</th>
//                   <th>Requester Name</th>
//                   <th>
//                     <p>Location</p>( District, Upazila)
//                   </th>
//                   <th>Donation Date</th>
//                   <th>Donation Time</th>
//                   <th>Blood Group</th>
//                   <th>Status</th>
//                   <th>
//                     <p>Donor</p>
//                     (Name, Email)
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//             )}
//             <tbody>
//               {allDOnation.map((donation, i) => (
//                 <tr key={donation._id} className="hover:bg-gray-100">
//                   <td>{i + 1}</td>
//                   <td>{donation?.requester_name}</td>
//                   <td>
//                     {donation?.recipient_district},{donation?.recipient_upazila}
//                   </td>
//                   <td>{donation?.donation_date}</td>
//                   <td>{donation?.donation_time}</td>
//                   <td>{donation?.blood_group}</td>
//                   <td>{donation?.status}</td>
//                   <td>
//                     {donation?.status === 'inprogress'
//                       ? `${donation?.donor_email},${donation?.donor_name}`
//                       : '--'}
//                   </td>

//                   <td>
//                     {donation.status === 'pending' ||
//                     donation.status === 'inprogress' ? (
//                       <div className="dropdown dropdown-end ">
//                         <button tabIndex={0} role="button" className="btn m-1">
//                           <HiDotsHorizontal />
//                         </button>

//                         <ul
//                           tabIndex="-1"
//                           className="dropdown-content menu bg-black rounded-box z-1 w-52 p-2 shadow-sm"
//                         >
//                           {role === 'Admin' ? (
//                             <div>
//                               {donation.status === 'pending' && (
//                                 <div>
//                                   {' '}
//                                   <li>
//                                     <Link
//                                       className="btn btn-xs mb-3 btn-info text-white"
//                                       to={`/dashboard/edit/${donation._id}`}
//                                       state={location.pathname}
//                                     >
//                                       Edit
//                                     </Link>
//                                   </li>
//                                   <li>
//                                     <button
//                                       onClick={() => handleDelete(donation)}
//                                       className="btn btn-xs mb-3  btn-info text-white"
//                                     >
//                                       Delete
//                                     </button>
//                                   </li>
//                                   <li>
//                                     <Link
//                                       className="btn btn-xs mb-3  btn-info text-white"
//                                       to={`/dashboard/view/${donation._id}`}
//                                     >
//                                       View
//                                     </Link>
//                                   </li>
//                                 </div>
//                               )}
//                               {/* status is inprogress */}
//                               <div>
//                                 {donation?.status === 'inprogress' && (
//                                   <div>
//                                     <li>
//                                       <button
//                                         onClick={() =>
//                                           hnadleStatusDone(donation._id)
//                                         }
//                                         className="btn btn-xs mb-3  btn-info text-white"
//                                       >
//                                         Done
//                                       </button>
//                                     </li>
//                                     <li>
//                                       <button
//                                         onClick={() =>
//                                           hnadleStatusCancel(donation._id)
//                                         }
//                                         className="btn btn-xs mb-3  btn-info text-white"
//                                       >
//                                         Canceled
//                                       </button>
//                                     </li>
//                                   </div>
//                                 )}
//                               </div>

//                               {/* status is done or canceled */}
//                               <div>
//                                 {(donation.status === 'done' ||
//                                   donation.status === 'canceled') && <p>--</p>}
//                               </div>
//                             </div>
//                           ) : (
//                             <div>
//                               {donation?.status === 'inprogress' && (
//                                 <div>
//                                   <li>
//                                     <button
//                                       onClick={() =>
//                                         hnadleStatusDone(donation._id)
//                                       }
//                                       className="btn btn-xs mb-3  btn-info text-white"
//                                     >
//                                       Done
//                                     </button>
//                                   </li>
//                                   <li>
//                                     <button
//                                       onClick={() =>
//                                         hnadleStatusCancel(donation._id)
//                                       }
//                                       className="btn btn-xs mb-3  btn-info text-white"
//                                     >
//                                       Canceled
//                                     </button>
//                                   </li>
//                                 </div>
//                               )}

//                               {/* status is done or canceled */}
//                               <div>
//                                 {(donation.status === 'done' ||
//                                   donation.status === 'canceled') && <p>--</p>}
//                               </div>
//                             </div>
//                           )}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p>--</p>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {/* pagination */}
//       <div className="text-center my-6 ">
//         {currentPage > 0 && (
//           <button
//             onClick={() => setCurrentPage(currentPage - 1)}
//             className="btn mr-2"
//           >
//             Prev
//           </button>
//         )}
//         {[...Array(totalPage).keys()].map(i => (
//           <button
//             className={` btn ${
//               i === currentPage && 'btn-info text-white'
//             } mr-2 my-4 `}
//             onClick={() => setCurrentPage(i)}
//           >
//             {i + 1}
//           </button>
//         ))}
//         {currentPage < totalPage - 1 && (
//           <button
//             onClick={() => setCurrentPage(currentPage + 1)}
//             className="btn ml-2"
//           >
//             Next
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllBloodDonation;

import React, { useState } from 'react';
import useAxios from '../../../Hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link, useLocation } from 'react-router';
import { HiDotsHorizontal } from 'react-icons/hi';
import { BiFilterAlt, BiMap, BiTimeFive, BiCalendarAlt } from 'react-icons/bi';
import useRole from '../../../Hook/useRole';
import { toast } from 'react-toastify';
import Loader from '../../../LodingAndErrorPage/Loader';

const AllBloodDonation = () => {
  const instance = useAxios();
  const location = useLocation();

  const [statusF, setStatusF] = useState('');
  const limit = 10;
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const { role } = useRole();
  const {
    data: allDOnation = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['all-donation-request', statusF, limit, currentPage],
    queryFn: async () => {
      const res = await instance.get(
        `/all-blood-donation-request?status=${statusF}&limit=${limit}&skip=${currentPage * limit}`,
      );
      const page = Math.ceil(res.data.countData / limit);
      setTotalPage(page);
      return res.data.result;
    },
  });

  const handleDelete = donation => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#1F2937',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        instance
          .delete(`/delete-donation/${donation._id}`)
          .then(res => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Request has been removed.',
              icon: 'success',
            });
            refetch();
          })
          .catch(err => console.log(err));
      }
    });
  };

  const statusUpdate = (id, status) => {
    instance
      .patch(`/only-status-update/${id}`, { status })
      .then(res => {
        toast.info(`Status updated to ${status}`);
        refetch();
      })
      .catch(err => console.log(err));
  };

  const hnadleStatusDone = id => statusUpdate(id, 'done');
  const hnadleStatusCancel = id => statusUpdate(id, 'canceled');

  return (
    <div className="bg-white min-h-screen">
      <div className="md:max-w-[1400px] w-full mx-auto py-[60px] px-4">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter">
            Donation <span className="text-red-500">Requests</span>
          </h1>
          <div className="w-24 h-2 bg-red-500 mx-auto rounded-full"></div>
          <p className="max-w-2xl mx-auto text-gray-500 font-medium">
            Manage and track blood donation requests. Admins have full control,
            while volunteers update status.
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6 bg-red-50 p-6 rounded-[2rem] border-2 border-red-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500 text-white rounded-2xl shadow-lg shadow-red-200">
              <BiFilterAlt className="text-2xl" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 uppercase text-sm tracking-widest">
                Filter Status
              </h3>
              <p className="text-xs text-red-400 font-bold uppercase">
                Narrow your search
              </p>
            </div>
          </div>

          <select
            value={statusF}
            onChange={e => setStatusF(e.target.value)}
            className="w-full md:w-64 px-6 py-4 rounded-2xl border-2 border-red-100 focus:border-red-500 outline-none font-bold text-gray-700 appearance-none bg-white cursor-pointer transition-all shadow-sm"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        {isLoading && <Loader />}

        {/* Modern Table Design */}
        <div className="bg-white rounded-[2.5rem] border-2 border-red-50 overflow-hidden shadow-2xl shadow-red-100/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-500 text-white uppercase text-[10px] tracking-[0.2em] font-black">
                  <th className="p-6">SL</th>
                  <th className="p-6">Requester Info</th>
                  <th className="p-6 text-center">Location</th>
                  <th className="p-6">Schedule</th>
                  <th className="p-6 text-center">Blood Group</th>
                  <th className="p-6 text-center">Status</th>
                  <th className="p-6">Donor Info</th>
                  <th className="p-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-50">
                {allDOnation.map((donation, i) => (
                  <tr
                    key={donation._id}
                    className="hover:bg-red-50/30 transition-colors group"
                  >
                    <td className="p-6 font-black text-gray-400">
                      #{i + 1 + currentPage * limit}
                    </td>
                    <td className="p-6">
                      <p className="font-black text-gray-900 text-lg uppercase tracking-tighter leading-none">
                        {donation?.requester_name}
                      </p>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-center gap-2 text-gray-500 font-bold text-sm">
                        <BiMap className="text-red-500 text-lg" />
                        <span>
                          {donation?.recipient_district},{' '}
                          {donation?.recipient_upazila}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-black text-gray-800 uppercase">
                          <BiCalendarAlt className="text-red-500" />{' '}
                          {donation?.donation_date}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-tighter">
                          <BiTimeFive className="text-red-300" />{' '}
                          {donation?.donation_time}
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <span className="px-4 py-2 bg-red-600 text-white rounded-xl font-black text-lg shadow-lg shadow-red-200">
                        {donation?.blood_group}
                      </span>
                    </td>
                    <td className="p-6 text-center">
                      <span
                        className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${
                          donation?.status === 'done'
                            ? 'border-green-500 text-green-500 bg-green-50'
                            : donation?.status === 'inprogress'
                              ? 'border-orange-500 text-orange-500 bg-orange-50'
                              : donation?.status === 'canceled'
                                ? 'border-gray-500 text-gray-500 bg-gray-50'
                                : 'border-red-500 text-red-500 bg-red-50'
                        }`}
                      >
                        {donation?.status}
                      </span>
                    </td>
                    <td className="p-6">
                      {donation?.status === 'inprogress' ? (
                        <div className="text-xs font-bold text-gray-600">
                          <p className="uppercase text-gray-900 font-black tracking-tighter">
                            {donation?.donor_name}
                          </p>
                          <p className="opacity-70">{donation?.donor_email}</p>
                        </div>
                      ) : (
                        <span className="text-gray-300 font-black">--</span>
                      )}
                    </td>
                    <td className="p-6 text-right">
                      {donation.status === 'pending' ||
                      donation.status === 'inprogress' ? (
                        <div className="dropdown dropdown-left dropdown-end">
                          <button
                            tabIndex={0}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 group-hover:bg-red-500 group-hover:text-white transition-all outline-none"
                          >
                            <HiDotsHorizontal className="text-xl" />
                          </button>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu p-4 shadow-2xl bg-gray-900 rounded-3xl w-48 border border-gray-800"
                          >
                            {role === 'Admin' ? (
                              <>
                                {donation.status === 'pending' && (
                                  <div className="space-y-2">
                                    <li>
                                      <Link
                                        className="bg-red-500 text-white font-black uppercase text-xs hover:bg-red-600 p-3 rounded-xl"
                                        to={`/dashboard/edit/${donation._id}`}
                                      >
                                        Edit
                                      </Link>
                                    </li>
                                    <li>
                                      <button
                                        onClick={() => handleDelete(donation)}
                                        className="bg-white text-red-500 font-black uppercase text-xs p-3 rounded-xl"
                                      >
                                        Delete
                                      </button>
                                    </li>
                                    <li>
                                      <Link
                                        className="bg-gray-700 text-white font-black uppercase text-xs p-3 rounded-xl"
                                        to={`/dashboard/view/${donation._id}`}
                                      >
                                        View
                                      </Link>
                                    </li>
                                  </div>
                                )}
                                {donation.status === 'inprogress' && (
                                  <div className="space-y-2">
                                    <li>
                                      <button
                                        onClick={() =>
                                          hnadleStatusDone(donation._id)
                                        }
                                        className="bg-green-500 text-white font-black uppercase text-xs p-3 rounded-xl"
                                      >
                                        Done
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        onClick={() =>
                                          hnadleStatusCancel(donation._id)
                                        }
                                        className="bg-red-500 text-white font-black uppercase text-xs p-3 rounded-xl"
                                      >
                                        Canceled
                                      </button>
                                    </li>
                                  </div>
                                )}
                              </>
                            ) : (
                              donation.status === 'inprogress' && (
                                <div className="space-y-2">
                                  <li>
                                    <button
                                      onClick={() =>
                                        hnadleStatusDone(donation._id)
                                      }
                                      className="bg-green-500 text-white font-black uppercase text-xs p-3 rounded-xl"
                                    >
                                      Done
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() =>
                                        hnadleStatusCancel(donation._id)
                                      }
                                      className="bg-red-500 text-white font-black uppercase text-xs p-3 rounded-xl"
                                    >
                                      Canceled
                                    </button>
                                  </li>
                                </div>
                              )
                            )}
                          </ul>
                        </div>
                      ) : (
                        <span className="text-gray-300 font-black">Locked</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Unique Pagination Design */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-6 py-4 bg-gray-950 text-white font-black uppercase text-xs rounded-2xl hover:bg-red-600 transition-all shadow-xl"
            >
              Prev
            </button>
          )}

          <div className="flex items-center bg-red-50 p-2 rounded-3xl border-2 border-red-100">
            {[...Array(totalPage).keys()].map(i => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-12 h-12 rounded-2xl font-black text-sm transition-all ${
                  i === currentPage
                    ? 'bg-red-500 text-white shadow-lg scale-110'
                    : 'text-red-500 hover:bg-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {currentPage < totalPage - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-6 py-4 bg-gray-950 text-white font-black uppercase text-xs rounded-2xl hover:bg-red-600 transition-all shadow-xl"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBloodDonation;