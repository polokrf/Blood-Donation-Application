import React from 'react';
import {
  BiUserPlus,
  BiSearchAlt,
  BiMailSend,
  BiCheckShield,
} from 'react-icons/bi';
import { FaArrowRight, FaDroplet } from 'react-icons/fa6';

const HowItWorks = () => {
  const steps = [
    {
      icon: <BiUserPlus />,
      title: 'Create Profile',
      desc: 'Register as a donor or a seeker. Provide your blood group and location to join our life-saving network.',
      step: '01',
    },
    {
      icon: <BiSearchAlt />,
      title: 'Find a Match',
      desc: 'Search for donors near your location using our smart filters. We find the best match within minutes.',
      step: '02',
    },
    {
      icon: <BiMailSend />,
      title: 'Send Request',
      desc: 'Instantly notify donors through SMS and push notifications. They can accept your request with one click.',
      step: '03',
    },
    {
      icon: <BiCheckShield />,
      title: 'Save a Life',
      desc: 'Coordinate with the donor, complete the donation safely, and help someone return home to their family.',
      step: '04',
    },
  ];

  return (
    <div className="bg-white  relative overflow-hidden">
      {/* Decorative Blood Drop Background */}
      <div className="absolute top-10 left-10 text-red-50 opacity-20 -z-10 animate-bounce">
        <FaDroplet className="text-[15rem]" />
      </div>

      <div className="max-w-[1200px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-24 space-y-4" data-aos="fade-up">
          <span className="text-red-500 font-black uppercase tracking-[0.3em] text-xs">
            Simple 4-Step Process
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
            How It{' '}
            <span className="text-red-500 underline decoration-red-100 decoration-8 underline-offset-8">
              Works
            </span>
          </h1>
          <p className="text-gray-500 font-medium max-w-xl mx-auto">
            Our platform is designed to be fast and intuitive, ensuring that
            blood reaches patients without any technical delay.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Central Line (Desktop Only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-red-50 -translate-x-1/2 rounded-full"></div>

          <div className="space-y-20 lg:space-y-32">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-20 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                data-aos={idx % 2 === 0 ? 'fade-right' : 'fade-left'}
              >
                {/* Content Side */}
                <div className="flex-1 w-full">
                  <div
                    className={`p-10 rounded-[3rem] border-2 border-red-50 bg-white hover:border-red-500 hover:shadow-2xl hover:shadow-red-50 transition-all duration-500 group relative overflow-hidden`}
                  >
                    {/* Number Badge */}
                    <span className="absolute -top-4 -right-4 text-9xl font-black text-red-50 opacity-40 group-hover:opacity-60 transition-opacity">
                      {item.step}
                    </span>

                    <div className="relative z-10 space-y-4">
                      <div className="w-16 h-16 bg-red-500 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-red-200 group-hover:rotate-12 transition-transform duration-500">
                        {item.icon}
                      </div>
                      <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 font-medium leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline Connector Dot */}
                <div className="hidden lg:flex w-12 h-12 bg-red-500 rounded-full border-8 border-white shadow-xl items-center justify-center z-20 shrink-0 outline outline-4 outline-red-50">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                </div>

                {/* Empty Side (For Layout Balancing) */}
                <div className="flex-1 hidden lg:block">
                  <div className="flex items-center gap-4 text-red-100">
                    <div className="h-px bg-red-100 flex-1"></div>
                    <FaArrowRight
                      className={`text-4xl ${idx % 2 !== 0 ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 text-center" data-aos="zoom-in">
          <div className="bg-red-50 p-12 rounded-[4rem] border-4 border-dashed border-red-200">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-6">
              Start Your Life-Saving Journey
            </h2>
            <button className=" cursor-pointer px-12 py-6 bg-red-500 text-white font-black rounded-[2rem] shadow-2xl shadow-red-200 hover:bg-red-600 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest flex items-center gap-3 mx-auto">
              Register Now <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
