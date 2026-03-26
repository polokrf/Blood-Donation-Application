import React from 'react';
import { FaWhatsapp, FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import {
  MdOutlineAttachEmail,
  MdLocationOn,
  MdSupportAgent,
} from 'react-icons/md';

const ContactUs = () => {
  return (
    <div className="bg-white min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background Animated Blobs (z-index na use kore relative position diyechi) */}
      <div className="absolute top-10 -right-20 w-80 h-80 bg-red-100 rounded-full blur-[120px] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-10 -left-20 w-60 h-60 bg-red-50 rounded-full blur-[100px] opacity-40"></div>

      <div className="max-w-[1300px] mx-auto relative z-0">
        {/* Section Header with Underline Animation */}
        <div className="text-center mb-24 space-y-4" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-50 text-red-500 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-inner border border-red-100">
            <MdSupportAgent className="text-xl animate-bounce" />
            <span>Support Hub</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 uppercase tracking-tighter leading-none">
            Let’s Connect <br />
            <span className="text-red-500 relative inline-block">
              & Save Lives
              <span className="absolute bottom-2 left-0 w-full h-4 bg-red-100 rounded-full animate-bounce delay-300"></span>
            </span>
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-xl leading-relaxed pt-2">
            Have questions, need urgent blood, or want to give feedback? Our
            dedicated team is here for you, 24/7.
          </p>
        </div>

        {/* Unique Split-Layout Container */}
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Side: 3D Info Cards (flex basis adjustment for uniqueness) */}
          <div className="lg:w-[45%] space-y-8 w-full flex-shrink-0">
            {[
              {
                icon: <FaWhatsapp />,
                title: 'WhatsApp Support',
                val: '01775734110',
                color: 'bg-green-50 text-green-600',
              },
              {
                icon: <MdOutlineAttachEmail />,
                title: 'Email Address',
                val: 'polokkumar9030@gmail.com',
                color: 'bg-red-50 text-red-500',
              },
              {
                icon: <MdLocationOn />,
                title: 'Our Location',
                val: 'Rajshahi, Bangladesh',
                color: 'bg-blue-50 text-blue-600',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-white p-10 rounded-[3rem] border-2 border-red-50 hover:border-red-500 hover:-translate-y-3 transition-all duration-500 shadow-xl shadow-red-50/50 flex items-center gap-8 overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-24 h-full bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right opacity-10"></div>

                <div
                  className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center text-4xl shadow-inner group-hover:rotate-12 transition-transform duration-500`}
                >
                  {item.icon}
                </div>
                <div className="flex-1 relative z-10">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-2xl font-black text-gray-800 tracking-tight leading-none truncate max-w-[280px]">
                    {item.val}
                  </p>
                </div>
              </div>
            ))}

            {/* Unique Dark Social Connector */}
            <div className="p-8 bg-gray-950 rounded-[2.5rem] flex items-center justify-between shadow-2xl shadow-gray-200">
              <span className="font-black uppercase tracking-[0.2em] text-[11px] text-gray-500">
                Official Connect
              </span>
              <div className="flex gap-5">
                {[
                  { icon: <FaGithub />, link: '#' },
                  { icon: <FaLinkedin />, link: '#' },
                ].map((soc, i) => (
                  <a
                    key={i}
                    href={soc.link}
                    className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl text-white hover:bg-red-500 hover:scale-110 transition-all duration-300"
                  >
                    {soc.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: High-End Contact Form */}
          <div className="lg:w-[55%] flex-grow w-full">
            <div className="bg-white p-10 md:p-20 rounded-[4rem] border-2 border-red-50 shadow-2xl shadow-red-100/50 group hover:border-red-500 transition-all duration-500 relative">
              {/* Form Decorative Element (z-index charai background-e set kora hoyeche) */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-500 opacity-10 rounded-full group-hover:opacity-20 transition-opacity"></div>

              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-12 flex items-center gap-3">
                <span className="w-10 h-10 bg-red-500 rounded-2xl"></span>
                Send Us Message
              </h2>

              <form className="space-y-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative group/input">
                    <input
                      type="text"
                      className="w-full px-8 py-6 bg-red-50/30 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-[2rem] outline-none transition-all duration-300 font-bold text-gray-800 placeholder:text-gray-300"
                      placeholder="Rokcy Student"
                    />
                    <label className="absolute -top-3.5 left-6 bg-white px-3 text-xs font-black text-red-500 uppercase tracking-widest rounded-full opacity-0 group-focus-within/input:opacity-100 transition-opacity">
                      Full Name
                    </label>
                  </div>
                  <div className="relative group/input">
                    <input
                      type="email"
                      className="w-full px-8 py-6 bg-red-50/30 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-[2rem] outline-none transition-all duration-300 font-bold text-gray-800 placeholder:text-gray-300"
                      placeholder="example@mail.com"
                    />
                    <label className="absolute -top-3.5 left-6 bg-white px-3 text-xs font-black text-red-500 uppercase tracking-widest rounded-full opacity-0 group-focus-within/input:opacity-100 transition-opacity">
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="relative group/input">
                  <input
                    type="text"
                    className="w-full px-8 py-6 bg-red-50/30 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-[2rem] outline-none transition-all duration-300 font-bold text-gray-800 placeholder:text-gray-300"
                    placeholder="Subject / Urgency Level"
                  />
                  <label className="absolute -top-3.5 left-6 bg-white px-3 text-xs font-black text-red-500 uppercase tracking-widest rounded-full opacity-0 group-focus-within/input:opacity-100 transition-opacity">
                    Subject
                  </label>
                </div>

                <div className="relative group/input">
                  <textarea
                    rows="5"
                    className="w-full px-8 py-6 bg-red-50/30 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-[2.5rem] outline-none transition-all duration-300 font-bold text-gray-800 resize-none placeholder:text-gray-300"
                    placeholder="Write your message here... (e.g., Patient condition, required blood group)"
                  ></textarea>
                  <label className="absolute -top-3.5 left-6 bg-white px-3 text-xs font-black text-red-500 uppercase tracking-widest rounded-full opacity-0 group-focus-within/input:opacity-100 transition-opacity">
                    Your Message
                  </label>
                </div>

                <button
                  type="submit"
                  className="group relative flex items-center justify-center gap-4 w-full py-6 bg-red-500 text-white font-black rounded-[2.5rem] shadow-2xl shadow-red-200 hover:bg-red-600 hover:scale-[1.03] active:scale-95 transition-all duration-300 uppercase tracking-widest overflow-hidden"
                >
                  {/* Button Shine Effect (z-index charai background utility diye kora) */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <span className="relative z-10">Submit Request</span>
                  <FaPaperPlane className="relative z-10 text-lg transition-transform duration-500 group-hover:translate-x-3 group-hover:-translate-y-3" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
