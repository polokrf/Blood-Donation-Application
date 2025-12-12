import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxios from '../../../Hook/useAxios';
import successPayment from '../../../assets/payment-Success.jpg'
import { SiTicktick } from 'react-icons/si';

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paymentInfo = searchParams.get('session_id');
  const instance = useAxios();
  const [fundInfo, setFundInfo] = useState({});
 

  useEffect(() => {
    instance.post(`/paymentInfo?session_id=${paymentInfo}`)
      .then(res => {
      setFundInfo(res.data)
      }).catch(err => {
    console.log(err)
    })
  },[paymentInfo,instance])
  return (
    <div
      className="flex flex-col min-h-screen justify-center  items-center py-[60px] "
      data-aos="fade-down"
    >
      <div className="mb-5">
        <span className="text-3xl font-bold text-green-950 capitalize inline-block ">
          successful{' '}
          <SiTicktick
            size={20}
            style={{ color: 'green' }}
            className="inline-block"
          />
        </span>
      </div>
      <div className="">
        <img
          src={successPayment}
          alt=""
          className="md:max-w-[600px] w-full mx-auto rounded-2xl"
        />
      </div>
    </div>
  );
};

export default PaymentSuccess;