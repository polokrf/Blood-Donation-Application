import React, { use, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hook/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';
const upazailaData = fetch('/upazaila.json').then(res => res.json());
const Register = () => {
  const [icon, setIcon] = useState(false);
  const [icon2, setIcon2] = useState(false);
  const { registerUser, updateUser,setUser } = useAuth();
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
    up => up.district_id === singleDistrict?.id
  );

  const handelForm = data => {
    if (data.password !== data.confirm_pas) {
      return toast.error('Do not match password');
    }

    const photo = data.photo[0];
    registerUser(data.email, data.password)
      .then(resUser => {
        const formdata = new FormData();
        formdata.append('image', photo);
        const phot_url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_imag_key
        }`;

        axios.post(phot_url, formdata)
          .then(res => {
            const userInfo = {
              name: data.name,
              email: data.email,
              photo: res.data.data.url,
              district: data.district,
              upazaila: data.upazaila,
              blood_group: data.blood_group,
            };

            axios.post(
                'https://blood-donation-server-rho.vercel.app/user',
                userInfo
              )
              .then(res => {})
              .catch(err => {
                console.log(err);
              });

            const personInfo = {
              displayName: data.name,
              photoURL: res.data.data.url,
            };
            setUser({...resUser,...personInfo})

            updateUser(personInfo)
              .then(() => {})
              .catch(error => {
                toast.error(error.message);
              });
          })
          .catch(err => {
            console.log(err);
          });

        navigate(location.state || '/');
        toast.success('successful');
      })
      .catch(err => toast.error(err.message));
  };
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
                {districtData.map(d => (
                  <option key={d.id} value={d.name}>
                    {d?.name}
                  </option>
                ))}
              </select>
              {/* upazila  */}
              <label className="label">Upazila</label>
              <select
                {...register('upazaila', { required: true })}
                className="select"
              >
                {filterUpazaila.map(upa => (
                  <option key={upa.id} value={upa.name}>
                    {upa?.name}
                  </option>
                ))}
              </select>
              {/* password */}
              <label className="label">Password</label>
              <div className=" relative">
                <input
                  type={icon ? 'text' : 'password'}
                  className="input"
                  {...register('password', { required: true, minLength: 6 })}
                  placeholder="Password"
                />
                {errors.password?.type === 'minLength' && (
                  <p className="text-red-500">Password length 6</p>
                )}
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
                  {...register('confirm_pas', { required: true, min: 6 })}
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

              <button className="btn btn-info btn-outline mt-4">
                Register
              </button>
            </fieldset>
          </form>
          <p>
            already have an account{' '}
            <Link
              state={location.state}
              className="text-blue-600 font-bold underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
