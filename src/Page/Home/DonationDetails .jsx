import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxios from '../../Hook/useAxios';
import useAuth from '../../Hook/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { MdBloodtype } from 'react-icons/md';
import Loader from '../../LodingAndErrorPage/Loader';

const DonationDetails = () => {
  const { id } = useParams();
  const instance = useAxios();
  const modalOpen = useRef();
  const { user } = useAuth();
  const navigate=useNavigate()

  const { data:donation={},isLoading} = useQuery({
    queryKey: ['one-data', id],
    queryFn: async () => {
      const res = await instance.get(`/one-donationInfo/${id}`);
       return res.data
    }
  })
 

  const {register,handleSubmit}=useForm()

  const handleOpen = () => {
    modalOpen.current.showModal()
  }

  const handleDonation = (data) => {
    instance.patch(`/update-status/${donation?._id}`, { ...data, status: 'inprogress' })
      .then(res => {
        toast.success('successful')
        navigate('/blood-donation');
        
      })
      .catch(err => {
        console.lof(err);
      });
  }
  if (isLoading) {
    return <Loader></Loader>
  }
  return (
    <div className=" sm:max-w-[500px]  w-full mx-auto mb-[60px] md:mt-[75px] mt-[60px] p-1">
      <div className="my-[45px] text-center">
        <h1 className="md:text-3xl text-2xl font-bold text-red-950 capitalize mb-3">
          Donation Request Information
        </h1>
        <p className="text-red-700">
          See all details of the blood request and contribute to save a life
        </p>
      </div>
      {/* details info in the donations  users */}
      <div className="bg-blue-50">
        <div className="my-[45px]  w-full">
          <div
            className="card card-border bg-base-100 w-full "
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

              <div className="sm:grid grid-cols-2">
                {/* card district */}
                <div className="mb-2">
                  <p className="font-semibold sm:mb-2">
                    District : {donation?.recipient_district}
                  </p>
                  <p className="font-semibold">
                    Upazila : {donation?.recipient_upazila}
                  </p>
                </div>
                {/* card time and date */}
                <div className="grid grid-cols-2 sm:grid-cols-1">
                  <p className="mb-2 font-semibold">
                    Date : {donation?.donation_date}
                  </p>
                  <p className="font-semibold">
                    Time : {donation?.donation_time}
                  </p>
                </div>
              </div>

              {/* message */}
              <div>
                <p className="mb-2">
                  <span className="font-semibold">Description : </span>{' '}
                  {donation.message}
                </p>

                <p className="font-semibold mb-1">
                  Address : {donation.full_address}
                </p>
                <p className="font-semibold mb-2">
                  Hospital : {donation.hospital_name}
                </p>
              </div>

              {/* Open the modal using document.getElementById('ID').showModal() method */}

              <div className="card-actions justify-end">
                <button
                  onClick={handleOpen}
                  className="btn btn-info text-white"
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}

      <dialog
        ref={modalOpen}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form onSubmit={handleSubmit(handleDonation)} className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              defaultValue={user?.displayName}
              readOnly
              {...register('name', { required: true })}
              className="input"
              placeholder="Password"
            />
            <label className="label">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              readOnly
              {...register('email', { required: true })}
              className="input"
              placeholder="Email"
            />

            <button className="btn btn-info text-white mt-4">Confirm</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DonationDetails ;