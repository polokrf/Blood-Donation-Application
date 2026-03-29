

import React from 'react';
import { FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import { MdOutlineAttachEmail, MdLocationOn } from 'react-icons/md';
import { toast } from 'react-toastify';

const ContactUs = () => {

  const handleSubmit = (e) => {
    e.preventDefault()

    toast.success('success')

    e.target.reset()
  }
  return (
    <div className="  relative overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-red-100 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-red-50 rounded-full blur-[120px] opacity-60"></div>

      <div className="max-w-6xl mx-auto relative ">
        {/* Animated Section Header */}
        <div className="text-center mb-16 transition-all duration-700 transform hover:scale-105">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter">
            Get In{' '}
            <span className="text-red-500 relative inline-block">
              Touch
              <span className="absolute bottom-2 left-0 w-full h-3 bg-red-100 -z-10 rounded-full animate-bounce"></span>
            </span>
          </h1>
          <p className="text-gray-400 font-bold mt-4 uppercase tracking-[0.3em] text-xs">
            Fast response • 24/7 Support • Trusted
          </p>
        </div>

        <div className="bg-white rounded-[3.5rem] border-2 border-red-50 shadow-[0_35px_60px_-15px_rgba(239,68,68,0.1)] overflow-hidden flex flex-col lg:flex-row group transition-all duration-500 hover:border-red-500">
          {/* Left Side: Info & Interactive Image */}
          <div className="lg:w-[40%] bg-red-500 p-10 md:p-14 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
                  Contact
                  <br />
                  Us Now
                </h2>
                <div className="w-16 h-1.5 bg-white rounded-full transition-all duration-500 group-hover:w-32"></div>
              </div>

              {/* Contact Detail Items with Hover Animation */}
              <div className="space-y-8">
                {[
                  {
                    icon: <MdOutlineAttachEmail />,
                    label: 'Email',
                    val: 'polokkumar9030@gmail.com',
                  },
                  {
                    icon: <FaWhatsapp />,
                    label: 'WhatsApp',
                    val: '01775734110',
                  },
                  {
                    icon: <MdLocationOn />,
                    label: 'Office',
                    val: 'Rajshahi, Bangladesh',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-5 group/item cursor-pointer"
                  >
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl group-hover/item:bg-white group-hover/item:text-red-500 group-hover/item:rotate-[15deg] transition-all duration-300 shadow-lg">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] text-red-100 font-black uppercase tracking-widest mb-1">
                        {item.label}
                      </p>
                      <p className="font-bold text-lg tracking-tight truncate max-w-[200px] md:max-w-full">
                        {item.val}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating Image with Parallax-like effect */}
              <div className="relative mt-6 rounded-[2.5rem] overflow-hidden border-8 border-white/10 group-hover:border-white/30 transition-all duration-700 shadow-2xl">
                <img
                  src="https://i.ibb.co.com/C57J6HDM/close-up-laptop-keyboard-colorful-neon-illumination-backlit-keyboard.jpg"
                  alt="Contact"
                  className="h-44 w-full object-cover transform transition-transform duration-1000 group-hover:scale-125 group-hover:rotate-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/60 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Right Side: Animated Contact Form */}
          <div className="lg:w-[60%] p-10 md:p-20 bg-white">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group/input">
                  <label className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-4 mb-2 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-7 py-5 bg-red-50/50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-[2rem] outline-none transition-all duration-300 font-bold text-gray-800 placeholder:text-gray-300"
                    placeholder="Rokcy Student"
                  />
                </div>
                <div className="relative group/input">
                  <label className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-4 mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-7 py-5 bg-red-50/50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-[2rem] outline-none transition-all duration-300 font-bold text-gray-800 placeholder:text-gray-300"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-4 mb-2 block">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-7 py-5 bg-red-50/50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-[2rem] outline-none transition-all duration-300 font-bold text-gray-800"
                  placeholder="Blood Request / Feedback"
                />
              </div>

              <div className="relative">
                <label className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-4 mb-2 block">
                  Your Message
                </label>
                <textarea
                  rows="4"
                  className="w-full px-7 py-5 bg-red-50/50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-[2.5rem] outline-none transition-all duration-300 font-bold text-gray-800 resize-none"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="group cursor-pointer relative overflow-hidden flex items-center justify-center gap-4 w-full py-6 bg-red-500 text-white font-black rounded-[2rem] shadow-2xl shadow-red-200 transition-all active:scale-95 uppercase tracking-widest"
              >
                {/* Button Shine Effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine"></div>

                <span className="relative z-10">Send Message</span>
                <FaPaperPlane className="relative z-10 transition-all duration-500 group-hover:translate-x-3 group-hover:-translate-y-3" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

