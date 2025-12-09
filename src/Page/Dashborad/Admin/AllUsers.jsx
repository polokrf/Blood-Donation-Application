import React from 'react';
import useAxios from '../../../Hook/useAxios';
import { useQuery } from '@tanstack/react-query';

const AllUsers = () => {
  const instance = useAxios();
  const { data: users = [] } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await instance.get('/all-users')
      return res.data
    }
  })
  console.log(users)
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
              <th>Action-Role</th>
              <th>Action-Status</th>
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
                  <div className="flex">
                    <button className="btn btn-xs btn-success text-white mr-3">
                      Admin
                    </button>
                    <button className="btn btn-xs btn-success text-white">
                      Volunteer
                    </button>
                  </div>
                </td>
                <td>
                  {u.status === 'Blocked' ? (
                    <button className="btn btn-xs btn-neutral">Unblock</button>
                  ) : (
                    <button className="btn btn-xs btn-neutral">Block</button>
                  )}
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