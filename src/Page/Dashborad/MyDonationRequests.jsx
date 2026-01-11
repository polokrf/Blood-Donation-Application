import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../Hook/useAuth';
import useAxios from '../../Hook/useAxios';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link, useLocation } from 'react-router';

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Loader from '../../LodingAndErrorPage/Loader';

const MyDonationRequests = () => {
  const { user } = useAuth();
  const location =useLocation()

  const instance = useAxios()
  const [statusF, setStatusF] = useState('')
   const limit = 10;
    const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0)
   
  const { data:myDonation=[], refetch ,isLoading} = useQuery({
    queryKey: ['my-donation-requests', user?.email,statusF,limit,currentPage],
    queryFn: async () => {
      const res = await instance.get(`/my-donation-request?email=${user?.email}&status=${statusF}&limit=${limit}&skip=${currentPage * limit}`);
       const page = Math.ceil(res.data.countData / limit);
       setTotalPage(page);
      return res.data.result;
    },
    
  });
 console.log(statusF)
  
  const handleDelete = (donation) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {

        instance.delete(`/delete-donation/${donation._id}`)
          .then(res => {
            
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
            refetch();
            
          })
          .catch(err => {
            console.log(err);
          });
        
      }
    });
    

  }

  const statusUpdate = (id, status) => {
    instance.patch(`/only-status-update/${id}`, { status })
      .then(res => {
        toast.info(`Do you ${status}`)
        refetch()
      })
      .catch(err => {
        console.log(err);
      });
  }

  const hnadleStatusDone = (id) => {
    statusUpdate(id,'done')
  }
  const hnadleStatusCancel = (id) => {
    statusUpdate(id,'canceled')
  }
  
  

  return (
    <div>
      <div className="md:max-w-[1400px] w-full mx-auto py-[65px] px-2">
        <div className="text-center my-10">
          <h1 className=" titles mb-2 capitalize">
            My Blood Donation Requests
          </h1>
          <p>
            View and manage all your blood donation requests. Filter by status
            or browse through pages to track the progress of each request.
          </p>
        </div>
        {/* filter  */}
        <div className="my-[30px] text-center md:text-left">
          <h3 className="mb-2 text-blue-400 capitalize ">Filter With Status</h3>
          <select
            value={statusF}
            onChange={e => setStatusF(e.target.value)}
            className="select"
          >
            <option value="">Filter status</option>
            <option value="pending">pending</option>
            <option value="inprogress">inprogress</option>
            <option value="done">done</option>
            <option value="canceled">canceled</option>
          </select>
        </div>
        {isLoading && <Loader></Loader>}
        {isLoading || (
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead className="bg-red-500 hover:bg-red-400 transition-colors duration-150 text-white">
                <tr>
                  <th>SL</th>
                  <th>Recipient Name</th>
                  <th>
                    <p>Location</p>( District, Upazila)
                  </th>
                  <th>Donation Date</th>
                  <th>Donation Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>
                    <p>Donor</p>
                    (Name, Email)
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myDonation.map((donation, i) => (
                  <tr key={donation._id} className=" hover:bg-gray-100">
                    <td>{i + 1}</td>
                    <td>{donation?.recipient_name}</td>
                    <td>
                      {donation?.recipient_district},
                      {donation?.recipient_upazila}
                    </td>
                    <td>{donation?.donation_date}</td>
                    <td>{donation?.donation_time}</td>
                    <td>{donation?.blood_group}</td>
                    <td>{donation?.status}</td>
                    <td>
                      {donation?.status === 'inprogress'
                        ? `${donation?.donor_email},${donation?.donor_name}`
                        : '--'}
                    </td>

                    <td>
                      {/* status is pending */}
                      {(donation.status === 'pending' ||
                        donation?.status === 'inprogress') && (
                        <div className="dropdown dropdown-end ">
                          <button
                            tabIndex={0}
                            role="button"
                            className="btn m-1"
                          >
                            <HiDotsHorizontal />
                          </button>
                          <ul
                            tabIndex="-1"
                            className="dropdown-content menu bg-black rounded-box z-1 w-52 p-2 shadow-sm"
                          >
                            {/* pending */}
                            {donation.status === 'pending' && (
                              <div>
                                <li>
                                  <Link
                                    className="btn btn-xs mb-3 btn-info text-white"
                                    to={`/dashboard/edit/${donation._id}`}
                                    state={location.pathname}
                                  >
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <button
                                    onClick={() => handleDelete(donation)}
                                    className="btn btn-xs mb-3  btn-info text-white"
                                  >
                                    Delete
                                  </button>
                                </li>
                                <li>
                                  <Link
                                    className="btn btn-xs mb-3  btn-info text-white"
                                    to={`/dashboard/view/${donation._id}`}
                                    state={location}
                                  >
                                    View
                                  </Link>
                                </li>
                              </div>
                            )}

                            {/* status is inprogress */}
                            <div>
                              {donation?.status === 'inprogress' && (
                                <div>
                                  <li>
                                    <button
                                      onClick={() =>
                                        hnadleStatusDone(donation._id)
                                      }
                                      className="btn btn-xs mb-3  btn-info text-white"
                                    >
                                      Done
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() =>
                                        hnadleStatusCancel(donation._id)
                                      }
                                      className="btn btn-xs mb-3  btn-info text-white"
                                    >
                                      Cancel
                                    </button>
                                  </li>
                                </div>
                              )}
                            </div>
                          </ul>
                        </div>
                      )}

                      {/* status is done  */}
                      <div>
                        {(donation.status === 'done' ||
                          donation.status === 'canceled') && <p>--</p>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* pagination */}
      <div className="text-center my-6 ">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn mr-2"
          >
            Prev
          </button>
        )}
        {[...Array(totalPage).keys()].map(i => (
          <button
            className={` btn ${
              i === currentPage && 'btn-info text-white'
            } mr-2 my-4 `}
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </button>
        ))}
        {currentPage < totalPage - 1 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn ml-2"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MyDonationRequests;