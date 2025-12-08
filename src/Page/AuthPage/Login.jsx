import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const Login = () => {

  const [icon, setIcon] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handlelLogin = (data) => {
    console.log(data)
  }

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl my-[60px] mx-auto">
        <div className="mt-3 text-center p-2">
          <h1 className="text-2xl font-bold mb-3">Login to your Account!</h1>

          <span className="subtitle">
            Get started with our app, just create an account and enjoy the
            experience.
          </span>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(handlelLogin)}>
            <fieldset className="fieldset">
              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input"
                placeholder="Email"
              />
              {/* password */};<label className="label">Password</label>
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
              <button className="btn btn-info btn-outline mt-4">Login</button>
            </fieldset>
          </form>
          <p>
            Do not have an account{' '}
            <Link className="text-blue-600 font-bold underline" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;