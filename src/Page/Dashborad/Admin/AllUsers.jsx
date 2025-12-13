import React, { useState } from 'react';
import useAxios from '../../../Hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { toast } from 'react-toastify';
import Loader from '../../../LodingAndErrorPage/Loader';

const AllUsers = () => {
  const instance = useAxios();
  const limit = 10
  const [userStatus, setUserStatus] = useState('');
  const [allUSersCount, setAllUsersCount] = useState();
  const [totalPage,setTotalPage]=useState(0)
  const [currentPage,setCurrentPage]=useState(0)
  const { data: users = [] ,refetch,isLoading} = useQuery({
    queryKey: ['all-users',userStatus,limit,currentPage],
    queryFn: async () => {
      const res = await instance.get(`/all-users?status=${userStatus}&limit=${limit}&skip=${currentPage * limit }`)
      setAllUsersCount(res.data.dataCount);
      const page = Math.ceil(res.data.dataCount / limit);
      setTotalPage(page)
      return res.data.result
    }
  })
  
  console.log(currentPage)
  const roleUpdate = (id, role) => {
    instance.patch(`/user-role/${id}`, { role })
      .then(res => {
        console.log(res.data);
        toast.success(`setRole ${role}`)
        refetch()
      })
      .catch(err => {
        console.log(err);
      });
  }
  const  statusUpdate = (id, status) => {
    instance.patch(`/user-status/${id}`, { status })
      .then(res => {
        console.log(res.data);
        toast.info(`you are ${status}`)
        refetch()
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  
 
  const handleVolunteer = (id) => {
     roleUpdate(id,'Volunteer')
  }
  const handleAdmin = (id) => {
     roleUpdate(id,'Admin')
  }
  const handleDonor = (id) => {
     roleUpdate(id,'Donor')
  }
  const handleUnblock = (id) => {
     statusUpdate(id,'Active')
  }
  const handleBlock = (id) => {
     statusUpdate(id, 'Blocked');
  }
  if (isLoading) {
    return <Loader></Loader>
  }
  return (
    <div>
      <div className="md:max-w-[1400px] w-full mx-auto py-[60px] px-2">
        <div className="text-center my-10">
          <h1 className="text-2xl text-red-950 font-bold capitalize mb-2">
            Manage All Users
          </h1>
          <p className="text-red-700">
            View, filter, and manage all registered users. Block or unblock
            users, and assign roles like Volunteer or Admin with ease.
          </p>
        </div>
        {/* user status */}
        <div className="my-[30px] text-center md:text-left">
          <h3 className="mb-2 text-blue-400 capitalize ">Filter With Status</h3>
          <select
            value={userStatus}
            onChange={e => setUserStatus(e.target.value)}
            className="select"
          >
            <option value="">filter status</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-blue-400 text-white">
              <tr>
                <th>SL</th>
                <th>Avatar</th>

                <th>email</th>
                <th>User Role</th>
                <th>User Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((u, i) => (
                <tr
                  key={u._id}
                  className=" transform hover:scale-90 transition-transform  duration-300 hover:bg-gray-100"
                >
                  <td>{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={u.photo}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold md:text-[15px] text-[12px]">
                          {u.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.status}</td>
                  <td>
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn m-1">
                        <HiOutlineDotsVertical />
                      </div>
                      {/* dropdown button */}
                      <div
                        tabIndex="-1"
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                      >
                        {/* role button */}

                        {u.role === 'Admin' && (
                          <div className="text-center mb-3">
                            <button
                              onClick={() => handleDonor(u._id)}
                              className="btn btn-xs btn-success text-white mr-2  mb-2"
                            >
                              Donor{' '}
                            </button>
                            <button
                              onClick={() => handleVolunteer(u._id)}
                              className="btn btn-xs btn-success text-white mr-3 mb-2"
                            >
                              Volunteer
                            </button>
                          </div>
                        )}
                        {u.role === 'Volunteer' && (
                          <div className="mb-3 text-center">
                            <button
                              onClick={() => handleDonor(u._id)}
                              className="btn btn-xs btn-success text-white mr-2  mb-2"
                            >
                              Donor{' '}
                            </button>
                            <button
                              onClick={() => handleAdmin(u._id)}
                              className="btn btn-xs btn-success text-white mb-2"
                            >
                              Admin
                            </button>
                          </div>
                        )}
                        {u.role === 'Donor' && (
                          <div className="mb-3 text-center">
                            <button
                              onClick={() => handleVolunteer(u._id)}
                              className="btn btn-xs btn-success text-white mr-3 mb-2"
                            >
                              Volunteer
                            </button>
                            <button
                              onClick={() => handleAdmin(u._id)}
                              className="btn btn-xs btn-success text-white mb-2"
                            >
                              Admin
                            </button>
                          </div>
                        )}

                        {/* status button */}

                        {u.status === 'Blocked' ? (
                          <button
                            onClick={() => handleUnblock(u._id)}
                            className="btn btn-xs btn-neutral"
                          >
                            Unblock
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBlock(u._id)}
                            className="btn btn-xs btn-neutral"
                          >
                            Block
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* paginatios */}
      </div>
      <div className="text-center my-6 ">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn mr-2"
          >
            Prev
          </button>
        )}
        {[...Array(totalPage).keys()].map(i => (
          <button
            className={` btn ${
              i === currentPage && 'btn-info text-white'
            } mr-2 my-4 `}
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </button>
        ))}
        {currentPage < totalPage - 1 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn ml-2"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default AllUsers;