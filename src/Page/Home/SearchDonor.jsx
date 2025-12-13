import React from 'react';
import DonationDetails from './DonationDetails ';
import { MdBloodtype } from 'react-icons/md';

const SearchDonor = ({ donor }) => {
  console.log(donor)
  return (
    <div >
      <div className="card card-border bg-base-100 w-full  " data-aos="zoom-in">
        <div className="card-body">
          <div className="mx-auto">
            <img
              src={donor?.photo}
              alt=""
              className=" w-[150px] h-[150px] rounded-full mb-3"
            />
          </div>
          <div className="flex justify-between items-center">
            <h2 className="card-title">{donor?.name}</h2>
            <span className="flex items-center">
              <MdBloodtype style={{ color: 'red' }} /> {donor.blood_group}
            </span>
          </div>
          <div>
            <p className="mb-2 font-bold">District : {donor?.district}</p>
            <p className="font-bold">Upazila : {donor?.upazaila}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDonor;