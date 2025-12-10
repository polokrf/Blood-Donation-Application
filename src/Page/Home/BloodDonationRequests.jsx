import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../Hook/useAxios';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router';

const BloodDonationRequests = () => {
  const instance = useAxios()

  const status='pending'
  const { data:pendingData =[] } = useQuery({
    queryKey: ['all-pending', status],
    queryFn:async () => {
      const res = await instance.get(`/pending-donation?status=${status}`);
      return res.data
    }

  })
  
  return (
    <div>
      <div className="overflow-x-auto">
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

              <th>
                <p>Donor</p>
                (Name, Email)
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingData.map((donation, i) => (
              <tr key={donation._id}>
                <td>{i + 1}</td>
                <td>{donation?.recipient_name}</td>
                <td>
                  {donation?.recipient_district},{donation?.recipient_upazila}
                </td>
                <td>{donation?.donation_date}</td>
                <td>{donation?.donation_time}</td>
                <td>{donation?.blood_group}</td>

                <td>
                  {donation?.status === 'inprogress'
                    ? `${donation?.donor_email},${donation?.donor_name}`
                    : '--'}
                </td>

                <td>
                  <Link
                    className="btn btn-xs mb-3  btn-info text-white"
                    to={`/blood-donation-details/${donation._id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodDonationRequests;