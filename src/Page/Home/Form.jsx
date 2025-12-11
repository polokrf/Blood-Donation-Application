import React from 'react';
import { useForm } from 'react-hook-form';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { toast } from 'react-toastify';

const Form = () => {
  const { register, handleSubmit,reset } = useForm();

  const handleContact = (data) => {
    toast.success('successful')
    reset()
  }
  return (
    <div className="linerBg ">
      <form onSubmit={handleSubmit(handleContact)} className="mx-auto md:max-w-[500px]  w-full p-2 bg-red-900 shadow-sm rounded-xl">
        <div className="text-right">
          <h4 className="text-white font-bold border-b inline-block">
            {' '}
            Contact Number{' '}
          </h4>
          <div className="text-white">
           
              <span className='font-bold'>
                {' '}
                <FaPhoneAlt className=' inline-block'/> :
              </span>
              <span className=""> 01775734110</span>
            
          </div>
        </div>
        <div className="fieldset ">
          {/* name */}
          <label className="label text-white">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="input w-full"
            placeholder="Your Name"
          />
          {/* email */}
          <label className="label text-white">Email</label>
          <input
            type="email"
            className="input w-full"
            {...register('email', { required: true })}
            placeholder="Your Email"
          />
          {/* phon number */}
          <label className="label text-white">Phone Number</label>
          <input
            type="Number"
            className="input w-full"
            {...register('phone_number', { required: true })}
            placeholder="Your Phone Number"
          />
        </div>
        <div className="mt-3">
          <button className="btn btn-secondary  w-full">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Form;