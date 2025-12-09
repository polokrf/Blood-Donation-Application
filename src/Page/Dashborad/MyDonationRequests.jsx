import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../Hook/useAuth';
import useAxios from '../../Hook/useAxios';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router';

const MyDonationRequests = () => {
  const { user } = useAuth();
  const instance = useAxios()
  const { data:myDonation=[], refetch } = useQuery({
    queryKey: ['my-donation-requests', user?.email],
    queryFn: async () => {
      const res = await instance.get(`/my-donation-request?email=${user?.email}`);
      return res.data;
    },
    
  });
  
  

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
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
            {myDonation.map((donation, i) => (
              <tr key={donation._id}>
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
                  <div className="dropdown dropdown-end ">
                    <button tabIndex={0} role="button" className="btn m-1">
                      <HiDotsHorizontal />
                    </button>

                    <ul
                      tabIndex="-1"
                      className="dropdown-content menu bg-black rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                      <li>
                        <Link  className="btn btn-xs mb-3 btn-info text-white" to={`/dashboard/edit/${donation._id}`}>
                          Edit
                        </Link>
                      </li>
                      <li>
                        <button className="btn btn-xs mb-3  btn-info text-white">
                          Delete
                        </button>
                      </li>
                      <li>
                        <button className="btn btn-xs mb-3  btn-info text-white">
                          View
                        </button>
                      </li>
                      <div>
                        {donation?.status === 'inprogress' && (
                          <div>
                            <li>
                              <button className="btn btn-xs mb-3  btn-info text-white">
                                Done
                              </button>
                            </li>
                            <li>
                              <button className="btn btn-xs mb-3  btn-info text-white">
                                Canceled
                              </button>
                            </li>
                          </div>
                        )}
                      </div>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonationRequests;