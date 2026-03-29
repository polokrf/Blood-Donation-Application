// import React from 'react';
// import { FaHandHoldingHeart, FaUserCog } from 'react-icons/fa';
// import { FaUsersLine } from 'react-icons/fa6';
// import { IoCreateOutline } from 'react-icons/io5';
// import { VscGitPullRequestGoToChanges } from 'react-icons/vsc';
// import { Link, NavLink, Outlet } from 'react-router';
// import useRole from '../../Hook/useRole';
// import DonorWelcome from './WelComePage/DonorWelcome';
// import { RiSecurePaymentFill } from 'react-icons/ri';

// const Dashboard = () => {

//   const {role} = useRole();

//   return (
//     <div>
//       <div className="drawer lg:drawer-open">
//         <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//         <div className="drawer-content">
//           {/* Navbar */}
//           <nav className="navbar w-full bg-base-300">
//             <label
//               htmlFor="my-drawer-4"
//               aria-label="open sidebar"
//               className="btn btn-square btn-ghost"
//             >
//               {/* Sidebar toggle icon */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 strokeLinejoin="round"
//                 strokeLinecap="round"
//                 strokeWidth="2"
//                 fill="none"
//                 stroke="currentColor"
//                 className="my-1.5 inline-block size-4"
//               >
//                 <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
//                 <path d="M9 4v16"></path>
//                 <path d="M14 10l2 2l-2 2"></path>
//               </svg>
//             </label>
//             <div className="px-4">
//               <h1 className="text-2xl text-red-950 font-bold capitalize">
//                 Blood Donation
//               </h1>
//             </div>
//           </nav>
//           {/* Page content here */}
//           <div>
//             <Outlet></Outlet>
//           </div>
//         </div>

//         <div className="drawer-side is-drawer-close:overflow-visible">
//           <label
//             htmlFor="my-drawer-4"
//             aria-label="close sidebar"
//             className="drawer-overlay"
//           ></label>
//           <div className="flex min-h-full flex-col items-start bg-blue-400 text-white  is-drawer-close:w-14 is-drawer-open:w-64">
//             {/* Sidebar content here */}
//             <ul className="menu w-full grow">
//               {/* List item */}
//               <li>
//                 <NavLink
//                   className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                   data-tip="Homepage"
//                   to="/"
//                 >
//                   {/* Home icon */}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     strokeLinejoin="round"
//                     strokeLinecap="round"
//                     strokeWidth="2"
//                     fill="none"
//                     stroke="currentColor"
//                     className="my-1.5 inline-block size-4"
//                   >
//                     <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
//                     <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
//                   </svg>
//                   <span className="is-drawer-close:hidden">Home</span>
//                 </NavLink>
//               </li>

//               {/* myProfile rout */}

//               <li>
//                 <NavLink
//                   className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                   to="/dashboard/founding"
//                 >
//                   <RiSecurePaymentFill />
//                   <span className="is-drawer-close:hidden">Funding</span>
//                 </NavLink>
//               </li>
//               {/* myProfile rout */}

//               <li>
//                 <NavLink
//                   className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                   to="/dashboard/profile"
//                 >
//                   <FaUserCog />
//                   <span className="is-drawer-close:hidden">MyProfile</span>
//                 </NavLink>
//               </li>
//               {/* Create-Donation-Request rout */}

//               <li>
//                 <NavLink
//                   className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                   to="/dashboard/create-donation-request"
//                 >
//                   <IoCreateOutline />
//                   <span className="is-drawer-close:hidden">
//                     Create-Donation-Request
//                   </span>
//                 </NavLink>
//               </li>

//               {/* My-Donation-Request rout */}

//               <li>
//                 <NavLink
//                   className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                   to="/dashboard/my-donation-requests"
//                 >
//                   <VscGitPullRequestGoToChanges />
//                   <span className="is-drawer-close:hidden">
//                     MyDonationRequests
//                   </span>
//                 </NavLink>
//               </li>

//               {/* Admin panel */}
//               {role === 'Admin' && (
//                 <div>
//                   <li>
//                     <NavLink
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                       to="/dashboard/all-users"
//                     >
//                       <FaUsersLine />
//                       <span className="is-drawer-close:hidden">All-Users</span>
//                     </NavLink>
//                   </li>
//                 </div>
//               )}

//               {/* all donation request rout */}
//               {(role === 'Admin' || role === 'Volunteer') && (
//                 <li>
//                   <NavLink
//                     className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                     to="/dashboard/all-blood-donation-request"
//                   >
//                     <FaHandHoldingHeart  />

//                     <span className="is-drawer-close:hidden">
//                       All-Donation-Request
//                     </span>
//                   </NavLink>
//                 </li>
//               )}

//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import {
  FaHandHoldingHeart,
  FaUserCog,
  FaHome,
  FaUsers,
  FaPlusSquare,
  FaListAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { MdOutlineMenuOpen } from 'react-icons/md';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import useRole from '../../Hook/useRole';
import useAuth from '../../Hook/useAuth';

const Dashboard = () => {
  const { role } = useRole();
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  // Enhanced styles for better visibility
  const activeLink =
    'bg-white/10 backdrop-blur-md border-l-4 border-white text-white font-bold shadow-sm';
  const normalLink =
    'text-red-50 hover:bg-white/5 hover:translate-x-1 transition-all duration-300 font-medium tracking-wide';

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* Responsive Navbar */}
          <nav className="navbar w-full bg-white border-b border-slate-200 px-4 md:px-8 py-4 sticky top-0 z-30 shadow-sm">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-circle btn-ghost text-red-600 hover:bg-red-50"
              >
                <MdOutlineMenuOpen size={32} />
              </label>
            </div>
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl text-red-600 font-black tracking-tighter uppercase ml-2 lg:ml-0">
                Blood <span className="text-black">Donation</span>
              </h1>
            </div>
          </nav>

          {/* Main Dashboard Content */}
          <main className="py-8 px-2 md:px-4 lg:py-10  overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Improved Sidebar */}
        <div className="drawer-side z-40">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="flex min-h-full flex-col bg-red-700 text-white w-72 md:w-80 shadow-2xl">
            {/* User Profile Info in Sidebar */}
            <div className="p-8 border-b border-white/10 flex flex-col items-center">
              <div className="relative">
                <Link
                  to="/"
                  className="group relative bg-white p-5 rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-pointer flex items-center justify-center overflow-hidden"
                >
                  {/* Subtle Background Glow on Hover */}
                  <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* The Icon */}
                  <FaHandHoldingHeart className="relative z-10 text-red-600 text-5xl group-hover:scale-110 transition-transform duration-500" />

                  {/* Decorative Border Accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </Link>
              </div>
              <h2 className="mt-6 text-lg font-bold tracking-tight">
                {user?.displayName || 'Donor Name'}
              </h2>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-red-200 mt-1 bg-red-800/50 px-3 py-1 rounded-full">
                {role} Panel
              </span>
            </div>

            {/* Navigation Menu */}
            <ul className="menu px-4 py-6 gap-3 text-[15px] flex-grow">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `p-4 rounded-xl ${isActive ? activeLink : normalLink}`
                  }
                >
                  <FaHome size={22} className="mr-2" /> Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/founding"
                  className={({ isActive }) =>
                    `p-4 rounded-xl ${isActive ? activeLink : normalLink}`
                  }
                >
                  <RiSecurePaymentFill size={22} className="mr-2" /> Funding
                  Support
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    `p-4 rounded-xl ${isActive ? activeLink : normalLink}`
                  }
                >
                  <FaUserCog size={22} className="mr-2" /> Account Settings
                </NavLink>
              </li>

              <div className="divider before:bg-white/10 after:bg-white/10 my-4 text-xs font-bold text-red-300/50 tracking-widest uppercase">
                Requests
              </div>

              <li>
                <NavLink
                  to="/dashboard/create-donation-request"
                  className={({ isActive }) =>
                    `p-4 rounded-xl ${isActive ? activeLink : normalLink}`
                  }
                >
                  <FaPlusSquare size={22} className="mr-2" /> New Request
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/my-donation-requests"
                  className={({ isActive }) =>
                    `p-4 rounded-xl ${isActive ? activeLink : normalLink}`
                  }
                >
                  <FaListAlt size={22} className="mr-2" /> My Requests
                </NavLink>
              </li>

              {/* Management Sections */}
              {(role === 'Admin' || role === 'Volunteer') && (
                <>
                  <div className="divider before:bg-white/10 after:bg-white/10 my-4 text-xs font-bold text-red-300/50 tracking-widest uppercase">
                    Management
                  </div>
                  {role === 'Admin' && (
                    <li>
                      <NavLink
                        to="/dashboard/all-users"
                        className={({ isActive }) =>
                          `p-4 rounded-xl ${isActive ? activeLink : normalLink}`
                        }
                      >
                        <FaUsers size={22} className="mr-2" /> User Directory
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink
                      to="/dashboard/all-blood-donation-request"
                      className={({ isActive }) =>
                        `p-4 rounded-xl ${isActive ? activeLink : normalLink}`
                      }
                    >
                      <FaHandHoldingHeart size={22} className="mr-2" /> Central
                      Requests
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* Secure Logout Section */}
            <div className="p-6 bg-red-800/30">
              <button
                onClick={handleLogout}
                className="group cursor-pointer flex w-full items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white text-white hover:text-red-700 transition-all duration-500 font-bold border border-white/10 hover:border-white shadow-lg"
              >
                <FaSignOutAlt
                  size={22}
                  className="group-hover:rotate-12 transition-transform"
                />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;