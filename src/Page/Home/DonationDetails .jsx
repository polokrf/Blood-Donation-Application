import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxios from '../../Hook/useAxios';
import useAuth from '../../Hook/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const DonationDetails = () => {
  const { id } = useParams();
  const instance = useAxios();
  const modalOpen = useRef();
  const { user } = useAuth();
  const navigate=useNavigate()

  const { data:donationDetails={}} = useQuery({
    queryKey: ['one-data', id],
    queryFn: async () => {
      const res = await instance.get(`/one-donationInfo/${id}`);
       return res.data
    }
  })
 console.log(donationDetails)

  const {register,handleSubmit}=useForm()

  const handleOpen = () => {
    modalOpen.current.showModal()
  }

  const handleDonation = (data) => {
    instance.patch(`/update-status/${donationDetails?._id}`, { ...data, status: ' inprogress' })
      .then(res => {
        toast.success('successful')
        navigate('/blood-donation');
        
      })
      .catch(err => {
        console.lof(err);
      });
  }
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button onClick={handleOpen} className="btn btn-info text-white">
        Donate
      </button>

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
              {...register('name', { required: true })}
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