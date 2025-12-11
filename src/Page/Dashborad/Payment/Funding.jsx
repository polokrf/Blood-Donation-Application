import React, { useRef } from 'react';
import useAuth from '../../../Hook/useAuth';
import { useForm } from 'react-hook-form';
import useAxios from '../../../Hook/useAxios';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';

const Funding = () => {
  const modalRef = useRef();
  const instance =useAxios()
  const {register,handleSubmit}=useForm()
  const { user } = useAuth();

  const { data: fundData = [] } = useQuery({
    queryKey: ['funding-data'],
    queryFn: async () => {
      const res = await instance.get('/fund-user');
      return res.data
    }
  })
  console.log(fundData)
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
    <div className="px-2">
      <div className="text-center my-[45px] ">
        <h1 className="text-2xl font-bold text-red-950 capitalize mb-3">
          {' '}
          Support Our Cause
        </h1>
        <p className="text-red-700">
          See all contributions made by our supporters and make a donation to
          help our organization grow
        </p>
      </div>
      {/* fount table and button */}
      <div className="md:max-w-[900px] mx-auto w-full">
        <div className="mb-3">
          <button
            onClick={handleOpenMOdal}
            className="btn btn-info  text-white capitalize"
          >
            Keep a give fund
          </button>
        </div>
        <div className="overflow-x-auto mb-15">
          <table className="table ">
            {/* head */}
            <thead className="bg-green-100 text-blue-500">
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {fundData.map((fund, i) => (
                <tr className="hover:bg-base-300 ">
                  <th>{i + 1}</th>
                  <td>{fund.name}</td>
                  <td>{fund.amount_total} Tk</td>
                  <td>
                    {new Date(fund.paymentAt).toLocaleDateString().split('T')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal */}

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Funding</h3>

          <form onSubmit={handleSubmit(handlePayment)}>
            <fieldset className="fieldset mb-3">
              {/* name */}
              <label className="label">Name</label>
              <input
                type="text"
                defaultValue={user?.displayName}
                {...register('name', { required: true })}
                className="input w-full"
                placeholder="Your Name"
              />

              {/* amount */}
              <label className="label">Amount</label>
              <input
                type="number"
                className="input w-full"
                {...register('amount', { required: true })}
                placeholder="Give Amount"
              />
            </fieldset>

            <div>
              <button className="btn btn-success text-white">Confirm</button>
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