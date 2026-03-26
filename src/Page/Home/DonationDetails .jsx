// import { useQuery } from '@tanstack/react-query';
// import React, { useRef } from 'react';
// import { useNavigate, useParams } from 'react-router';
// import useAxios from '../../Hook/useAxios';
// import useAuth from '../../Hook/useAuth';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import { MdBloodtype } from 'react-icons/md';
// import Loader from '../../LodingAndErrorPage/Loader';
// import { GrUserManager } from 'react-icons/gr';

// const DonationDetails = () => {
//   const { id } = useParams();
//   const instance = useAxios();
//   const modalOpen = useRef();
//   const { user } = useAuth();
//   const navigate=useNavigate()

//   const { data:donation={},isLoading} = useQuery({
//     queryKey: ['one-data', id],
//     queryFn: async () => {
//       const res = await instance.get(`/one-donationInfo/${id}`);
//        return res.data
//     }
//   })

//   const {register,handleSubmit}=useForm()

//   const handleOpen = () => {
//     if (!user) {
//       navigate('/login')
//     }
//     modalOpen.current.showModal();

//   }

//   const handleDonation = (data) => {
//     instance.patch(`/update-status/${donation?._id}`, { ...data, status: 'inprogress' })
//       .then(res => {
//         toast.success('successful')
//         navigate('/blood-donation');

//       })
//       .catch(err => {
//         console.lof(err);
//       });
//   }
//   const handleClick = () => {
//     navigate('/blood-donation');
//   };
//   if (isLoading) {
//     return <Loader></Loader>
//   }
//   return (
//     <div className=" sm:max-w-[500px]  w-full mx-auto mb-[60px] md:mt-[75px] mt-[60px] p-1">
//       <div className="my-[45px] text-center">
//         <h1 className="titles capitalize mb-3">Donation Request Information</h1>
//         <p>
//           See all details of the blood request and contribute to save a life
//         </p>
//       </div>
//       {/* details info in the donations  users */}
//       <div className="bg-blue-50">
//         <div className="my-[45px]  w-full">
//           <div
//             className="card card-border bg-base-100 w-full "
//             data-aos="fade-left"
//           >
//             <div className="card-body">
//               {/* card title */}

//               <div className="flex justify-between items-center mb-2">
//                 <h2 className="card-title ">
//                   <GrUserManager />
//                   {donation?.recipient_name}
//                 </h2>
//                 <span className="flex items-center">
//                   <MdBloodtype style={{ color: 'red' }} />{' '}
//                   {donation?.blood_group}
//                 </span>
//               </div>

//               <div className="sm:grid grid-cols-2">
//                 {/* card district */}
//                 <div className="mb-2">
//                   <p className="font-semibold sm:mb-2">
//                     District : {donation?.recipient_district}
//                   </p>
//                   <p className="font-semibold">
//                     Upazila : {donation?.recipient_upazila}
//                   </p>
//                 </div>
//                 {/* card time and date */}
//                 <div className="grid grid-cols-2 sm:grid-cols-1">
//                   <p className="mb-2 font-semibold">
//                     Date : {donation?.donation_date}
//                   </p>
//                   <p className="font-semibold">
//                     Time : {donation?.donation_time}
//                   </p>
//                 </div>
//               </div>

//               {/* message */}
//               <div>
//                 <p className="mb-2">
//                   <span className="font-semibold"> </span> {donation.message}
//                 </p>

//                 <p className="font-semibold mb-1">
//                   Address : {donation.full_address}
//                 </p>
//                 <p className="font-semibold mb-2">
//                   Hospital : {donation.hospital_name}
//                 </p>
//               </div>

//               {/* Open the modal using document.getElementById('ID').showModal() method */}

//               <div className="card-actions justify-end">
//                 <button
//                   onClick={handleOpen}
//                   className="btn btn-info text-white"
//                 >
//                   Donate
//                 </button>

//                   <button
//                     onClick={handleClick}
//                     className=" btn btn-info  text-white "
//                   >
//                     Back
//                   </button>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* modal */}

//       <dialog
//         ref={modalOpen}
//         id="my_modal_5"
//         className="modal modal-bottom sm:modal-middle"
//       >
//         <div className="modal-box">
//           <form onSubmit={handleSubmit(handleDonation)} className="fieldset">
//             <label className="label">Name</label>
//             <input
//               type="text"
//               defaultValue={user?.displayName}
//               readOnly
//               {...register('name', { required: true })}
//               className="input"
//               placeholder="Password"
//             />
//             <label className="label">Email</label>
//             <input
//               type="email"
//               defaultValue={user?.email}
//               readOnly
//               {...register('email', { required: true })}
//               className="input"
//               placeholder="Email"
//             />

//             <button className="btn btn-info text-white mt-4">Confirm</button>
//           </form>
//           <div className="modal-action">
//             <form method="dialog">
//               {/* if there is a button in form, it will close the modal */}
//               <button className="btn">Close</button>
//             </form>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default DonationDetails ;

import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxios from '../../Hook/useAxios';
import useAuth from '../../Hook/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  MdBloodtype,
  MdOutlineLocationOn,
  MdAccessTime,
  MdCalendarToday,
  MdLocalHospital,
  MdOutlineMessage,
} from 'react-icons/md';
import Loader from '../../LodingAndErrorPage/Loader';
import { GrUserManager } from 'react-icons/gr';
import { HiArrowLeft } from 'react-icons/hi';

const DonationDetails = () => {
  const { id } = useParams();
  const instance = useAxios();
  const modalOpen = useRef();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: donation = {}, isLoading } = useQuery({
    queryKey: ['one-data', id],
    queryFn: async () => {
      const res = await instance.get(`/one-donationInfo/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit } = useForm();

  const handleOpen = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    modalOpen.current.showModal();
  };

  const handleDonation = data => {
    instance
      .patch(`/update-status/${donation?._id}`, {
        ...data,
        status: 'inprogress',
      })
      .then(res => {
        toast.success('Donation successful!');
        navigate('/blood-donation');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleClick = () => {
    navigate('/blood-donation');
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white pb-20 pt-10 px-4">
      {/* Back Button */}
      <div className="max-w-[700px] mx-auto mb-6">
        <button
          onClick={handleClick}
          className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors"
        >
          <HiArrowLeft className="text-xl" /> Back to List
        </button>
      </div>

      <div className="max-w-[700px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100">
            Urgent Requirement
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none">
            Request <span className="text-red-600">Details</span>
          </h1>
          <div className="w-20 h-1.5 bg-red-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Info Card */}
        <div className="relative bg-white border-2 border-red-50 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-red-100/50 overflow-hidden group">
          {/* Blood Group Badge */}
          <div className="absolute top-0 right-0 p-8">
            <div className="w-20 h-20 bg-red-600 text-white rounded-[2rem] flex flex-col items-center justify-center shadow-xl shadow-red-200 rotate-6 group-hover:rotate-0 transition-transform duration-500">
              <MdBloodtype className="text-3xl" />
              <span className="font-black text-xl leading-none">
                {donation?.blood_group}
              </span>
            </div>
          </div>

          <div className="space-y-10 relative">
            {/* Recipient Header */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                <GrUserManager />
              </div>
              <div>
                <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">
                  Patient Name
                </p>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter">
                  {donation?.recipient_name}
                </h2>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-50 rounded-xl text-red-500 text-xl">
                    <MdOutlineLocationOn />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Location
                    </p>
                    <p className="font-bold text-gray-800">
                      {donation?.recipient_district},{' '}
                      {donation?.recipient_upazila}
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                      {donation.full_address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-50 rounded-xl text-red-500 text-xl">
                    <MdLocalHospital />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Medical Facility
                    </p>
                    <p className="font-bold text-gray-800">
                      {donation.hospital_name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-50 rounded-xl text-red-500 text-xl">
                    <MdCalendarToday />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Required Date
                    </p>
                    <p className="font-bold text-gray-800">
                      {donation?.donation_date}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-50 rounded-xl text-red-500 text-xl">
                    <MdAccessTime />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Required Time
                    </p>
                    <p className="font-bold text-gray-800">
                      {donation?.donation_time}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Box */}
            <div className="p-6 bg-red-50/50 border border-red-50 rounded-3xl relative">
              <MdOutlineMessage className="absolute -top-3 -left-3 text-4xl text-red-100" />
              <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">
                Message from Requester
              </p>
              <p className="text-gray-600 font-medium italic leading-relaxed">
                "{donation.message}"
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-6">
              <button
                onClick={handleOpen}
                className="w-full py-6 bg-red-600 text-white font-black rounded-3xl hover:bg-gray-950 transition-all duration-300 shadow-2xl shadow-red-200 uppercase tracking-[0.2em] text-sm active:scale-95"
              >
                Accept Donation Request
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Dialog/Modal */}
      <dialog ref={modalOpen} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white rounded-[3rem] p-10 border-2 border-red-50 shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">
              Confirm Donation
            </h3>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">
              Ready to save a life?
            </p>
          </div>

          <form onSubmit={handleSubmit(handleDonation)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                Your Name
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                readOnly
                {...register('name', { required: true })}
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:border-red-500 outline-none font-bold text-gray-700 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                Your Email
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                readOnly
                {...register('email', { required: true })}
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:border-red-500 outline-none font-bold text-gray-700 transition-all"
              />
            </div>

            <button className="w-full py-5 bg-red-600 text-white font-black rounded-2xl hover:shadow-xl shadow-red-200 transition-all uppercase tracking-widest text-xs">
              I Confirm My Donation
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog" className="w-full">
              <button className="w-full py-4 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-red-600 transition-colors">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DonationDetails;