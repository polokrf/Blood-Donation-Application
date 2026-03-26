import React from 'react';
import { BiHeartSquare, BiGroup, BiShieldAlt2 } from 'react-icons/bi';
import { FaHandHoldingHeart, FaPlusCircle } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen py-20 px-4 overflow-hidden">
      <div className="max-w-[1300px] mx-auto space-y-24">
        {/* 1. Hero Section (Unique Design) */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 relative z-10" data-aos="fade-right">
            <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full">
              <span className="text-red-500 font-black text-xs uppercase tracking-[0.2em]">
                Our Story
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter leading-none">
              Saving Lives <br />
              <span className="text-red-500">Together</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              Our platform is a bridge between the brave heroes who donate blood
              and the fighters who need it. We believe no emergency should go
              unanswered due to a lack of communication.
            </p>
          </div>

          <div className="relative" data-aos="fade-left">
            {/* Unique Shape Background */}
            <div className="absolute -inset-4 bg-red-500 rounded-[3rem] rotate-3 -z-10 opacity-10"></div>
            <img
              src="https://images.unsplash.com/photo-1615461066841-6116ecaaba0a?auto=format&fit=crop&q=80&w=1000"
              alt="Blood Donation"
              className="rounded-[3rem] shadow-2xl border-8 border-white group-hover:rotate-0 transition-transform duration-500"
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 border border-red-50 animate-bounce">
              <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-red-200">
                <BiHeartSquare />
              </div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">
                  Emergency
                </p>
                <p className="text-sm font-bold text-gray-800">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Stats Section (Trust Builder) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-y-2 border-red-50">
          {[
            { label: 'Active Donors', val: '5k+', icon: <BiGroup /> },
            {
              label: 'Successful Matches',
              val: '12k+',
              icon: <FaHandHoldingHeart />,
            },
            { label: 'Cities Covered', val: '50+', icon: <BiShieldAlt2 /> },
            { label: 'Lives Saved', val: '100%', icon: <FaPlusCircle /> },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2 group cursor-default">
              <div className="text-red-500 text-3xl flex justify-center group-hover:scale-125 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-black text-gray-900">{stat.val}</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* 3. Core Values Grid */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
              Why We <span className="text-red-500">Do This</span>
            </h2>
            <div className="w-16 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-red-50 rounded-[2.5rem] hover:bg-red-500 hover:text-white transition-all duration-500 group">
              <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">
                Our Mission
              </h3>
              <p className="font-medium opacity-80 group-hover:opacity-100">
                To modernize blood donation by creating a seamless, fast, and
                secure digital platform that connects donors and recipients
                instantly.
              </p>
            </div>

            <div className="p-10 bg-white border-2 border-red-50 rounded-[2.5rem] hover:border-red-500 transition-all duration-500 group shadow-lg shadow-red-50">
              <h3 className="text-2xl font-black text-red-500 uppercase mb-4 tracking-tighter">
                Our Vision
              </h3>
              <p className="text-gray-500 font-medium">
                We envision a world where no one has to suffer due to blood
                shortages, and every life is saved through community unity and
                technology.
              </p>
            </div>

            <div className="p-10 bg-red-50 rounded-[2.5rem] hover:bg-red-500 hover:text-white transition-all duration-500 group">
              <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">
                Our Community
              </h3>
              <p className="font-medium opacity-80 group-hover:opacity-100">
                A strong network of thousands of voluntary donors who are ready
                to respond to emergencies and save lives every single day.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Call to Action */}
        <div className="bg-red-500 p-12 md:p-20 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl shadow-red-200">
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Ready to become a hero?
            </h2>
            <p className="text-red-100 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Your one donation can save up to three lives. Sign up today and be
              the reason someone smiles tomorrow.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <button className="px-10 py-5 bg-white text-red-500 font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                Register as Donor
              </button>
              <button className="px-10 py-5 bg-red-600 border-2 border-red-400 text-white font-black rounded-2xl hover:bg-red-700 transition-all uppercase tracking-widest">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
