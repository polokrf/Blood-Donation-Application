import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hook/useAuth';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router';
import GoogleBtn from './GoogleBtn';


const Login = () => {

  const [icon, setIcon] = useState(false);
  const { login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate() 
  const [demoEmail, setDemoEmail] = useState('');
  const [demoPass,setDemoPass]=useState('')

  
  const handlelLogin = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    
    login(email,password).then(res => {
      toast.success('successful');
      navigate(location.state || '/')

    }).catch(err => {
      toast.error(err.message)
    })
  }

  const handleAdmin = () => {
    setDemoEmail('ripon30@gmail.com');
    setDemoPass('ripon@44');
  }
  const handleUser = () => {
    setDemoEmail('polokkumar9030@gmail.com');
    setDemoPass('123456')
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

          <div className=" space-x-2 my-3">
            <button onClick={handleAdmin} className="btn btn-xs btn-secondary">
              Admin
            </button>
            <button onClick={handleUser} className="btn btn-xs btn-secondary">
              user
            </button>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handlelLogin}>
            <fieldset className="fieldset">
              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                value={demoEmail}
                onChange={e => setDemoEmail(e.target.value)}
               name='email'
                className="input"
                required
                placeholder="Email"
              />
              {/* password */}<label className="label">Password</label>
              <div className=" relative">
                <input
                  type={icon ? 'text' : 'password'}
                  className="input"
                  required
                  value={demoPass}
                  onChange={e => setDemoPass(e.target.value)}
                  name='password'
                  minLength={6}
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

          <GoogleBtn state={location.state}></GoogleBtn>
          <p>
            Do not have an account{' '}
            <Link
              state={location.state}
              className="text-blue-600 font-bold underline"
              to="/register"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;