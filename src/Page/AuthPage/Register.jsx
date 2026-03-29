// import React, { use, useState } from 'react';
// import { useForm, useWatch } from 'react-hook-form';
// import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
// import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
// import useAuth from '../../Hook/useAuth';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// const upazailaData = fetch('/upazaila.json').then(res => res.json());
// const Register = () => {
//   const [icon, setIcon] = useState(false);
//   const [icon2, setIcon2] = useState(false);
//   const { registerUser, updateUser,setUser } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const districtData = useLoaderData();
//   const upazailacovert = use(upazailaData);

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm();

//   const district = useWatch({ control, name: 'district' });

//   const singleDistrict = districtData.find(dis => dis.name === district);

//   const filterUpazaila = upazailacovert.filter(
//     up => up.district_id === singleDistrict?.id
//   );

//   const handelForm = data => {
//     if (data.password !== data.confirm_pas) {
//       return toast.error('Do not match password');
//     }

//     const photo = data.photo[0];
//     registerUser(data.email, data.password)
//       .then(resUser => {
//         const formdata = new FormData();
//         formdata.append('image', photo);
//         const phot_url = `https://api.imgbb.com/1/upload?key=${
//           import.meta.env.VITE_imag_key
//         }`;

//         axios.post(phot_url, formdata)
//           .then(res => {
//             const userInfo = {
//               name: data.name,
//               email: data.email,
//               photo: res.data.data.url,
//               district: data.district,
//               upazaila: data.upazaila,
//               blood_group: data.blood_group,
//             };

//             axios.post(
//                 'https://blood-donation-server-rho.vercel.app/user',
//                 userInfo
//               )
//               .then(res => {})
//               .catch(err => {
//                 console.log(err);
//               });

//             const personInfo = {
//               displayName: data.name,
//               photoURL: res.data.data.url,
//             };
//             setUser({...resUser,...personInfo})

//             updateUser(personInfo)
//               .then(() => {})
//               .catch(error => {
//                 toast.error(error.message);
//               });
//           })
//           .catch(err => {
//             console.log(err);
//           });

//         navigate(location.state || '/');
//         toast.success('successful');
//       })
//       .catch(err => toast.error(err.message));
//   };
//   return (
//     <div>
//       <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl my-[60px] mx-auto">
//         <div className="mt-3 text-center p-2">
//           <h1 className="text-2xl font-bold mb-3">Register your Account!</h1>

//           <span className="subtitle">
//             Get started with our app, just create an account and enjoy the
//             experience.
//           </span>
//         </div>
//         <div className="card-body">
//           <form onSubmit={handleSubmit(handelForm)}>
//             <fieldset className="fieldset">
//               {/* email */}
//               <label className="label">Email</label>
//               <input
//                 type="email"
//                 {...register('email', { required: true })}
//                 className="input"
//                 placeholder="Email"
//               />
//               {/* Name */}
//               <label className="label">Name</label>
//               <input
//                 type="text"
//                 {...register('name', { required: true })}
//                 className="input"
//                 placeholder="Name"
//               />
//               {/* avatar */}
//               <label className="label">Avatar</label>
//               <input
//                 type="file"
//                 {...register('photo', { required: true })}
//                 className="file-input"
//               />
//               {/* blood group */}
//               <label className="label">Blood Group </label>
//               <select
//                 {...register('blood_group', { required: true })}
//                 defaultValue="select blood group"
//                 className="select"
//               >
//                 <option disabled={true}>select group</option>
//                 <option value={'A+'}>A+</option>
//                 <option value={'A-'}>A-</option>
//                 <option value={'B+'}>B+</option>
//                 <option value={'B-'}>B-</option>
//                 <option value={'AB+'}>AB+</option>
//                 <option value={'AB-'}>AB-</option>
//                 <option value={'O+'}>O+</option>
//                 <option value={'O-'}>O-</option>
//               </select>
//               {/*district */}
//               <label className="label">District </label>
//               <select
//                 {...register('district', { required: true })}
//                 className="select"
//               >
//                 {districtData.map(d => (
//                   <option key={d.id} value={d.name}>
//                     {d?.name}
//                   </option>
//                 ))}
//               </select>
//               {/* upazila  */}
//               <label className="label">Upazila</label>
//               <select
//                 {...register('upazaila', { required: true })}
//                 className="select"
//               >
//                 {filterUpazaila.map(upa => (
//                   <option key={upa.id} value={upa.name}>
//                     {upa?.name}
//                   </option>
//                 ))}
//               </select>
//               {/* password */}
//               <label className="label">Password</label>
//               <div className=" relative">
//                 <input
//                   type={icon ? 'text' : 'password'}
//                   className="input"
//                   {...register('password', { required: true, minLength: 6 })}
//                   placeholder="Password"
//                 />
//                 {errors.password?.type === 'minLength' && (
//                   <p className="text-red-500">Password length 6</p>
//                 )}
//                 <button
//                   type="button"
//                   onClick={() => setIcon(!icon)}
//                   className="btn btn-xs absolute right-5 top-2 "
//                 >
//                   {icon ? <FaRegEye /> : <FaRegEyeSlash></FaRegEyeSlash>}
//                 </button>
//               </div>
//               {/* confirm password */}
//               <label className="label">Confirm Password</label>
//               <div className=" relative">
//                 <input
//                   type={icon2 ? 'text' : 'password'}
//                   className="input"
//                   {...register('confirm_pas', { required: true, min: 6 })}
//                   placeholder="Password"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setIcon2(!icon2)}
//                   className="btn btn-xs absolute right-5 top-2 "
//                 >
//                   {icon2 ? <FaRegEye /> : <FaRegEyeSlash></FaRegEyeSlash>}
//                 </button>
//               </div>

//               <button className="btn btn-info btn-outline mt-4">
//                 Register
//               </button>
//             </fieldset>
//           </form>
//           <p>
//             already have an account{' '}
//             <Link
//               state={location.state}
//               className="text-blue-600 font-bold underline"
//               to="/login"
//             >
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { use, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  FaRegEye,
  FaRegEyeSlash,
  FaUser,
  FaEnvelope,
  FaImage,
  FaTint,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hook/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';

const upazailaData = fetch('/upazaila.json').then(res => res.json());

const Register = () => {
  const [icon, setIcon] = useState(false);
  const [icon2, setIcon2] = useState(false);
  const { registerUser, updateUser, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const districtData = useLoaderData();
  const upazailacovert = use(upazailaData);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const district = useWatch({ control, name: 'district' });
  const singleDistrict = districtData.find(dis => dis.name === district);
  const filterUpazaila = upazailacovert.filter(
    up => up.district_id === singleDistrict?.id,
  );

  const handelForm = data => {
    if (data.password !== data.confirm_pas) {
      return toast.error('Passwords do not match');
    }

    const photo = data.photo[0];
    registerUser(data.email, data.password)
      .then(resUser => {
        const formdata = new FormData();
        formdata.append('image', photo);
        const phot_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imag_key}`;

        axios.post(phot_url, formdata).then(res => {
          const userInfo = {
            name: data.name,
            email: data.email,
            photo: res.data.data.url,
            district: data.district,
            upazaila: data.upazaila,
            blood_group: data.blood_group,
          };

          axios
            .post('https://blood-donation-server-rho.vercel.app/user', userInfo)
            .catch(err => console.log(err));

          const personInfo = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          setUser({ ...resUser, ...personInfo });

          updateUser(personInfo).catch(error => toast.error(error.message));
        });

        navigate(location.state || '/');
        toast.success('Registration Successful');
      })
      .catch(err => toast.error(err.message));
  };

  return (
    <div className="  relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-900/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative " data-aos="fade-up">
        <div className=" shadow-sm rounded-[3rem]  border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Left Sidebar Branding */}
            <div className="md:col-span-2 bg-[#0F172A] p-12 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600"></div>
              <div className="relative z-10">
                <span className="bg-red-600 text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full">
                  New Member
                </span>
                <h2 className="text-4xl font-black mt-6 leading-tight uppercase tracking-tighter">
                  Join our <br />
                  <span className="text-red-500 italic">Life-Saving</span>{' '}
                  <br />
                  Mission
                </h2>
                <p className="text-slate-400 mt-6 text-sm font-medium leading-relaxed">
                  Become a hero today. Your registration helps us connect donors
                  with those in urgent need.
                </p>
              </div>
              {/* Decorative Pattern */}
              <div className="absolute top-10 right-10 opacity-10">
                <FaTint size={120} />
              </div>
            </div>

            {/* Form Section */}
            <div className="md:col-span-3 p-8 md:p-12">
              <form onSubmit={handleSubmit(handelForm)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Full Name
                    </label>
                    <div className="relative group">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-600 transition-colors" />
                      <input
                        type="text"
                        {...register('name', { required: true })}
                        className="w-full bg-slate-50 border-2 border-slate-50 focus:border-red-600 focus:bg-white rounded-2xl py-3 pl-11 pr-4 outline-none transition-all font-bold text-slate-900 text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-600 transition-colors" />
                      <input
                        type="email"
                        {...register('email', { required: true })}
                        className="w-full bg-slate-50 border-2 border-slate-50 focus:border-red-600 focus:bg-white rounded-2xl py-3 pl-11 pr-4 outline-none transition-all font-bold text-slate-900 text-sm"
                        placeholder="email@provider.com"
                      />
                    </div>
                  </div>

                  {/* Avatar/File */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Profile Photo
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        {...register('photo', { required: true })}
                        className="file-input file-input-ghost bg-slate-50 w-full rounded-2xl border-2 border-slate-50 focus:border-red-600 text-xs font-bold"
                      />
                    </div>
                  </div>

                  {/* Blood Group */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Blood Group
                    </label>
                    <div className="relative">
                      <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                      <select
                        {...register('blood_group', { required: true })}
                        className="w-full bg-slate-50 border-2 border-slate-50 focus:border-red-600 focus:bg-white rounded-2xl py-3 pl-11 pr-4 outline-none transition-all font-bold text-slate-900 text-sm appearance-none cursor-pointer"
                      >
                        <option value="">Select Group</option>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(
                          group => (
                            <option key={group} value={group}>
                              {group}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                  </div>

                  {/* District */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      District
                    </label>
                    <select
                      {...register('district', { required: true })}
                      className="w-full bg-slate-50 border-2 border-slate-50 focus:border-red-600 focus:bg-white rounded-2xl py-3 px-4 outline-none transition-all font-bold text-slate-900 text-sm cursor-pointer"
                    >
                      <option value="">Select District</option>
                      {districtData.map(d => (
                        <option key={d.id} value={d.name}>
                          {d?.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Upazila */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Upazila
                    </label>
                    <select
                      {...register('upazaila', { required: true })}
                      disabled={!district}
                      className="w-full bg-slate-50 border-2 border-slate-50 focus:border-red-600 focus:bg-white rounded-2xl py-3 px-4 outline-none transition-all font-bold text-slate-900 text-sm cursor-pointer disabled:opacity-50"
                    >
                      <option value="">Select Upazila</option>
                      {filterUpazaila.map(upa => (
                        <option key={upa.id} value={upa.name}>
                          {upa?.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={icon ? 'text' : 'password'}
                        {...register('password', {
                          required: true,
                          minLength: 6,
                        })}
                        className="w-full bg-slate-50 border-2 border-slate-50 focus:border-red-600 focus:bg-white rounded-2xl py-3 px-4 pr-12 outline-none transition-all font-bold text-slate-900 text-sm"
                        placeholder="••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setIcon(!icon)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        {icon ? <FaRegEye /> : <FaRegEyeSlash />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-[10px] text-red-500 font-bold uppercase mt-1 italic">
                        Min 6 characters required
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={icon2 ? 'text' : 'password'}
                        {...register('confirm_pas', { required: true })}
                        className="w-full bg-slate-50 border-2 border-slate-50 focus:border-red-600 focus:bg-white rounded-2xl py-3 px-4 pr-12 outline-none transition-all font-bold text-slate-900 text-sm"
                        placeholder="••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setIcon2(!icon2)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        {icon2 ? <FaRegEye /> : <FaRegEyeSlash />}
                      </button>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-red-600 hover:bg-[#0F172A] text-white font-black uppercase tracking-[0.2em] py-4 rounded-2xl transition-all duration-500 shadow-xl shadow-red-100 cursor-pointer text-xs mt-4">
                  register now
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                <p className="text-slate-400 font-bold text-xs uppercase tracking-tight">
                  Already a member?{' '}
                  <Link
                    state={location.state}
                    className="text-red-600 hover:text-slate-900 underline underline-offset-4 transition-colors font-black ml-1"
                    to="/login"
                  >
                    Secure Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
