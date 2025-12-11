import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../Hook/useAuth';
import { toast } from 'react-toastify';

const Header = () => {

  const { user, logOut } = useAuth();
  
  const navbare = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/blood-donation">Blood-Donation</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard/founding">Funding</NavLink>
        </li>
      )}
      
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
          <img
            src="https://i.ibb.co.com/9kq6CXHW/icons8-blood-donation-64-1.png"
            className="lg:mr-4"
            alt=""
          ></img>
          <div className=" hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navbare}</ul>
          </div>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div>
                <img
                  src={user?.photoURL}
                  alt=""
                  tabIndex={0}
                  className="w-[50px] rounded-full"
                />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li className="mb-3">
                  <NavLink className="btn " to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <Link
                    onClick={handleOUt}
                    className="btn btn-success btn-outline"
                  >
                    {' '}
                    LogOut
                  </Link>
                </li>
              </ul>
            </div>
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