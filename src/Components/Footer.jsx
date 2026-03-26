import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router'; 

const Footer = () => {
  return (
    <div className="bg-white border-t-2 border-red-50 pt-16 pb-8">
      <div className="md:max-w-[1300px] w-full mx-auto px-4">
        <footer className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-12">
          {/* 1. Logo & About Summary */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img
                src="https://i.ibb.co.com/9kq6CXHW/icons8-blood-donation-64-1.png"
                className="w-12 h-12"
                alt="Logo"
              />
              <span className="text-2xl font-black text-gray-900 uppercase tracking-tighter">
                Blood<span className="text-red-500">Flow</span>
              </span>
            </div>
            <p className="text-gray-500 font-medium leading-relaxed">
              Connecting life-savers with those in need. Join our community and
              help save lives through easy blood donation management.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-black text-gray-900 uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-500 hover:text-red-500 font-bold transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-red-500 transition-all"></span>{' '}
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/process"
                  className="text-gray-500 hover:text-red-500 font-bold transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-red-500 transition-all"></span>{' '}
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-500 hover:text-red-500 font-bold transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-red-500 transition-all"></span>{' '}
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Support & Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-black text-gray-900 uppercase tracking-widest">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-500 hover:text-red-500 font-bold transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-red-500 transition-all"></span>{' '}
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-500 hover:text-red-500 font-bold transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-red-500 transition-all"></span>{' '}
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-500 hover:text-red-500 font-bold transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-red-500 transition-all"></span>{' '}
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter / Social Connect */}
          <div className="space-y-6">
            <h4 className="text-lg font-black text-gray-900 uppercase tracking-widest">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/polokrf"
                target="_blank"
                className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
              >
                <FaGithub size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/polokkumar"
                target="_blank"
                className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
              >
                <FaLinkedin size={22} />
              </a>
              <a
                href="https://www.facebook.com/polok.kumar.9484"
                className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
              >
                <FaFacebook size={22} />
              </a>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Available 24/7 for Emergencies
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;