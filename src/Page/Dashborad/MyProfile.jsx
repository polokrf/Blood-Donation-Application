import React, { useState } from 'react';
import useAuth from '../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hook/useAxios';
import { useForm } from 'react-hook-form';

const MyProfile = () => {
  const { user } = useAuth();
  const instance = useAxios();
  const [state, setState] = useState(true);

  const {register,handleSubmit}=useForm()
  const { data } = useQuery({
    queryKey: ['my-profile', user?.email],
    queryFn: async () => {
      const res = await instance.get(`/my-profile-data?email=${user?.email}`);
      return res.data
    }
  })

  const handleUpdateUserInfo = (data) => {
    instance.patch(``, data)
      .then(res => {
        console.log(res.data)
        setState(true);
      }).catch(err => {
      console.log(err)
    })
   
   
  }
  
  return (
    <div>
      <h3>wellCome to the page</h3>
      {state && (
        <button
          type="button"
          onClick={() => setState(false)}
          className="btn btn-neutral mt-4"
        >
          Edit
        </button>
      )}

      <form onSubmit={handleSubmit(handleUpdateUserInfo)}>
        {state || <button className="btn btn-neutral mt-4">Save</button>}

        <label className="label">Email</label>
        <input
          type="email"
          defaultValue={data?.email}
          readOnly
          className="input"
          placeholder="Email"
        />
        <label className="label">Name</label>
        <input
          type="text"
          readOnly={state}
          defaultValue={data?.name}
          {...register('name',{required:true})}
          className="input"
          placeholder="name"
        />
      </form>
    </div>
  );
};

export default MyProfile;