// import React, { use } from 'react';
// import { Link } from 'react-router';

// const Feature = ({ featureData }) => {
//   const myData = use(featureData);

//   return (
//     <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 my-[25px] gap-4">
//       {myData.map((data, i) => (
//         <div
//           key={i}
//           className="card bg-base-100  shadow-sm  "
//           data-aos="fade-left"
//         >
//           <figure className="p-2  hover-3d cursor-pointer">
//             <img
//               className="h-[250px] object-cover rounded-xl w-full "
//               src={data.img}
//               alt="Shoes"
//             />
//           </figure>
//           <div className="card-body p-2">
//             <h2 className="card-title mb-2">{data.title}</h2>
//             <p className="mb-2">{data.description}</p>
//             <div className="card-actions justify-end">
//               <Link className="btn btn-secondary rounded-2xl" to="/register">
//                 Join as a donor
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Feature;

import React, { use } from 'react';
import { Link } from 'react-router';
import { FaArrowRight } from 'react-icons/fa6';
import { BiDonateHeart } from 'react-icons/bi';

const Feature = ({ featureData }) => {
  const myData = use(featureData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 my-16 px-4">
      {myData.map((data, i) => (
        <div
          key={i}
          className="group relative bg-white border-2 border-red-50 rounded-[2.5rem] p-4 transition-all duration-500 hover:border-red-500 hover:shadow-2xl hover:shadow-red-100 hover:-translate-y-2"
          data-aos="fade-up"
          data-aos-delay={i * 100}
        >
          {/* Image Container with Floating Effect */}
          <div className="relative overflow-hidden rounded-[2rem] h-[220px] mb-6">
            <img
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={data.img}
              alt={data.title}
            />
            {/* Minimal Red Badge */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl text-red-500 shadow-sm">
              <BiDonateHeart className="text-2xl" />
            </div>
          </div>

          {/* Content Section */}
          <div className="px-2 pb-4">
            <h2 className="text-xl font-black text-gray-800 mb-3 group-hover:text-red-500 transition-colors uppercase tracking-tight">
              {data.title}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
              {data.description}
            </p>

            {/* Unique Action Link */}
            <div className="flex items-center justify-between">
              <Link
                to="/register"
                className="group/btn relative flex items-center gap-2 font-bold text-red-500 overflow-hidden"
              >
                <span className="relative z-10 transition-colors group-hover/btn:text-red-600">
                  Join Now
                </span>
                <FaArrowRight className="text-sm transition-transform group-hover:translate-x-2" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover/btn:w-full"></span>
              </Link>

              <div className="w-10 h-10 rounded-full border-2 border-red-100 flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all duration-300">
                {i + 1}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feature;