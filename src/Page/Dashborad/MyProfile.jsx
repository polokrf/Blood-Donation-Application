import React, { useState } from 'react';
import useAuth from '../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hook/useAxios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const MyProfile = () => {
  const { user, updateUser } = useAuth();
  const instance = useAxios();
  const [state, setState] = useState(true);

  const {register,handleSubmit}=useForm()
  const { data:myProfile={} } = useQuery({
    queryKey: ['my-profile', user?.email],
    queryFn: async () => {
      const res = await instance.get(`/my-profile-data?email=${user?.email}`);
      return res.data
    }
  })
  

  const handleUpdateUserInfo = (data) => {
    const blood_group = data.blood_group?.toUpperCase();
   
    
    const personInfo = {
      displayName: data.name,
      photoURL: data.photo
    };
    instance
      .patch(`/user-update-profile/${myProfile._id}`, { ...data ,blood_group})
      .then(res => {
        updateUser(personInfo)
          .then(() => {
           
            
          })
          .catch(err => {
            console.log(err);
          });
          
        setState(true);
         toast.success('successful')
       
      })
      .catch(err => {
        console.log(err);
      });
    
   
   
  }

  const handelEdite = (e) => {
    e.preventDefault();
    setState(false)
  }
  
  return (
    <div className="my-[60px] px-2 ">
      <div className="text-center my-[45px]">
        <h3 className="text-2xl text-green-700 font-bold">My Profile</h3>
      </div>

      <form
        onSubmit={handleSubmit(handleUpdateUserInfo)}
        className="md:max-w-[400px] w-full mx-auto"
      >
        <div className=" bg-blue-50 shadow p-3">
          {state && (
            <button
              type="button"
              onClick={handelEdite}
              className="btn  mt-4 btn-info text-white mb-2"
            >
              Edit
            </button>
          )}
          {state || (
            <button className="btn btn-info text-white my-4 ">Save</button>
          )}

          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              defaultValue={myProfile?.email}
              readOnly
              className="input w-full"
              placeholder="Email"
            />
            {/* name */}
            <label className="label">Name</label>
            <input
              type="text"
              readOnly={state}
              defaultValue={myProfile?.name}
              {...register('name', { required: true })}
              className="input w-full"
              placeholder="name"
            />
            {/* photo */}
            <label className="label">PhotoULR</label>
            <input
              type="text"
              readOnly={state}
              defaultValue={myProfile?.photo}
              {...register('photo', { required: true })}
              className="input w-full"
              placeholder="photoURL"
            />
            {/* blood group*/}
            <label className="label">Blood Group</label>
            <input
              type="text"
              readOnly={state}
              defaultValue={myProfile?.blood_group}
              {...register('blood_group', { required: true })}
              className="input w-full"
              placeholder="Blood Group"
            />
            {/* district */}
            <label className="label">District</label>
            <input
              type="text"
              readOnly={state}
              defaultValue={myProfile?.district}
              {...register('district', { required: true })}
              className="input w-full"
              placeholder="District"
            />
            {/* upazaila */}
            <label className="label">upazila</label>
            <input
              type="text"
              readOnly={state}
              defaultValue={myProfile?.upazaila}
              {...register('upazaila', { required: true })}
              className="input w-full"
              placeholder="Upazila"
            />
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;