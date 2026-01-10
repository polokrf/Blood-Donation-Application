import React from 'react';
import { MoonLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center my-[100px]  ">
        <p>
          <MoonLoader color="#26c561" size={50} />
        </p>
      </div>
    </div>
  );
};

export default Loader;



