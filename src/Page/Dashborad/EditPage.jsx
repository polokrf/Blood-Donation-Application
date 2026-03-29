
import React, { use } from 'react';
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router';
import useAuth from '../../Hook/useAuth';
import useAxios from '../../Hook/useAxios';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaHospital, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import Loader from '../../LodingAndErrorPage/Loader';
import { IoArrowBackOutline } from 'react-icons/io5';

const upazilaPromise = fetch('/upazaila.json').then(res => res.json());

const EditPage = () => {
  const { id } = useParams();
  const districtData = useLoaderData();
  const upazilaData = use(upazilaPromise);
  const instance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, control, setValue } = useForm();

  // Data Fetching
  const { data: edit = {}, isLoading } = useQuery({
    queryKey: ['edit', id],
    queryFn: async () => {
      const res = await instance.get(`/one-donationInfo/${id}`);
     return res.data;
    },
  });

  const singleDistrictName = districtData.map(d => d.name);
  const district =
    useWatch({ control, name: 'recipient_district' }) ||
    edit?.recipient_district;
  const findSingleDistrict = districtData.find(sD => sD.name === district);
  const filterUpazila = upazilaData.filter(
    u => u.district_id === findSingleDistrict?.id,
  );

  const handleDonation = data => {
    instance
      .patch(`/update-data/${edit._id}`, data)
      .then(res => {
        if (res.data?.modifiedCount) {
          toast.success('Information Updated Successfully');
          navigate(location.state || '/dashboard');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleClick = () => {
    navigate(location.state || '/');
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
       <Loader></Loader>
      </div>
    );

  return (
    <div className=" bg-slate-50  ">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-2xl mb-4">
          <FaEdit size={28} />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tight text-slate-900 mb-3">
          Edit <span className="text-red-600">Request</span>
        </h1>
        <p className="text-slate-500 font-medium mb-3">
          Modify the details below to ensure donors have the most accurate
          information for the blood request.
        </p>

         <button
                  onClick={handleClick}
                  className="cursor-pointer group mb-6 flex items-center gap-2 text-slate-500 hover:text-red-600 font-bold transition-colors"
                >
                  <IoArrowBackOutline className="group-hover:-translate-x-1 transition-transform" />
                  Return to List
                </button>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
          {/* Form Header Accent */}
          <div className="bg-slate-900 px-10 py-4 flex justify-between items-center">
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">
              Request ID: {id.slice(-6)}
            </span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleDonation)}
            className="p-8 md:p-12 space-y-10"
          >
            {/* Requester Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-slate-400">
                <FaUser size={14} />
                <h3 className="text-xs font-black uppercase tracking-widest">
                  Requester Information
                </h3>
                <div className="flex-1 h-[1px] bg-slate-100"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={edit?.requester_name}
                    readOnly
                    className="w-full bg-slate-50 px-5 py-4 rounded-2xl border border-slate-200 text-slate-400 font-bold outline-none cursor-not-allowed"
                    {...register('requester_name')}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={edit?.requester_email}
                    readOnly
                    className="w-full bg-slate-50 px-5 py-4 rounded-2xl border border-slate-200 text-slate-400 font-bold outline-none cursor-not-allowed"
                    {...register('requester_email')}
                  />
                </div>
              </div>
            </section>

            {/* Recipient Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-slate-400">
                <FaMapMarkerAlt size={14} />
                <h3 className="text-xs font-black uppercase tracking-widest">
                  Recipient & Location
                </h3>
                <div className="flex-1 h-[1px] bg-slate-100"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase ml-1">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    defaultValue={edit?.recipient_name}
                    className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 focus:border-red-600 focus:ring-4 focus:ring-red-50 transition-all outline-none font-bold text-slate-800"
                    {...register('recipient_name', { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase ml-1">
                    District
                  </label>
                  <select
                    defaultValue={edit?.recipient_district}
                    className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 focus:border-red-600 outline-none font-bold text-slate-800 appearance-none"
                    {...register('recipient_district', { required: true })}
                  >
                    <option disabled>Pick a district</option>
                    {singleDistrictName.map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase ml-1">
                    Upazila
                  </label>
                  <select
                    defaultValue={edit?.recipient_upazila}
                    className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 focus:border-red-600 outline-none font-bold text-slate-800 appearance-none"
                    {...register('recipient_upazila', { required: true })}
                  >
                    <option disabled>Pick a Upazila</option>
                    {filterUpazila.map(u => (
                      <option key={u?.id} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Logistics Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-slate-400">
                <FaHospital size={14} />
                <h3 className="text-xs font-black uppercase tracking-widest">
                  Medical Logistics
                </h3>
                <div className="flex-1 h-[1px] bg-slate-100"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase ml-1">
                    Hospital Name
                  </label>
                  <input
                    type="text"
                    defaultValue={edit?.hospital_name}
                    className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 focus:border-red-600 outline-none font-bold text-slate-800"
                    {...register('hospital_name', { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase ml-1">
                    Blood Group
                  </label>
                  <select
                    defaultValue={edit?.blood_group}
                    className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 focus:border-red-600 font-black text-red-600 outline-none"
                    {...register('blood_group', { required: true })}
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(
                      group => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase ml-1">
                    Full Address
                  </label>
                  <input
                    type="text"
                    defaultValue={edit?.full_address}
                    className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 focus:border-red-600 outline-none font-bold text-slate-800"
                    {...register('full_address', { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase ml-1">
                    Donation Date
                  </label>
                  <input
                    type="date"
                    defaultValue={edit?.donation_date}
                    className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 focus:border-red-600 outline-none font-bold text-slate-800"
                    {...register('donation_date', { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase ml-1">
                    Donation Time
                  </label>
                  <input
                    type="time"
                    defaultValue={edit?.donation_time}
                    className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 focus:border-red-600 outline-none font-bold text-slate-800"
                    {...register('donation_time', { required: true })}
                  />
                </div>
              </div>
            </section>

            {/* Message Area */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase ml-1">
                Urgency Message
              </label>
              <textarea
                rows="4"
                defaultValue={edit?.message}
                className="w-full p-6 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-red-600 focus:bg-white transition-all outline-none font-medium text-slate-800"
                {...register('message', { required: true })}
              ></textarea>
            </div>

            {/* Action Button */}
            <div className="pt-6">
              <button className="w-full bg-red-600 hover:bg-slate-900 text-white font-black uppercase tracking-widest py-5 rounded-2xl shadow-xl shadow-red-200 transition-all active:scale-[0.98]">
                Update Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;