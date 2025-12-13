import React, { use } from 'react';
import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router';
import useAuth from '../../Hook/useAuth';
import useAxios from '../../Hook/useAxios';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

const upazilaPromise = fetch('/upazaila.json').then(res => res.json());

const EditPage = () => {
  
  const {id} =useParams()
  const districtData = useLoaderData()
  const upazilaData = use(upazilaPromise);

  const instance = useAxios();
  const navigate = useNavigate()

  const location = useLocation();
  
  
 
 
  const singleDistrictName = districtData.map(d => d.name);
   const {
     register,
     handleSubmit,
     control,
    
     
  } = useForm();
  
  const district = useWatch({ control, name: 'recipient_district' });
  
  const findSingleDistrict = districtData.find(sD => sD.name === district);

  const filterUpazila = upazilaData.filter(u => u.district_id === findSingleDistrict?.id);

  // donation request

  const { data:edit={} } = useQuery({
    queryKey: ['edit', id],
    queryFn: async () => {
      const res = await instance.get(`/one-donationInfo/${id}`);
      return res.data
    }
  })
 

  const handleDonation = (data) => {
    instance.patch(`/update-data/${edit._id}`, data)
      .then(res => {
        
        if (res.data?.modifiedCount) {
          toast.success('successful');
          navigate(location.state);
        } 
         
        
    }).catch(err => {
        console.log(err);
      });
  }
 
  return (
    <div className='py-[60px] px-2'>
      <div className='text-center my-10'>
        <h1 className='text-2xl text-red-950 font-bold  capitalize mb-2'>Edit Donation Request</h1>
        <p className=' text-red-800'>
          Update your blood donation request details and save changes by
          clicking the Update button.
        </p>
      </div>
      <div className="md:max-w-[580px] w-full mx-auto p-3 shadow-sm my-[60px] ">
        <form
          onSubmit={handleSubmit(handleDonation)}
          className="fieldset bg-gray-100 p-3"
        >
          {/* Requester Name */}
          <div className="formFil">
            <div className="fieldset ">
              <label className="label ">Requester Name</label>
              <input
                type="text"
                className="input inputW"
                defaultValue={edit?.requester_name}
                readOnly
                {...register('requester_name', { required: true })}
                placeholder="Requester Name"
              />
            </div>
            {/* requester email */}
            <div className="fieldset ">
              <label className="label">Requester Email</label>
              <input
                type="Email"
                className="input inputW"
                defaultValue={edit?.requester_email}
                readOnly
                {...register('requester_email', { required: true })}
                placeholder="requester email"
              />
            </div>
          </div>

          {/* recipient name*/}
          <div className="fieldset ">
            <label className="label">Recipient Name</label>
            <input
              type="text"
              className="input inputW"
              defaultValue={edit?.recipient_name}
              {...register('recipient_name', { required: true })}
              placeholder="Recipient Name"
            />
          </div>

          {/* recipient district*/}
          <div className="formFil">
            <div className="fieldset ">
              <label className="label">Recipient District</label>
              <select
                defaultValue={edit.recipient_district}
                {...register('recipient_district', { required: true })}
                className="select w-full"
              >
                <option disabled={true}>Pick a district</option>
                {singleDistrictName.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            {/* recipient upazila */}
            <div className="fieldset ">
              <label className="label">Recipient Upazila </label>
              <select
                defaultValue={edit?.recipient_upazila}
                {...register('recipient_upazila', { required: true })}
                className="select w-full"
              >
                <option disabled={true}>Pick a Upazila</option>
                {filterUpazila.map(u => (
                  <option key={u?.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* hospital name*/}
          <div className="formFil">
            <div className="fieldset ">
              <label className="label">Hospital Name</label>
              <input
                type="text"
                className="input inputW"
                defaultValue={edit?.hospital_name}
                {...register('hospital_name', { required: true })}
                placeholder="Hospital Name"
              />
            </div>
            {/* full address*/}
            <div className="fieldset ">
              <label className="label">Full Address</label>
              <input
                type="text"
                className="input inputW"
                defaultValue={edit.full_address}
                {...register('full_address', { required: true })}
                placeholder="Full Address"
              />
            </div>
          </div>

          {/* blood group */}
          <div className="fieldset ">
            <label className="label">Blood Group</label>
            <select
              defaultValue={edit?.blood_group}
              {...register('blood_group', { required: true })}
              className="select w-full"
            >
              <option disabled={true}>Pick a Blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          {/* donation date */}
          <div className="formFil">
            <div className="fieldset ">
              <label className="label">Donation Date</label>
              <input
                type="date"
                defaultValue={edit?.donation_date}
                {...register('donation_date', { required: true })}
                className="input inputW"
              />
            </div>
            {/* donation time*/}
            <div className="fieldset ">
              <label className="label">Donation Time</label>
              <input
                type="time"
                defaultValue={edit?.donation_time}
                {...register('donation_time', { required: true })}
                className="input inputW"
              />
            </div>
          </div>

          {/* request message */}

          <div>
            <textarea
              name=""
              rows="5"
              cols="4"
              defaultValue={edit?.message}
              {...register('message', { required: true })}
              className="textarea w-full "
              placeholder="request message"
            ></textarea>
          </div>

          <div>
            <button className="btn btn-secondary btn-outline w-full mt-4">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;