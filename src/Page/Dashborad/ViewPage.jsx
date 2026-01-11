import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import useAxios from '../../Hook/useAxios';
import { MdBloodtype } from 'react-icons/md';
import Loader from '../../LodingAndErrorPage/Loader';
import { GrUserManager } from 'react-icons/gr';

const ViewPage = () => {
  const { id } = useParams();
  const instance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { data: view ={},isLoading } = useQuery({
    queryKey: ['view', id],
    queryFn: async () => {
      const res = await instance.get(`/one-donationInfo/${id}`);
      return res.data
    }
  })
  const handleClick = () => {
    navigate(location.state);
  }
  if (isLoading) {
  return <Loader></Loader>
}
  return (
    <div className="my-[60px] md:max-w-[500px] w-full mx-auto p-2">
      <div className="text-center my-10">
        <h1 className="text-2xl text-red-950 font-bold capitalize">
          Donation Request Details
        </h1>
      </div>
      <div>
        <div className="my-[45px]  w-full">
          <div
            className="card card-border bg-base-100 w-full "
            data-aos="fade-left"
          >
            <div className="card-body bg-blue-50">
              <div>
                <span className="font-semibold mr-2"> {view.status}</span>
                <button onClick={handleClick} className=' btn btn-info btn-xs text-white '>Back</button>
              </div>
              {/* card title */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="card-title">
                  <GrUserManager /> {view?.recipient_name}
                </h2>
                <span className="flex items-center">
                  <MdBloodtype style={{ color: 'red' }} /> {view?.blood_group}
                </span>
              </div>

              <div className="sm:grid grid-cols-2">
                {/* card district */}
                <div className="mb-2">
                  <p className="font-semibold sm:mb-2">
                    District : {view?.recipient_district}
                  </p>
                  <p className="font-semibold">
                    Upazila : {view?.recipient_upazila}
                  </p>
                </div>
                {/* card time and date */}
                <div className="grid grid-cols-2 sm:grid-cols-1">
                  <p className="mb-2 font-semibold">
                    Date : {view?.donation_date}
                  </p>
                  <p className="font-semibold">Time : {view?.donation_time}</p>
                </div>
              </div>

              {/* message */}
              <div>
                <p className="mb-2">
                  {' '}
                  <span className="font-semibold"> </span> {view.message}
                </p>

                <p className="font-semibold mb-1">
                  Address : {view.full_address}
                </p>
                <p className="font-semibold mb-2">
                  Hospital : {view.hospital_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;