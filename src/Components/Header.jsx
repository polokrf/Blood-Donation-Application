import React from 'react';
import { Link } from 'react-router';
import useAuth from '../Hook/useAuth';
import { toast } from 'react-toastify';

const Header = () => {

  const { user, logOut } = useAuth();
  
  const navbare = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/blood-donation">Blood-Donation</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    </>
  );

  const handleOUt = () => {
    logOut().then(res => {
      toast.success('successful')
    }).catch(err => {
      toast.error(err.message)
    })
  }
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
             {navbare} 
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navbare}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <Link onClick={handleOUt} className="btn btn-success btn-outline">LogOut</Link>
          ) : (
            <Link className="btn btn-success btn-outline" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;