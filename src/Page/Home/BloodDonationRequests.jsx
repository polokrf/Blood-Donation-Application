import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../../Hook/useAxios';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router';
import { MdBloodtype } from 'react-icons/md';
import Loader from '../../LodingAndErrorPage/Loader';

const BloodDonationRequests = () => {
  const instance = useAxios()
    const limit = 10;
      const [totalPage, setTotalPage] = useState(0);
      const [currentPage,setCurrentPage]=useState(0)
    

  const status='pending'
  const { data:pendingData =[] ,isLoading} = useQuery({
    queryKey: ['all-pending', status,limit,currentPage],
    queryFn:async () => {
      const res = await instance.get(`/pending-donation?status=${status}&limit=${limit}&skip=${currentPage * limit}`);
       const page = Math.ceil(res.data.countData / limit);
       setTotalPage(page);
      return res.data.result
    }

  })
  if (isLoading) {
    return <Loader></Loader>
  }
  
  return (
    <div className="linerBg ">
      <div className="linerBg  min-h-screen p-2">
        <div className="md:max-w-[1200px] w-full mx-auto my-[45px]">
          <div className="my-[45px] text-center">
            <h1 className="md:text-3xl text-2xl font-bold text-red-950 capitalize mb-3">
              All Pending Blood Donation Requests
            </h1>
            <p className="text-red-700">
              View current blood requests and support patients in need
            </p>
          </div>

          <div className="my-[45px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center  w-full gap-3 ">
            {pendingData.map(donation => (
              <div
                key={donation._id}
                className="card card-border bg-base-100 w-full  "
                data-aos="fade-left"
              >
                <div className="card-body">
                  {/* card title */}
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="card-title">
                      Name : {donation?.recipient_name}
                    </h2>
                    <span className="flex items-center">
                      <MdBloodtype style={{ color: 'red' }} />{' '}
                      {donation?.blood_group}
                    </span>
                  </div>

                  <div>
                    {/* card district */}
                    <div className="mb-2">
                      <p className="font-semibold">
                        District : {donation?.recipient_district}
                      </p>
                      <p className="font-semibold">
                        Upazila : {donation?.recipient_upazila}
                      </p>
                    </div>
                    {/* card time and date */}
                    <div className="">
                      <p className=" font-semibold ">
                        Date : {donation?.donation_date}
                      </p>
                      <p className="font-semibold">
                        Time : {donation?.donation_time}
                      </p>
                    </div>
                  </div>

                  <div className="card-actions justify-end">
                    <Link
                      className="btn btn-secondary mb-3   text-white"
                      to={`/blood-donation-details/${donation._id}`}
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* pagination */}
      <div className="text-center mt-2 ">
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

export default BloodDonationRequests;