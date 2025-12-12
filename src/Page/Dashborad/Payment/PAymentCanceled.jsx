import React from 'react';

import cancelImg from '../../../assets/93f15ee1-e20e-4f1c-b084-7fb8b3b13e35.jpg'
import { MdCancel } from 'react-icons/md';

const PAymentCanceled = () => {
  return (
    <div
      className="flex flex-col min-h-screen justify-center  items-center py-[60px] "
      data-aos="fade-down"
    >
       <div className="mb-5">
              <span className="text-3xl font-bold text-red-800 capitalize inline-block ">
                Canceled{' '}
                <MdCancel
                  size={20}
                  style={{ color: 'red' }}
                  className="inline-block"
                />
              </span>
            </div>
      
      <div>
        <img
          src={cancelImg}
          alt=""
          className="md:max-w-[600px] w-full mx-auto"
        />
      </div>
    </div>
  );
};

export default PAymentCanceled;