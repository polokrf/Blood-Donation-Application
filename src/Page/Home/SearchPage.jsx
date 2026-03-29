// import { useQuery } from '@tanstack/react-query';
// import React, { use, useState } from 'react';
// import useAxios from '../../Hook/useAxios';
// import { useLoaderData } from 'react-router';
// import { useForm, useWatch } from 'react-hook-form';
// import SearchDonor from './SearchDonor';
// import Loader from '../../LodingAndErrorPage/Loader';
// import { FaUsersSlash } from 'react-icons/fa';

// const upazailaData = fetch('/upazaila.json').then(res => res.json());
// const SearchPage = () => {
//   const instance = useAxios();
//   const districtData = useLoaderData();
//   const upazailacovert = use(upazailaData);

//   const {
//     register,
//     handleSubmit,
//     control,

//   } = useForm();

//   const district = useWatch({ control, name: 'district' });

//   const singleDistrict = districtData.find(dis => dis.name === district);

//   const filterUpazaila = upazailacovert.filter(
//     up => up.district_id === singleDistrict?.id
//   );

//   const [blood, setBlood] = useState();
//   const [districts, setDistricts] = useState();
//   const [upazila, setUpazila] = useState();

//   const handleSearch = (data) => {
//     if (data) {
//      setBlood(data.blood_group);
//      setUpazila(data.upazaila);
//      setDistricts(data.district);

//    }

//   }

//   const { data: searchValue=[],isLoading } = useQuery({
//     queryKey: ['search-page', blood, districts, upazila],
//     enabled:!!blood || !!districts || !!upazila,
//     queryFn: async () => {
//       const res = await instance.get(`/search?blood_group=${blood}&district=${districts}&upazaila=${upazila}`
//       );
//      return res.data || []
//     },
//   });

//   return (
//     <div className="   p-2   min-h-screen">
//       <div className="text-center mb-[45px]">
//         <h1 className="text-red-950 font-bold md:text-3xl text-2xl  capitalize mb-3">
//           Find Blood Donors Near You
//         </h1>
//         <p className="text-red-600">
//           You can search for donors based on district, upazila, and blood group
//           according to your needs
//         </p>
//       </div>
//       <form
//         onSubmit={handleSubmit(handleSearch)}
//         className=" md:max-w-[700px] mx-auto  w-full card-body shadow  bg-base-100 "
//       >
//         <div className="grid grid-cols-2  gap-3 w-full">
//           <div>
//             <label className=" block mb-2">Blood Group</label>
//             <select
//               {...register('blood_group')}
//               defaultValue="select blood group"
//               className="select"
//             >
//               <option value="">select group</option>
//               <option value={'A+'}>A+</option>
//               <option value={'A-'}>A-</option>
//               <option value={'B+'}>B+</option>
//               <option value={'B-'}>B-</option>
//               <option value={'AB+'}>AB+</option>
//               <option value={'AB-'}>AB-</option>
//               <option value={'O+'}>O+</option>
//               <option value={'O-'}>O-</option>
//             </select>
//           </div>

//           <div>
//             {/*district */}
//             <label className=" block mb-2">District </label>
//             <select
//               {...register('district', { required: true })}
//               className="select"
//             >
//               <option value=""> select District</option>
//               {districtData.map(d => (
//                 <option key={d.id} value={d.name}>
//                   {d?.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className=" col-span-2">
//             {/* upazila  */}
//             <label className=" block mb-2">Upazila</label>
//             <div className="flex  ">
//               <select {...register('upazaila')} className="select mr-2">
//                 <option value=""> select Upazila</option>
//                 {filterUpazaila.map(upa => (
//                   <option key={upa.id} value={upa.name}>
//                     {upa?.name}
//                   </option>
//                 ))}
//               </select>
//               <div>
//                 <button className="btn btn-secondary text-white ">
//                   search
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//       {/* find donor */}
//       <section className="md:max-w-[1100px] w-full mx-auto ">
//         {searchValue.length === 0 || (
//           <div className="my-[35px] text-center">
//             <h1 className="text-red-950 font-bold md:text-3xl text-2xl capitalize mb-3">
//               Available Donors
//             </h1>
//           </div>
//         )}

//         {isLoading && <Loader></Loader>}

//         {searchValue.length === 0 && !isLoading ? (
//           <div className=" text-center my-45">
//             <h1 className=" text-red-700 font-bold text-3xl ">
//               {' '}
//               <FaUsersSlash className=' mx-auto' />
//             </h1>
//           </div>
//         ) : (
//           <div className="grid  grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2  justify-center items-center gap-3 pb-4 mx-auto">
//             {searchValue.map(donor => (
//               <SearchDonor key={donor?._id} donor={donor}></SearchDonor>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default SearchPage;

import { useQuery } from '@tanstack/react-query';
import React, { use, useState } from 'react';
import useAxios from '../../Hook/useAxios';
import { useLoaderData } from 'react-router';
import { useForm, useWatch } from 'react-hook-form';
import SearchDonor from './SearchDonor';
import Loader from '../../LodingAndErrorPage/Loader';
import { FaUsersSlash, FaSearch, FaTint, FaMapMarkerAlt } from 'react-icons/fa';

const upazailaData = fetch('/upazaila.json').then(res => res.json());

const SearchPage = () => {
  const instance = useAxios();
  const districtData = useLoaderData();
  const upazailacovert = use(upazailaData);

  const { register, handleSubmit, control } = useForm();
  const district = useWatch({ control, name: 'district' });
  const singleDistrict = districtData.find(dis => dis.name === district);
  const filterUpazaila = upazailacovert.filter(
    up => up.district_id === singleDistrict?.id,
  );

  const [blood, setBlood] = useState();
  const [districts, setDistricts] = useState();
  const [upazila, setUpazila] = useState();

  const handleSearch = data => {
    if (data) {
      setBlood(data.blood_group);
      setUpazila(data.upazaila);
      setDistricts(data.district);
    }
  };

  const { data: searchValue = [], isLoading } = useQuery({
    queryKey: ['search-page', blood, districts, upazila],
    enabled: !!blood || !!districts || !!upazila,
    queryFn: async () => {
      const res = await instance.get(
        `/search?blood_group=${blood}&district=${districts}&upazaila=${upazila}`,
      );
      return res.data || [];
    },
  });

  return (
    <div className="bg-[#F8FAFC]  pb-20">
      {/* Header Section */}
      <div className="bg-[#0F172A]  pb-40 px-6 pt-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <FaTint className="text-[300px] absolute -top-10 -left-10 rotate-12" />
          <FaTint className="text-[200px] absolute top-20 -right-10 -rotate-12" />
        </div>

        <div className="relative  max-w-2xl mx-auto">
          <span className="bg-red-600 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full text-white">
            Live Database
          </span>
          <h1 className="text-white font-black md:text-5xl text-3xl uppercase tracking-tighter mt-6">
            Find <span className="text-red-600 italic">Blood</span> Donors
          </h1>
          <p className="text-slate-400 mt-4 font-medium max-w-md mx-auto">
            Search our verified database to find life-saving donors near your
            location instantly.
          </p>
        </div>
      </div>

      {/* Search Filter Card */}
      <div className="-mt-24 px-4">
        <form
          onSubmit={handleSubmit(handleSearch)}
          className="md:max-w-4xl mx-auto w-full bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] shadow-[0_50px_100px_rgba(15,23,42,0.15)] border border-white relative "
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* Blood Group */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <FaTint className="text-red-600" /> Blood Group
              </label>
              <select
                {...register('blood_group')}
                className="w-full bg-slate-50 border-2 border-slate-50 focus:border-red-600 focus:bg-white rounded-2xl py-4 px-4 outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer shadow-inner"
              >
                <option value="">All Groups</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-600" /> District
              </label>
              <select
                {...register('district', { required: true })}
                className="w-full bg-slate-50 border-2 border-slate-50 focus:border-red-600 focus:bg-white rounded-2xl py-4 px-4 outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer shadow-inner"
              >
                <option value="">Select District</option>
                {districtData.map(d => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila & Search Button */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-600" /> Upazila
              </label>
              <div className="flex gap-2">
                <select
                  {...register('upazaila')}
                  disabled={!district}
                  className="flex-1 bg-slate-50 border-2 border-slate-50 focus:border-red-600 focus:bg-white rounded-2xl py-4 px-4 outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer shadow-inner disabled:opacity-50"
                >
                  <option value="">Select Upazila</option>
                  {filterUpazaila.map(upa => (
                    <option key={upa.id} value={upa.name}>
                      {upa.name}
                    </option>
                  ))}
                </select>
                <button className="bg-red-600 hover:bg-[#0F172A] text-white p-5 rounded-2xl transition-all duration-500 shadow-lg shadow-red-200 cursor-pointer group">
                  <FaSearch className="group-hover:scale-125 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <section className="max-w-7xl w-full mx-auto px-6 mt-20">
        {searchValue.length > 0 && (
          <div className="mb-12 flex items-center gap-4">
            <h2 className="text-[#0F172A] font-black text-3xl uppercase tracking-tighter">
              Available <span className="text-red-600">Donors</span>
            </h2>
            <div className="h-[2px] flex-1 bg-slate-100"></div>
            <span className="text-slate-400 font-black text-xs uppercase tracking-widest">
              {searchValue.length} Found
            </span>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        )}

        {searchValue.length === 0 && !isLoading ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
              <FaUsersSlash size={40} />
            </div>
            <h3 className="text-slate-900 font-black text-2xl uppercase tracking-tighter">
              No Donors Found
            </h3>
            <p className="text-slate-400 font-medium mt-2">
              Try adjusting your filters to find donors in nearby areas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {searchValue.map(donor => (
              <div
                key={donor?._id}
                className="transform hover:-translate-y-2 transition-transform duration-500"
              >
                <SearchDonor donor={donor} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchPage;