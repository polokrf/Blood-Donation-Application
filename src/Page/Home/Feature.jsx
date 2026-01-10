import React, { use } from 'react';
import { Link } from 'react-router';


const Feature = ({ featureData }) => {
  const myData = use(featureData);

  
  
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 my-[25px] gap-4">
      {myData.map((data, i) => (
        <div
          key={i}
          className="card bg-base-100  shadow-sm  "
          data-aos="fade-left"
        >
          <figure className="p-2  hover-3d cursor-pointer">
            <img
              className="h-[250px] object-cover rounded-xl w-full "
              src={data.img}
              alt="Shoes"
            />
          </figure>
          <div className="card-body p-2">
            <h2 className="card-title mb-2">{data.title}</h2>
            <p className="mb-2">{data.description}</p>
            <div className="card-actions justify-end">
              <Link className="btn btn-secondary rounded-2xl" to="/register">
                Join as a donor
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feature;