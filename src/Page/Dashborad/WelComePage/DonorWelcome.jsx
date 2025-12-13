import React from 'react';
import useAuth from '../../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hook/useAxios';
import { Link } from 'react-router';
import { HiDotsHorizontal } from 'react-icons/hi';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { FaUserInjured } from 'react-icons/fa';

const DonorWelcome = () => {
  const { user } = useAuth()
  const instance=useAxios()
  const { data:recent=[],refetch } = useQuery({
    queryKey: ['recent-request', user?.email],
    queryFn: async () => {
      const res = await instance.get(`/recent-donation?email=${user?.email}`)
      return res.data
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
  
  
   const hnadleStatusDone = id => {
     statusUpdate(id, 'done');
   };
   const hnadleStatusCancel = id => {
     statusUpdate(id, 'canceled');
   };
  
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
      {recent.length === 0 || (
        <div>
          {' '}
          <div className="md:max-w-[1400px] w-full mx-auto">
            <div
              className="overflow-x-auto bg-base-100  p-4 "
              data-aos="fade-left"
            >
              <table className="table table-sm">
                <thead>
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
                  {recent.map((donation, i) => (
                    <tr key={donation._id} className="hover:bg-gray-200 ">
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
                        {(donation?.status === 'pending' ||
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
                              {donation.status === 'pending' && (
                                <div>
                                  <li>
                                    <Link
                                      className="btn btn-xs mb-3 btn-info text-white"
                                      to={`/dashboard/edit/${donation._id}`}
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
          </div>
          <div className="my-5 text-center ">
            <Link
              className="btn btn-info text-white"
              to="/dashboard/my-donation-requests"
            >
              view my all request
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorWelcome;