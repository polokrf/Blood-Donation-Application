import React, { use } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import useAuth from '../../Hook/useAuth';
import useAxios from '../../Hook/useAxios';
import { toast } from 'react-toastify';

const upazilaPromise = fetch('/upazaila.json').then(res=> res.json())

const CreateDonation = () => {
  const districtData = useLoaderData();
  const upazilaData = use(upazilaPromise);
  const { user } = useAuth();
  const instance = useAxios();
  const navigate = useNavigate()
 
  const singleDistrictName = districtData.map(d => d.name);
   const {
     register,
     handleSubmit,
     control,
    reset,
     formState: { errors },
  } = useForm();
  
  const district = useWatch({ control, name: 'recipient_district' });
  
  const findSingleDistrict = districtData.find(sD => sD.name === district);

  const filterUpazila = upazilaData.filter(u => u.district_id === findSingleDistrict?.id);

  // donation request 

  const handleDonation = (data) => {
    instance.post('/blood-donation', data).then(res => {
      console.log(res)
      if (res?.data?.insertedId) {
        toast.success('successful');
        
        // reset()
      }
      if (res?.data?.message) {
        toast.error(res.data.message);
        navigate('/')
        
      }
      
    }).catch(err => {
      console.log(err)
    })
  }
 
  return (
    <div className=" my-[60px] p-2">
      <div className="text-center ">
        <h1 className='titles capitalize mb-2'>Create a Blood Donation Request</h1>
        <p >
          Fill out the form below to request blood for a recipient. Make sure
          all details are accurate so donors can respond quickly.
        </p>
      </div>
      <div className="md:max-w-[580px] bg-base-100 w-full mx-auto p-3 shadow-sm my-[60px] rounded-xl ">
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
                defaultValue={user?.displayName}
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
                defaultValue={user?.email}
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
              {...register('recipient_name', { required: true })}
              placeholder="Recipient Name"
            />
          </div>

          {/* recipient district*/}
          <div className="formFil">
            <div className="fieldset ">
              <label className="label">Recipient District</label>
              <select
                defaultValue="Pick a color"
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
                defaultValue="Pick a upazila"
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
                {...register('full_address', { required: true })}
                placeholder="Full Address"
              />
            </div>
          </div>

          {/* blood group */}
          <div className="fieldset ">
            <label className="label">Blood Group</label>
            <select
              defaultValue="Pick a Blood group"
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
                {...register('donation_date', { required: true })}
                className="input inputW"
              />
            </div>
            {/* donation time*/}
            <div className="fieldset ">
              <label className="label">Donation Time</label>
              <input
                type="time"
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
              {...register('message', { required: true })}
              className="textarea w-full "
              placeholder="request message"
            ></textarea>
          </div>

          <div>
            <button className="btn btn-secondary btn-outline w-full mt-4">
              Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDonation;

