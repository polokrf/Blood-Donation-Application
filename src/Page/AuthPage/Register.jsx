import React, { use, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router';
const upazailaData = fetch('/upazaila.json').then(res => res.json())
const Register = () => {
    const [icon,setIcon]=useState(false)
  const [icon2, setIcon2] = useState(false);

  const districtData = useLoaderData();
  const upazailacovert = use(upazailaData);
 
  const {
    register,
    handleSubmit,
   control,
    formState: { errors },
  } = useForm();

  const district = useWatch({control, name: 'district' });
  
  const singleDistrict = districtData.find(dis => dis.name === district);
  
  const filterUpazaila = upazailacovert.filter(up => up.district_id === singleDistrict?.id);
  console.log(filterUpazaila)

  const handelForm = (data) => {
    console.log(data)
  }
 return (
   <div>
     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl my-[60px] mx-auto">
       <div className="mt-3 text-center p-2">
         <h1 className="text-2xl font-bold mb-3">Register your Account!</h1>

         <span className="subtitle">
           Get started with our app, just create an account and enjoy the
           experience.
         </span>
       </div>
       <div className="card-body">
         <form onSubmit={handleSubmit(handelForm)}>
           <fieldset className="fieldset">
             {/* email */}
             <label className="label">Email</label>
             <input
               type="email"
               {...register('email', { required: true })}
               className="input"
               placeholder="Email"
             />
             {/* Name */}
             <label className="label">Name</label>
             <input
               type="text"
               {...register('name', { required: true })}
               className="input"
               placeholder="Name"
             />
             {/* avatar */}
             <label className="label">Avatar</label>
             <input
               type="file"
               {...register('photo', { required: true })}
               className="file-input"
             />
             {/* blood group */}
             <label className="label">Blood Group </label>
             <select
               {...register('blood_group', { required: true })}
               defaultValue="select blood group"
               className="select"
             >
               <option disabled={true}>select group</option>
               <option>A+</option>
               <option>A-</option>
               <option>B+</option>
               <option>B-</option>
               <option>AB+</option>
               <option>AB-</option>
               <option>O+</option>
               <option>O-</option>
             </select>
             {/*district */}
             <label className="label">District </label>
             <select
               
               {...register('district', { required: true })}
               className="select"
             >
               <option selected disabled>
                 select district
               </option>
               {districtData.map(d => (
                 <option key={d.id}>{d?.name}</option>
               ))}
             </select>
             {/* upazila  */}
             <label className="label">Upazila</label>
             <select
               {...register('upazaila', { required: true })}
               className="select"
             >
               <option selected disabled>
                 select upazaila
               </option>
               {filterUpazaila.map(upa => (
                 <option key={upa.id}>{upa?.name}</option>
               ))}
             </select>
             {/* password */}
             <label className="label">Password</label>
             <div className=" relative">
               <input
                 type={icon ? 'text' : 'password'}
                 className="input"
                 {...register('password', { required: true })}
                 placeholder="Password"
               />

               <button
                 type="button"
                 onClick={() => setIcon(!icon)}
                 className="btn btn-xs absolute right-5 top-2 "
               >
                 {icon ? <FaRegEye /> : <FaRegEyeSlash></FaRegEyeSlash>}
               </button>
             </div>
             {/* confirm password */}
             <label className="label">Confirm Password</label>
             <div className=" relative">
               <input
                 type={icon2 ? 'text' : 'password'}
                 className="input"
                 {...register('confirm-pas', { required: true })}
                 placeholder="Password"
               />

               <button
                 type="button"
                 onClick={() => setIcon2(!icon2)}
                 className="btn btn-xs absolute right-5 top-2 "
               >
                 {icon2 ? <FaRegEye /> : <FaRegEyeSlash></FaRegEyeSlash>}
               </button>
             </div>

             <button className="btn btn-info btn-outline mt-4">Register</button>
           </fieldset>
         </form>
         <p>
           already have an account{' '}
           <Link className="text-blue-600 font-bold underline" to="/login">
             Login
           </Link>
         </p>
       </div>
     </div>
   </div>
 );

  
};

export default Register;