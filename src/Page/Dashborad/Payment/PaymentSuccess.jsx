import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxios from '../../../Hook/useAxios';

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paymentInfo = searchParams.get('session_id');
  const instance = useAxios();
  const [fundInfo, setFundInfo] = useState({});
  console.log(fundInfo)

  useEffect(() => {
    instance.post(`/paymentInfo?session_id=${paymentInfo}`)
      .then(res => {
      setFundInfo(res.data)
      }).catch(err => {
    console.log(err)
    })
  },[paymentInfo,instance])
  return (
    <div>
      <h1>successful</h1>
    </div>
  );
};

export default PaymentSuccess;