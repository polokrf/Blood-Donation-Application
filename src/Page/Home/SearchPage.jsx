import { useQuery } from '@tanstack/react-query';
import React, { use, useState } from 'react';
import useAxios from '../../Hook/useAxios';
import { useLoaderData } from 'react-router';
import { useForm, useWatch } from 'react-hook-form';

const upazailaData = fetch('/upazaila.json').then(res => res.json());
const SearchPage = () => {
  const instance = useAxios();
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
    up => up.district_id === singleDistrict?.id
  );
  
  const [blood, setBlood] = useState();
  const [districts, setDistricts] = useState();
  const [upazila, setUpazila] = useState();
  const [role, setRole] = useState();

  const handleSearch = (data) => {
    if (data) {
     setBlood(data.blood_group);
     setUpazila(data.district);
     setDistricts(data.upazaila);
     setRole('Donor');
   }
    
   
    
  }
 
 

  const { data: searchValue } = useQuery({
    queryKey: ['search-page', blood, districts, upazila,  role],
    queryFn: async () => {
      const res = await instance.get(`/search?blood_group=${blood}&&district=${districts}&&upazaila=${upazila}&&role=${role}`
      );
      return res.data;
    },
  });

  console.log(searchValue)
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(handleSearch)} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Blood Group</label>
          <select
            {...register('blood_group')}
            defaultValue="select blood group"
            className="select"
          >
            <option selected>select group</option>
            <option value={'A+'}>A+</option>
            <option value={'A-'}>A-</option>
            <option value={'B+'}>B+</option>
            <option value={'B-'}>B-</option>
            <option value={'AB+'}>AB+</option>
            <option value={'AB-'}>AB-</option>
            <option value={'O+'}>O+</option>
            <option value={'O-'}>O-</option>
          </select>
          {/*district */}
          <label className="label">District </label>
          <select
            {...register('district', { required: true })}
            className="select"
          >
             <option selected> select District</option>
            {districtData.map(d => (
              <option key={d.id} value={d.name}>
                {d?.name}
              </option>
            ))}
          </select>
          {/* upazila  */}
          <label className="label">Upazila</label>
          <select
            {...register('upazaila')}
            className="select"
          >
              <option selected> select Upazila</option>
            {filterUpazaila.map(upa => (
              <option key={upa.id} value={upa.name}>
                {upa?.name}
              </option>
            ))}
          </select>
          <button className="btn btn-info text-white mt-4">search</button>
        </fieldset>
      </form>
    </div>
  );
};

export default SearchPage;