

import React, { useRef, useState } from 'react';
import useAuth from '../../../Hook/useAuth';
import { useForm } from 'react-hook-form';
import useAxios from '../../../Hook/useAxios';
import {
  FaHandHoldingHeart,
  FaSortAmountDown,
  FaHistory,
  FaPlusCircle,
} from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../LodingAndErrorPage/Loader';

const Funding = () => {
  const modalRef = useRef();
  const instance = useAxios();
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  const [sort, setSort] = useState('amount_total');
  const [order, setOrder] = useState('asc');
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 6;

  const { data: fundData = [], isLoading } = useQuery({
    queryKey: ['funding-data', sort, order, limit, currentPage],
    queryFn: async () => {
      const res = await instance.get(
        `/fund-user?sort=${sort}&order=${order}&limit=${limit}&skip=${currentPage * limit}`,
      );
      const total = res.data.count / limit;
      setTotalPage(Math.ceil(total));
      return res.data.result;
    },
  });

  const handleOpenMOdal = () => {
    modalRef.current.showModal();
  };

  const handlePayment = data => {
    const fundInfo = {
      name: data.name,
      email: user?.email,
      amount: data.amount,
    };
    instance
      .post('/create-checkout-session', fundInfo)
      .then(res => {
        modalRef.current.close();
        window.location.assign(res.data.url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSort = e => {
    const [newOrder, newSort] = e.target.value.split('-');
    setSort(newSort);
    setOrder(newOrder);
  };

  return (
    <div className=" bg-white pb-20 pt-3  px-4">
      {/* Header Section - Pure Red & White */}
      <div className="max-w-[1000px] mx-auto text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-red-200">
          <FaHandHoldingHeart className="text-sm animate-pulse" /> Fund Drive
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-950 uppercase tracking-tighter leading-none">
          Support{' '}
          <span className="text-red-600 underline decoration-red-100 underline-offset-8">
            Our Fund
          </span>
        </h1>
        <p className="text-gray-400 font-bold text-lg max-w-2xl mx-auto tracking-tight">
          Your donations help us keep this platform free and accessible for
          everyone in need.
        </p>
      </div>

      <div className="max-w-[1100px] mx-auto">
        {/* Actions Bar - Red Accents */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white p-8 rounded-[3rem] border-4 border-red-50 shadow-2xl shadow-red-50">
          <button
            onClick={handleOpenMOdal}
            className="w-full md:w-auto flex items-center justify-center gap-3 px-12 py-5 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-200 hover:bg-gray-900 transition-all duration-500 uppercase tracking-[0.2em] text-xs active:scale-95"
          >
            <FaPlusCircle className="text-lg" /> Give A Fund
          </button>

          <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl w-full md:w-auto border border-gray-100">
            <div className="pl-4 text-red-500">
              <FaSortAmountDown />
            </div>
            <select
              onChange={handleSort}
              className="select border-none focus:outline-none font-black text-gray-700 bg-transparent pr-10 text-xs uppercase tracking-widest cursor-pointer bg-white"
            >
              <option value="asc-amount_total">Amount: Low</option>
              <option value="desc-amount_total">Amount: High</option>
              <option value="asc-paymentAt">Date: Oldest</option>
              <option value="desc-paymentAt">Date: Newest</option>
            </select>
          </div>
        </div>

        {/* Funding Table - Red Header & Clean Body */}
        <div className="bg-white rounded-[3rem] border-2 border-red-50 overflow-hidden shadow-2xl shadow-red-100/30 mb-12">
          {isLoading ? (
            <div className="py-24 flex justify-center">
              <Loader />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-red-500 text-white">
                  <tr className="border-none">
                    <th className="py-8 pl-12 text-[10px] font-black uppercase tracking-[0.3em]">
                      No.
                    </th>
                    <th className="py-8 text-[10px] font-black uppercase tracking-[0.3em]">
                      Supporter
                    </th>
                    <th className="py-8 text-[10px] font-black uppercase tracking-[0.3em]">
                      Amount (TK)
                    </th>
                    <th className="py-8 text-[10px] font-black uppercase tracking-[0.3em]">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="font-bold text-gray-800">
                  {fundData.map((fund, i) => (
                    <tr
                      key={i}
                      className="border-b border-red-50 hover:bg-red-50/40 transition-all group"
                    >
                      <td className="py-7 pl-12">
                        <span className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xs font-black group-hover:scale-110 transition-transform">
                          {currentPage * limit + (i + 1)}
                        </span>
                      </td>
                      <td className="py-7 capitalize font-black text-gray-900 tracking-tight">
                        {fund.name}
                      </td>
                      <td className="py-7">
                        <span className="text-red-500 font-black text-xl tracking-tighter">
                          ৳{fund.amount_total}
                        </span>
                      </td>
                      <td className="py-7 text-gray-400 font-bold text-sm">
                        <div className="flex items-center gap-2">
                          <FaHistory className="text-xs text-red-200" />
                          {new Date(fund.paymentAt).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination - Red & White Theme */}
        <div className="flex items-center justify-center gap-4">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="h-14 px-8 rounded-2xl bg-white border-2 border-red-100 font-black text-xs uppercase hover:bg-red-500 hover:text-white transition-all"
            >
              Prev
            </button>
          )}
          <div className="flex gap-2 p-3 bg-red-50/50 rounded-3xl">
            {[...Array(totalPage).keys()].map(i => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-12 h-12 rounded-xl font-black text-sm transition-all shadow-sm ${i === currentPage ? 'bg-red-500 text-white scale-110 shadow-red-200' : 'text-red-400 hover:text-red-600 hover:bg-white'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          {currentPage < totalPage - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="h-14 px-8 rounded-2xl bg-red-600 text-white font-black text-xs uppercase shadow-xl shadow-red-200 hover:bg-gray-950 transition-all"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Modal - Pure Red & White Design */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white rounded-[4rem] p-12 border-4 border-red-50 shadow-2xl relative overflow-hidden">
          {/* Decorative Red Circle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-50 rounded-full opacity-50"></div>

          <div className="text-center mb-12 relative">
            <div className="w-24 h-24 bg-red-500 text-white rounded-[2rem] flex items-center justify-center text-5xl mx-auto mb-6 shadow-2xl shadow-red-200 rotate-6">
              <FaHandHoldingHeart />
            </div>
            <h3 className="text-4xl font-black text-gray-950 uppercase tracking-tighter leading-none">
              Make a <br />
              <span className="text-red-500">Donation</span>
            </h3>
          </div>

          <form
            onSubmit={handleSubmit(handlePayment)}
            className="space-y-8 relative"
          >
            <div className="space-y-3">
              <label className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] ml-6">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                {...register('name', { required: true })}
                className="w-full px-8 py-6 bg-red-50/30 rounded-3xl border-2 border-transparent focus:border-red-500 outline-none font-black text-gray-800 transition-all"
                placeholder="Ex: Rokcy"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] ml-6">
                Contribution (TK)
              </label>
              <input
                type="number"
                {...register('amount', { required: true })}
                className="w-full px-8 py-6 bg-red-50 text-red-500 rounded-3xl border-2 border-transparent focus:border-red-600 outline-none font-black text-4xl transition-all"
                placeholder="00"
              />
            </div>

            <button className="w-full py-7 bg-red-500 text-white font-black rounded-[2.5rem] hover:bg-gray-950 hover:shadow-2xl shadow-red-300 transition-all duration-500 uppercase tracking-[0.4em] text-xs active:scale-95">
              Pay with Stripe
            </button>
          </form>

          <form method="dialog" className="text-center mt-10">
            <button className="text-[10px] font-black text-gray-300 uppercase tracking-widest hover:text-red-600 transition-colors">
              Close
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Funding;