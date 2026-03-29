import React, { useState } from 'react';
import useAuth from '../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hook/useAxios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loader from '../../LodingAndErrorPage/Loader';
import {
  FaUserEdit,
  FaSave,
  FaUserCircle,
  FaTint,
  FaMapMarkerAlt,
  FaEnvelope,
  FaTimes,
} from 'react-icons/fa';

const MyProfile = () => {
  const { user, updateUser } = useAuth();
  const instance = useAxios();
  const [state, setState] = useState(true);

  const { register, handleSubmit, reset } = useForm();
  const { data: myProfile = {}, isLoading } = useQuery({
    queryKey: ['my-profile', user?.email],
    queryFn: async () => {
      const res = await instance.get(`/my-profile-data?email=${user?.email}`);
      return res.data;
    },
  });

  const handleUpdateUserInfo = data => {
    const blood_group = data.blood_group?.toUpperCase();
    const personInfo = { displayName: data.name, photoURL: data.photo };

    instance
      .patch(`/user-update-profile/${myProfile._id}`, { ...data, blood_group })
      .then(() => {
        updateUser(personInfo).catch(err => console.log(err));
        setState(true);
        toast.success('Profile Updated!');
      })
      .catch(err => console.log(err));
  };

  if (isLoading) return <Loader />;

  return (
    <div className="  flex items-center justify-center font-sans">
      <div className="max-w-5xl w-full flex flex-col md:flex-row bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white transition-transform hover:scale-[1.01] duration-500">
        {/* Left Profile Sidebar - Red Theme */}
        <div className="md:w-1/3 bg-red-600 p-10 flex flex-col items-center text-center text-white">
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-200 transition-transform hover:rotate-3 duration-300">
              {myProfile?.photo ? (
                <img
                  src={myProfile.photo}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-slate-400" />
              )}
            </div>
            {!state && (
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-red-800 text-[10px] font-black px-2 py-1 rounded-full animate-bounce">
                EDIT MODE
              </div>
            )}
          </div>

          <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">
            {myProfile?.name || 'Member'}
          </h2>

          <div className="w-full bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm mb-8">
            <p className="text-[10px] font-bold tracking-widest uppercase opacity-70 mb-1">
              Blood Group
            </p>
            <div className="flex items-center justify-center gap-2">
              <FaTint className="text-white animate-pulse" />
              <span className="text-3xl font-black">
                {myProfile?.blood_group || 'N/A'}
              </span>
            </div>
          </div>

          <div className="mt-auto w-full space-y-3">
            {state ? (
              <button
                type="button"
                onClick={() => setState(false)}
                className="w-full cursor-pointer py-4 bg-white text-red-600 rounded-2xl font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-900/20 active:scale-95"
              >
                <FaUserEdit /> Edit Profile
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  type="submit"
                  form="profile-form"
                  className="w-full cursor-pointer py-4 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                >
                  <FaSave /> Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setState(true);
                  }}
                  className="w-full cursor-pointer py-2 text-white/80 hover:text-white font-bold transition-all flex items-center justify-center gap-2"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Form Section - White Theme */}
        <div className="md:w-2/3 p-8 md:p-14 bg-white">
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-100">
            <div className="w-1.5 h-8 bg-red-600 rounded-full"></div>
            <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">
              Profile <span className="text-red-600">Details</span>
            </h3>
          </div>

          <form
            id="profile-form"
            onSubmit={handleSubmit(handleUpdateUserInfo)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            {/* Email Field */}
            <div className="sm:col-span-2 group">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2 flex items-center gap-2">
                <FaEnvelope className="text-red-600" /> Registration Email
              </label>
              <input
                type="email"
                defaultValue={myProfile?.email}
                disabled
                className="w-full bg-slate-100 p-4 rounded-xl text-slate-500 font-bold italic border border-slate-200 cursor-not-allowed outline-none"
              />
            </div>

            {/* Name Field */}
            <div className="flex flex-col">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                readOnly={state}
                defaultValue={myProfile?.name}
                {...register('name', { required: true })}
                className={`w-full p-4 rounded-xl text-lg font-bold transition-all outline-none border-2 ${
                  state
                    ? 'bg-transparent border-transparent text-slate-800'
                    : 'bg-red-50 border-red-100 focus:border-red-600 text-slate-900 shadow-inner'
                }`}
              />
            </div>

            {/* Blood Type Field */}
            <div className="flex flex-col">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">
                Blood Type
              </label>
              <input
                type="text"
                readOnly={state}
                defaultValue={myProfile?.blood_group}
                {...register('blood_group', { required: true })}
                className={`w-full p-4 rounded-xl text-lg font-black transition-all outline-none border-2 ${
                  state
                    ? 'bg-transparent border-transparent text-red-600 uppercase'
                    : 'bg-red-50 border-red-100 focus:border-red-600 text-red-700 shadow-inner'
                }`}
              />
            </div>

            {/* District Field */}
            <div className="flex flex-col">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1 flex items-center gap-1">
                <FaMapMarkerAlt className="text-red-500" /> District
              </label>
              <input
                type="text"
                readOnly={state}
                defaultValue={myProfile?.district}
                {...register('district', { required: true })}
                className={`w-full p-4 rounded-xl text-lg font-bold transition-all outline-none border-2 ${
                  state
                    ? 'bg-transparent border-transparent text-slate-800'
                    : 'bg-red-50 border-red-100 focus:border-red-600 shadow-inner'
                }`}
              />
            </div>

            {/* Upazila Field */}
            <div className="flex flex-col">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">
                Upazila
              </label>
              <input
                type="text"
                readOnly={state}
                defaultValue={myProfile?.upazaila}
                {...register('upazaila', { required: true })}
                className={`w-full p-4 rounded-xl text-lg font-bold transition-all outline-none border-2 ${
                  state
                    ? 'bg-transparent border-transparent text-slate-800'
                    : 'bg-red-50 border-red-100 focus:border-red-600 shadow-inner'
                }`}
              />
            </div>

            {/* Photo URL Field */}
            <div className="sm:col-span-2 flex flex-col">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">
                Photo URL
              </label>
              <input
                type="text"
                readOnly={state}
                defaultValue={myProfile?.photo}
                {...register('photo', { required: true })}
                className={`w-full p-4 rounded-xl text-sm transition-all outline-none border-2 ${
                  state
                    ? 'bg-transparent border-transparent text-slate-400 truncate'
                    : 'bg-red-50 border-red-100 focus:border-red-600 shadow-inner'
                }`}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
