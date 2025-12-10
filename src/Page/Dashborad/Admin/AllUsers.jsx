import React from 'react';
import useAxios from '../../../Hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { toast } from 'react-toastify';

const AllUsers = () => {
  const instance = useAxios();
  const { data: users = [] ,refetch} = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await instance.get('/all-users')
      return res.data
    }
  })
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
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
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
              <tr key={u._id}>
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
    </div>
  );
};

export default AllUsers;