// import React from 'react';

// const OurService = () => {
//   return (
//     <div className=" smp hover:translate-2 duration-300  cursor-pointer">
//       <div className=" mb-[25px] text-center">
//         <h1 className=" titles">Our Services</h1>
//       </div>
//       <div className=" grid md:grid-cols-3 gap-3 ">
//         {/* item 1 */}
//         <ul className=" listi" data-aos="fade-down">
//           <div className=" ">
//             <li className=" font-bold">🩸 Blood Donor Connection</li>
//             <p>
//               Create and manage urgent blood requests with fast response
//               support.
//             </p>
//           </div>
//           <div>
//             <li className=" font-bold">🚨 Emergency Blood Requests</li>
//             <p>
//               Create and manage urgent blood requests with fast response
//               support.
//             </p>
//           </div>
//         </ul>
//         {/* item 2 */}
//         <ul className=" listi" data-aos="fade-down">
//           <div>
//             <li className=" font-bold">⏱ Fast Response System</li>
//             <p>
//               Get donor responses within minutes during critical situations.
//             </p>
//           </div>
//           <div>
//             <li className=" font-bold">🌍 Community-Based Support</li>
//             <p>
//               A trusted community of active donors ready to help save lives.
//             </p>
//           </div>
//         </ul>
//         {/* item 3  */}
//         <ul className=" listi" data-aos="fade-down">
//           <div>
//             <li className=" font-bold">📍 Location-Based Matching</li>
//             <p>Find suitable donors based on blood group and location.</p>
//           </div>
//           <div>
//             <li className=" font-bold">🔒 Safe & Reliable Platform</li>
//             <p>Secure and trusted system to ensure smooth communication.</p>
//           </div>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default OurService;

import React from 'react';
import { BiWorld, BiSupport, BiShieldQuarter } from 'react-icons/bi';
import { MdBloodtype, MdFlashOn, MdLocationOn } from 'react-icons/md';

const OurService = () => {
  const services = [
    {
      icon: <MdBloodtype />,
      title: 'Blood Donor Connection',
      desc: 'Create and manage urgent blood requests with fast response support.',
    },
    {
      icon: <MdFlashOn />,
      title: 'Emergency Blood Requests',
      desc: 'Real-time alerts for critical situations ensuring immediate help.',
    },
    {
      icon: <MdFlashOn />,
      title: 'Fast Response System',
      desc: 'Get donor responses within minutes during critical situations.',
    },
    {
      icon: <BiWorld />,
      title: 'Community-Based Support',
      desc: 'A trusted community of active donors ready to help save lives.',
    },
    {
      icon: <MdLocationOn />,
      title: 'Location-Based Matching',
      desc: 'Find suitable donors based on blood group and nearest location.',
    },
    {
      icon: <BiShieldQuarter />,
      title: 'Safe & Reliable Platform',
      desc: 'Secure and trusted system to ensure smooth communication.',
    },
  ];

  return (
    <div className="my-24  max-w-[1300px] mx-auto overflow-hidden">
      {/* Section Title */}
      <div className="text-center mb-16 relative">
        <h1 className="text-3xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase relative ">
          Our <span className="text-red-500">Services</span>
        </h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-12 bg-red-50 -rotate-2 -z-0 rounded-full blur-xl opacity-70"></div>
        <p className="text-gray-500 font-bold mt-2 uppercase tracking-widest text-sm">
          Empowering life-saving connections
        </p>
      </div>

      {/* Unique Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="group relative bg-white p-8 rounded-[2.5rem] border-2 border-red-50 hover:border-red-500 hover:shadow-2xl hover:shadow-red-100 transition-all duration-500 hover:-translate-y-3 flex flex-col items-start overflow-hidden"
          >
            {/* Background Accent Element */}
            <div className="absolute -bottom-6 -right-6 text-red-50 text-8xl opacity-10 group-hover:opacity-30 transition-all duration-500 transform group-hover:-rotate-12">
              {service.icon}
            </div>

            {/* Icon Box */}
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:bg-red-500 group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-red-50">
              {service.icon}
            </div>

            {/* Content */}
            <h2 className="text-xl font-black text-gray-800 uppercase tracking-tighter mb-4 group-hover:text-red-500 transition-colors">
              {service.title}
            </h2>

            <p className="text-gray-500 font-medium leading-relaxed group-hover:text-gray-600 transition-colors">
              {service.desc}
            </p>

            {/* Interactive Bottom Bar */}
            <div className="w-10 h-1.5 bg-red-100 mt-8 rounded-full group-hover:w-full group-hover:bg-red-500 transition-all duration-700"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurService;