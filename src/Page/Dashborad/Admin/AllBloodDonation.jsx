import React, { useState } from 'react';
import useAxios from '../../../Hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link, useLocation } from 'react-router';
import { HiDotsHorizontal } from 'react-icons/hi';
import useRole from '../../../Hook/useRole';
import { toast } from 'react-toastify';
import Loader from '../../../LodingAndErrorPage/Loader';

const AllBloodDonation = () => {
  const instance = useAxios();
  const location = useLocation();
  
  const [statusF, setStatusF] = useState('');
  const limit = 10;
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0)
   
  const {role}=useRole()
  const { data: allDOnation = [] ,refetch,isLoading} = useQuery({
    queryKey: ['all-donation-request',statusF,limit,currentPage],
    queryFn: async () => {
      const res = await instance.get(`/all-blood-donation-request?status=${statusF}&limit=${limit}&skip=${currentPage * limit}`)
      const page = Math.ceil(res.data.countData / limit);
      setTotalPage(page)
      return res.data.result;
    }
      
  })
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
    
  if (isLoading) {
    return <Loader></Loader>
  }

  return (
    <div>
      <div className="md:max-w-[1400px] w-full mx-auto py-[60px] px-2">
        <div className="text-center my-10">
          <h1 className="text-2xl text-red-950 font-bold capitalize mb-2">
            All Blood Donation Requests
          </h1>
          <p className="text-red-700">
            Manage and track blood donation requests. Admins have full control,
            while volunteers can view requests and update donation status.
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
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead className="bg-red-500 text-white">
              <tr>
                <th>SL</th>
                <th>Requester Name</th>
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
              {allDOnation.map((donation, i) => (
                <tr key={donation._id} className="hover:bg-gray-100">
                  <td>{i + 1}</td>
                  <td>{donation?.requester_name}</td>
                  <td>
                    {donation?.recipient_district},{donation?.recipient_upazila}
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
                    {donation.status === 'pending' ||
                    donation.status === 'inprogress' ? (
                      <div className="dropdown dropdown-end ">
                        <button tabIndex={0} role="button" className="btn m-1">
                          <HiDotsHorizontal />
                        </button>

                        <ul
                          tabIndex="-1"
                          className="dropdown-content menu bg-black rounded-box z-1 w-52 p-2 shadow-sm"
                        >
                          {role === 'Admin' ? (
                            <div>
                              {donation.status === 'pending' && (
                                <div>
                                  {' '}
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
                                        Canceled
                                      </button>
                                    </li>
                                  </div>
                                )}
                              </div>

                              {/* status is done or canceled */}
                              <div>
                                {(donation.status === 'done' ||
                                  donation.status === 'canceled') && <p>--</p>}
                              </div>
                            </div>
                          ) : (
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
                                      Canceled
                                    </button>
                                  </li>
                                </div>
                              )}

                              {/* status is done or canceled */}
                              <div>
                                {(donation.status === 'done' ||
                                  donation.status === 'canceled') && <p>--</p>}
                              </div>
                            </div>
                          )}
                        </ul>
                      </div>
                    ) : (
                      <p>--</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default AllBloodDonation;