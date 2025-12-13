import { useQuery } from '@tanstack/react-query';
import React, { use, useState } from 'react';
import useAxios from '../../Hook/useAxios';
import { useLoaderData } from 'react-router';
import { useForm, useWatch } from 'react-hook-form';
import SearchDonor from './SearchDonor';

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
 
 

  const { data: searchValue=[] } = useQuery({
    queryKey: ['search-page', blood, districts, upazila,  role],
    queryFn: async () => {
      const res = await instance.get(`/search?blood_group=${blood}&&district=${districts}&&upazaila=${upazila}&&role=${role}`
      );
      return res.data;
    },
  });

  console.log(searchValue)
  return (
    <div className="   p-2 linerBg  min-h-screen">
      <div className="text-center mb-[45px]">
        <h1 className="text-red-950 font-bold md:text-3xl text-2xl  capitalize mb-3">
          Find Blood Donors Near You
        </h1>
        <p className="text-red-600">
          You can search for donors based on district, upazila, and blood group
          according to your needs
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleSearch)}
        className=" md:max-w-[700px] mx-auto  w-full card-body shadow  bg-base-100 "
      >
        <div className="grid grid-cols-2  gap-3 w-full">
          <div>
            <label className=" block mb-2">Blood Group</label>
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
          </div>

          <div>
            {/*district */}
            <label className=" block mb-2">District </label>
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
          </div>

          <div className=" col-span-2">
            {/* upazila  */}
            <label className=" block mb-2">Upazila</label>
            <div className="flex  ">
              <select {...register('upazaila')} className="select mr-2">
                <option selected> select Upazila</option>
                {filterUpazaila.map(upa => (
                  <option key={upa.id} value={upa.name}>
                    {upa?.name}
                  </option>
                ))}
              </select>
              <div>
                <button className="btn btn-secondary text-white ">
                  search
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* find donor */}
      <section className="md:max-w-[1100px] w-full mx-auto ">
        {searchValue.length === 0 || (
          <div className="my-[35px] text-center">
            <h1 className="text-red-950 font-bold md:text-3xl text-2xl capitalize mb-3">
              Available Donors
            </h1>
          </div>
        )}
        <div className="grid  grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2  justify-center items-center gap-3 pb-4 ">
          {searchValue.map(donor => (
            <SearchDonor key={donor?._id} donor={donor}></SearchDonor>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;