// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router';
// import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
// import { useForm } from 'react-hook-form';
// import useAuth from '../../Hook/useAuth';
// import { toast } from 'react-toastify';
// import { useLocation } from 'react-router';
// import GoogleBtn from './GoogleBtn';

// const Login = () => {

//   const [icon, setIcon] = useState(false);
//   const { login } = useAuth()
//   const location = useLocation()
//   const navigate = useNavigate()
//   const [demoEmail, setDemoEmail] = useState('');
//   const [demoPass,setDemoPass]=useState('')

//   const handlelLogin = (e) => {
//     e.preventDefault()
//     const email = e.target.email.value
//     const password = e.target.password.value

//     login(email,password).then(res => {
//       toast.success('successful');
//       navigate(location.state || '/')

//     }).catch(err => {
//       toast.error(err.message)
//     })
//   }

//   const handleAdmin = () => {
//     setDemoEmail('ripon30@gmail.com');
//     setDemoPass('ripon@44');
//   }
//   const handleUser = () => {
//     setDemoEmail('polokkumar9030@gmail.com');
//     setDemoPass('123456')
//   }
//   return (
//     <div>
//       <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl my-[60px] mx-auto">
//         <div className="mt-3 text-center p-2">
//           <h1 className="text-2xl font-bold mb-3">Login to your Account!</h1>

//           <span className="subtitle">
//             Get started with our app, just create an account and enjoy the
//             experience.
//           </span>

//           <div className=" space-x-2 my-3">
//             <button onClick={handleAdmin} className="btn btn-xs btn-secondary">
//               Admin
//             </button>
//             <button onClick={handleUser} className="btn btn-xs btn-secondary">
//               user
//             </button>
//           </div>
//         </div>
//         <div className="card-body">
//           <form onSubmit={handlelLogin}>
//             <fieldset className="fieldset">
//               {/* email */}
//               <label className="label">Email</label>
//               <input
//                 type="email"
//                 value={demoEmail}
//                 onChange={e => setDemoEmail(e.target.value)}
//                name='email'
//                 className="input"
//                 required
//                 placeholder="Email"
//               />
//               {/* password */}<label className="label">Password</label>
//               <div className=" relative">
//                 <input
//                   type={icon ? 'text' : 'password'}
//                   className="input"
//                   required
//                   value={demoPass}
//                   onChange={e => setDemoPass(e.target.value)}
//                   name='password'
//                   minLength={6}
//                   placeholder="Password"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setIcon(!icon)}
//                   className="btn btn-xs absolute right-5 top-2 "
//                 >
//                   {icon ? <FaRegEye /> : <FaRegEyeSlash></FaRegEyeSlash>}
//                 </button>
//               </div>
//               <button className="btn btn-info btn-outline mt-4">Login</button>
//             </fieldset>
//           </form>

//           <GoogleBtn state={location.state}></GoogleBtn>
//           <p>
//             Do not have an account{' '}
//             <Link

//               className="text-blue-600 font-bold underline"
//               to="/register"
//             >
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaRegEye, FaRegEyeSlash, FaLock, FaEnvelope } from 'react-icons/fa';
import useAuth from '../../Hook/useAuth';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router';
import GoogleBtn from './GoogleBtn';

const Login = () => {
  const [icon, setIcon] = useState(false);
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [demoEmail, setDemoEmail] = useState('');
  const [demoPass, setDemoPass] = useState('');

  const handlelLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then(res => {
        toast.success('Access Granted');
        navigate(location.state || '/');
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  const handleAdmin = () => {
    setDemoEmail('ripon30@gmail.com');
    setDemoPass('ripon@44');
  };

  const handleUser = () => {
    setDemoEmail('polokkumar9030@gmail.com');
    setDemoPass('123456');
  };

  return (
    <div className="  flex items-center justify-center   relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-900/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

      <div className="w-full max-w-md relative " data-aos="zoom-in">
        <div className=" rounded-[2.5rem]  shadow-sm border border-slate-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-[#0F172A] p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <h1 className="text-white font-black text-3xl uppercase tracking-tighter relative z-10">
              Welcome <span className="text-red-500 italic">Back</span>
            </h1>
            <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold opacity-80">
              Secure Access Authorization
            </p>
          </div>

          <div className="p-8 md:p-10">
            {/* Demo Credentials Toggles */}
            <div className="flex items-center justify-between mb-8 bg-slate-50 p-2 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase ml-3 tracking-widest">
                Quick Fill:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleAdmin}
                  className="px-4 py-1.5 bg-white hover:bg-red-600 hover:text-white text-slate-900 text-[10px] font-black uppercase rounded-xl shadow-sm border border-slate-200 transition-all cursor-pointer"
                >
                  Admin
                </button>
                <button
                  onClick={handleUser}
                  className="px-4 py-1.5 bg-white hover:bg-red-600 hover:text-white text-slate-900 text-[10px] font-black uppercase rounded-xl shadow-sm border border-slate-200 transition-all cursor-pointer"
                >
                  User
                </button>
              </div>
            </div>

            <form onSubmit={handlelLogin} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center text-slate-400 group-focus-within:text-red-600 transition-colors">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    value={demoEmail}
                    onChange={e => setDemoEmail(e.target.value)}
                    name="email"
                    className="w-full bg-slate-50 border-2 border-slate-50 focus:border-red-600 focus:bg-white rounded-2xl py-4 pl-12 pr-6 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                    required
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Secret Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center text-slate-400 group-focus-within:text-red-600 transition-colors">
                    <FaLock />
                  </div>
                  <input
                    type={icon ? 'text' : 'password'}
                    className="w-full bg-slate-50 border-2 border-slate-50 focus:border-red-600 focus:bg-white rounded-2xl py-4 pl-12 pr-14 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                    required
                    value={demoPass}
                    onChange={e => setDemoPass(e.target.value)}
                    name="password"
                    minLength={6}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setIcon(!icon)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer text-slate-400"
                  >
                    {icon ? (
                      <FaRegEye size={18} />
                    ) : (
                      <FaRegEyeSlash size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button className="w-full bg-red-600 hover:bg-[#0F172A] text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all duration-500 shadow-xl shadow-red-100 hover:shadow-slate-200 cursor-pointer text-xs mt-4 group">
                Login Now
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                <span className="bg-white px-4 text-slate-300">
                  Social Connect
                </span>
              </div>
            </div>

            <GoogleBtn state={location.state}></GoogleBtn>

            <div className="mt-8 text-center">
              <p className="text-slate-400 font-bold text-xs">
                New to the platform?{' '}
                <Link
                  className="text-red-600 hover:text-[#0F172A] font-black underline underline-offset-4 transition-colors uppercase tracking-tighter"
                  to="/register"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;