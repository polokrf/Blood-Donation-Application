import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MdOutlineAttachEmail } from 'react-icons/md';

const ContactUs = () => {
  return (
    <div className="smp hover:translate-2 duration-300  cursor-pointer">
      <div className=" shadow-sm  p-4 rounded-xl ">
        <div className=" mb-[25px] md:text-left text-center">
          <h1 className=" titles text-red-950">Contact Us</h1>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-3  justify-center ">
          <img
            src=" https://i.ibb.co.com/C57J6HDM/close-up-laptop-keyboard-colorful-neon-illumination-backlit-keyboard.jpg"
            alt=""
            className="h-[300px] w-full object-cover   rounded-xl"
          />
          <div>
            <p>
              If you have any questions, need support, or want to learn more
              about our platform, feel free to contact us. We are always ready
              to help and respond as quickly as possible. Your feedback and
              suggestions are important to us and help us improve our services.
            </p>
            <p className=" my-3">
              <MdOutlineAttachEmail className=" inline-block mr-2" />
              polokkumar9030@gmail.com
            </p>
            <p className=" my-3">
              <FaWhatsapp className=" inline-block mr-2" />
              01775734110
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;