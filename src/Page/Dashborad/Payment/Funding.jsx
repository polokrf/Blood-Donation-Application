import React, { useRef } from 'react';
import useAuth from '../../../Hook/useAuth';
import { useForm } from 'react-hook-form';
import useAxios from '../../../Hook/useAxios';

const Funding = () => {
  const modalRef = useRef();
  const instance =useAxios()
  const {register,handleSubmit}=useForm()
  const {user}=useAuth()
  const handleOpenMOdal = () => {
    modalRef.current.showModal()
  }

  const handlePayment = (data) => {
    const fundInfo = {
      name: data.name,
      email: user?.email,
      amount:data.amount
    }
    instance.post('/create-checkout-session', fundInfo)
      .then(res => {
        
        modalRef.current.close()
        window.location.assign(res.data.url)
      }).catch(err => {
      console.log(err)
    })
  }
  return (
    <div>
      <div>
        <button
          onClick={handleOpenMOdal}
          className="btn btn-success btn-outline"
        >
          Funding
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="hover:bg-base-300">
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* modal */}

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Funding</h3>

          <form onSubmit={handleSubmit(handlePayment)}>
            <fieldset className="fieldset mb-3">
              {/* name */}
              <label className='label'>Name</label>
              <input type="text" defaultValue={user?.displayName} {...register('name',{required:true})} className='input w-full' placeholder='Your Name' />

              {/* amount */}
              <label className='label'>Amount</label>
              <input type="number" className='input w-full' {...register('amount',{required:true})} placeholder='Give Amount'/>
              
            </fieldset>

            <div>
              <button className='btn btn-success text-white'>Confirm</button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Funding;