

import React from 'react';

import useAuth from '../Hook/useAuth';
import { toast } from 'react-toastify';
import { AiOutlineHome } from 'react-icons/ai';
import {
  MdOutlineBloodtype,
  MdOutlineDashboardCustomize,
} from 'react-icons/md';
import { RiHandHeartLine, RiLogoutBoxRLine } from 'react-icons/ri';
import { HiMenuAlt3 } from 'react-icons/hi';
import { BiDonateHeart } from 'react-icons/bi';
import { Link, NavLink } from 'react-router';
import { FcAbout } from 'react-icons/fc';
import { FcProcess } from 'react-icons/fc';
import { MdConnectWithoutContact } from 'react-icons/md';
import { IoHelpCircle } from 'react-icons/io5';

const Header = () => {
  const { user, logOut } = useAuth();

  const handleOut = () => {
    logOut()
      .then(() => toast.success('Logout Successful'))
      .catch(err => toast.error(err.message));
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-red-500 text-white font-bold shadow-md' : 'text-gray-700 hover:bg-red-50 hover:text-red-500'}`
          }
        >
          <AiOutlineHome className="text-xl" />
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blood-donation"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-red-500 text-white font-bold shadow-md' : 'text-gray-700 hover:bg-red-50 hover:text-red-500'}`
          }
        >
          <MdOutlineBloodtype className="text-xl" />
          <span>Donation</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/faq"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-red-500 text-white font-bold shadow-md' : 'text-gray-700 hover:bg-red-50 hover:text-red-500'}`
          }
        >
          <IoHelpCircle className="text-xl" />
          
          <span>FAQs</span>
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard/founding"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-red-500 text-white font-bold shadow-md' : 'text-gray-700 hover:bg-red-50 hover:text-red-500'}`
            }
          >
            <BiDonateHeart className="text-xl" />
            <span>Funding</span>
          </NavLink>
        </li>
      )}

      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-red-500 text-white font-bold shadow-md' : 'text-gray-700 hover:bg-red-50 hover:text-red-500'}`
          }
        >
          <FcAbout className=" text-xl" style={{ color: 'black' }} />
          <span>About</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/process"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-red-500 text-white font-bold shadow-md' : 'text-gray-700 hover:bg-red-50 hover:text-red-500'}`
          }
        >
          <FcProcess className=" text-xl " style={{ color: 'black' }} />
          <span>Process</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="w-full bg-white sticky top-0 z-50 border-b-2 border-red-50">
      <div className="navbar md:max-w-[1300px] w-full mx-auto px-4 py-3">
        {/* Mobile Menu & Logo */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-red-500 p-0 mr-2"
            >
              <HiMenuAlt3 className="text-3xl" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-white border border-red-100 rounded-2xl w-64 gap-2"
            >
              {navItems}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-red-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <MdOutlineBloodtype className="text-white text-2xl" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-gray-800">
              BLOOD<span className="text-red-500">LIFE</span>
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0 gap-2 font-medium">
            {navItems}
          </ul>
        </div>

        {/* User Profile / Login */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="ring-2 ring-red-500 ring-offset-2 rounded-full hover:scale-105 transition-transform"
              >
                <img
                  src={
                    user?.photoURL ||
                    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                  }
                  alt="Profile"
                  className="w-10 h-10 object-cover rounded-full"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-4 shadow-2xl bg-white border border-red-100 rounded-2xl z-[1] w-60 mt-4 gap-3"
              >
                <div className="px-2 py-1 mb-1">
                  <p className="text-xs text-gray-400">Welcome,</p>
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {user?.displayName}
                  </p>
                </div>
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold rounded-xl transition-all"
                  >
                    <MdOutlineDashboardCustomize className="text-xl" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleOut}
                    className="flex items-center justify-center gap-2 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-lg shadow-red-100 transition-all"
                  >
                    <RiLogoutBoxRLine className="text-xl" />
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              className="btn bg-red-500 hover:bg-red-600 text-white border-none px-8 rounded-xl font-bold shadow-lg shadow-red-100 transition-all active:scale-95"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;