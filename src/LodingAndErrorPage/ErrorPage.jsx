import React from 'react';
import error from '.././assets/3737258.jpg'
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center my-[45px]'>
      <img src={error} alt="" className='md:max-w-[450px] w-full mx-auto h-[450px]' />
      <Link  className='btn btn-secondary mt-3' to='/'>Home</Link>
    </div>
  );
};

export default ErrorPage;