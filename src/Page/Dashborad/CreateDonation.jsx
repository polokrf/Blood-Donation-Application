

import React, { use } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import useAuth from '../../Hook/useAuth';
import useAxios from '../../Hook/useAxios';
import { toast } from 'react-toastify';

const upazilaPromise = fetch('/upazaila.json').then(res => res.json());

const CreateDonation = () => {
  const districtData = useLoaderData();
  const upazilaData = use(upazilaPromise);
  const { user } = useAuth();
  const instance = useAxios();
  const navigate = useNavigate();

  const singleDistrictName = districtData.map(d => d.name);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const district = useWatch({ control, name: 'recipient_district' });
  const findSingleDistrict = districtData.find(sD => sD.name === district);
  const filterUpazila = upazilaData.filter(
    u => u.district_id === findSingleDistrict?.id,
  );

  const handleDonation = data => {
    instance
      .post('/blood-donation', data)
      .then(res => {
        if (res?.data?.insertedId) {
          toast.success('Donation Request Created!');
          reset();
        }
        if (res?.data?.message) {
          toast.error(res.data.message);
          navigate('/');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="bg-slate-50  font-sans text-slate-900">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-3 leading-tight">
          Create <span className="text-red-600">Blood</span> Request
        </h1>
        <p className="text-slate-500 font-medium">
          Provide accurate details to help donors find and respond to your
          emergency quickly.
        </p>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        {/* Decorative Top Bar */}
        <div className="h-2 w-full bg-red-600"></div>

        <form
          onSubmit={handleSubmit(handleDonation)}
          className="p-8 md:p-12 space-y-8"
        >
          {/* Section 1: Requester Info (Read Only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                Your Name
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                readOnly
                {...register('requester_name')}
                className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-slate-500 font-bold italic outline-none cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                Your Email
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                readOnly
                {...register('requester_email')}
                className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-slate-500 font-bold italic outline-none cursor-not-allowed"
              />
            </div>
          </div>

          {/* Section 2: Recipient Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-black uppercase tracking-tight text-slate-800 border-b border-slate-100 pb-2">
              Recipient & Location
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-extrabold text-slate-700 uppercase tracking-wide">
                  Recipient Name
                </label>
                <input
                  type="text"
                  {...register('recipient_name', { required: true })}
                  placeholder="Enter patient's full name"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none font-bold text-slate-800 shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-extrabold text-slate-700 uppercase tracking-wide">
                  District
                </label>
                <select
                  defaultValue=""
                  {...register('recipient_district', { required: true })}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none font-bold text-slate-800 appearance-none shadow-sm cursor-pointer"
                >
                  <option value="" disabled>
                    Select District
                  </option>
                  {singleDistrictName.map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-extrabold text-slate-700 uppercase tracking-wide">
                  Upazila
                </label>
                <select
                  defaultValue=""
                  {...register('recipient_upazila', { required: true })}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none font-bold text-slate-800 appearance-none shadow-sm cursor-pointer"
                >
                  <option value="" disabled>
                    Select Upazila
                  </option>
                  {filterUpazila.map(u => (
                    <option key={u?.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Hospital Logistics */}
          <div className="space-y-6">
            <h3 className="text-lg font-black uppercase tracking-tight text-slate-800 border-b border-slate-100 pb-2">
              Hospital Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-extrabold text-slate-700 uppercase tracking-wide">
                  Hospital Name
                </label>
                <input
                  type="text"
                  {...register('hospital_name', { required: true })}
                  placeholder="e.g. Dhaka Medical College"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none font-bold text-slate-800 shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-extrabold text-slate-700 uppercase tracking-wide">
                  Full Address
                </label>
                <input
                  type="text"
                  {...register('full_address', { required: true })}
                  placeholder="Street, Area, Landmark"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none font-bold text-slate-800 shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-extrabold text-slate-700 uppercase tracking-wide text-red-600">
                  Blood Group
                </label>
                <select
                  defaultValue=""
                  {...register('blood_group', { required: true })}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white transition-all outline-none font-black text-red-600 appearance-none shadow-sm cursor-pointer"
                >
                  <option value="" disabled>
                    Pick a Blood group
                  </option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(
                    group => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-700 uppercase tracking-wide">
                    Date
                  </label>
                  <input
                    type="date"
                    {...register('donation_date', { required: true })}
                    className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white transition-all outline-none font-bold text-slate-800 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-700 uppercase tracking-wide">
                    Time
                  </label>
                  <input
                    type="time"
                    {...register('donation_time', { required: true })}
                    className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white transition-all outline-none font-bold text-slate-800 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Message */}
          <div className="space-y-2">
            <label className="text-sm font-extrabold text-slate-700 uppercase tracking-wide ml-1">
              Request Message
            </label>
            <textarea
              rows="4"
              {...register('message', { required: true })}
              placeholder="Provide more context (e.g., Surgery details, urgency level...)"
              className="w-full p-6 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white transition-all outline-none font-medium text-slate-800 shadow-inner italic"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button className="w-full cursor-pointer group relative overflow-hidden bg-red-600 hover:bg-slate-900 px-8 py-5 rounded-2xl text-white transition-all duration-300 active:scale-[0.98] shadow-xl shadow-red-200 hover:shadow-slate-300">
              <span className="relative z-10 text-xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
                Post Request
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </button>
            <p className="text-center mt-6 text-slate-400 text-xs font-bold uppercase tracking-wider">
              Secure Submission • Direct Donor Connection
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDonation;
