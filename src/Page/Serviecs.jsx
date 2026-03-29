import React from 'react';
import {
  BiPlusMedical,
  BiSearchAlt,
  BiBell,
  
  BiMapAlt,
  BiSupport,
  BiShield,
} from 'react-icons/bi';
import { FaArrowRight } from 'react-icons/fa6';

const Services = () => {
  const allServices = [
    {
      icon: <BiPlusMedical />,
      title: 'Urgent Blood Post',
      desc: 'Post a blood request in seconds. Our system instantly notifies all eligible donors in your area.',
      color: 'bg-red-50',
    },
    {
      icon: <BiSearchAlt />,
      title: 'Smart Donor Filter',
      desc: 'Find donors by blood group, location, and availability using our advanced AI-driven search engine.',
      color: 'bg-white',
    },
    {
      icon: <BiBell />,
      title: 'Real-time Alerts',
      desc: 'Get instant SMS and push notifications when a donor accepts your request or a match is found.',
      color: 'bg-red-50',
    },
    {
      icon: <BiShield />,
      title: 'Verified Donors',
      desc: 'Every donor on our platform is verified through a strict process to ensure safety and reliability.',
      color: 'bg-white',
    },
    {
      icon: <BiMapAlt />,
      title: 'Nearby Hospital Mapping',
      desc: 'Locate the nearest hospitals and blood banks to your location for quick emergency support.',
      color: 'bg-red-50',
    },
    {
      icon: <BiSupport />,
      title: '24/7 Helpline',
      desc: 'Our dedicated support team is available around the clock to assist you in finding life-saving blood.',
      color: 'bg-white',
    },
  ];

  return (
    <div className="bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-[120px] -z-10 opacity-60 animate-pulse"></div>

      <div className="max-w-[1300px] mx-auto space-y-20">
        {/* 1. Page Header */}
        <div className="text-center space-y-4" data-aos="fade-down">
          <div className="inline-block px-6 py-2 bg-red-50 text-red-500 rounded-full font-black text-xs uppercase tracking-widest">
            What We Offer
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
            Our Life-Saving <span className="text-red-500">Services</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
            We offer a comprehensive suite of tools designed to make blood
            donation fast, safe, and accessible for everyone in need.
          </p>
        </div>

        {/* 2. Main Services Grid (Unique Card Design) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allServices.map((service, idx) => (
            <div
              key={idx}
              className={`group relative p-10 rounded-[3rem] border-2 ${service.color === 'bg-white' ? 'border-red-50 shadow-xl shadow-red-50' : 'border-transparent bg-red-50'} hover:border-red-500 hover:bg-white transition-all duration-500 hover:-translate-y-4`}
            >
              {/* Icon Animation */}
              <div className="w-20 h-20 bg-white text-red-500 rounded-3xl flex items-center justify-center text-4xl mb-8 shadow-lg shadow-red-100 group-hover:bg-red-500 group-hover:text-white group-hover:rotate-12 transition-all duration-500">
                {service.icon}
              </div>

              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-4 group-hover:text-red-500 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-500 font-medium leading-relaxed group-hover:text-gray-600 transition-colors">
                {service.desc}
              </p>

              {/* Unique Bottom Arrow */}
              <div className="mt-8 flex items-center gap-2 text-red-500 font-black uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 duration-500">
                <span>Learn More</span>
                <FaArrowRight />
              </div>
            </div>
          ))}
        </div>

        {/* 3. Special "How We Are Different" Section */}
        <div className="bg-gray-900 rounded-[4rem] p-10 md:p-20 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden group">
          {/* Subtle Red Glow for Dark Section */}
          <div className="absolute top-0 left-0 w-full h-full bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="lg:w-1/2 space-y-6 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
              Modern Technology <br />
              <span className="text-red-500">Human Connection</span>
            </h2>
            <p className="text-gray-400 text-lg font-medium leading-relaxed">
              Unlike traditional methods, our system uses location-based
              algorithms to find donors within 5km of the patient, cutting down
              response time by 70%.
            </p>
            <button className="px-8 py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-all uppercase tracking-widest text-sm shadow-xl shadow-red-900/20">
              Get Started Now
            </button>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-4 relative z-10">
            {[
              { label: 'Response Time', val: '2 Min' },
              { label: 'Active Donors', val: '10k+' },
              { label: 'Safe Matches', val: '100%' },
              { label: 'Support', val: '24/7' },
            ].map((box, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm hover:border-red-500 transition-colors group/box"
              >
                <p className="text-red-500 text-2xl font-black mb-1 group-hover/box:scale-110 transition-transform">
                  {box.val}
                </p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                  {box.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
