// import React, { use, useRef } from 'react';
// import HighlightCard from './HighlightCard';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import { Autoplay } from 'swiper/modules';
// import { useForm } from 'react-hook-form';
// import useNormanAxios from '../../Hook/useNormanAxios';
// import { toast } from 'react-toastify';
// import { useQuery } from '@tanstack/react-query';
// import Loader from '../../LodingAndErrorPage/Loader';

// const Highlight = () => {

//   const refModal = useRef();
//   const instance=useNormanAxios()
//    const {
//      register,
//      handleSubmit,
//      reset

//    } = useForm();
//   const handleClick = () => {
//     refModal.current.showModal()
//   }

//   const handleClose = (e) => {
//     e.preventDefault();
//     refModal.current.close()
//   }

//   // get FedBAck
//   const { data: fedBackData = [],isLoading } = useQuery({
//     queryKey: ['fedBack'],
//     queryFn: async () => {
//       const data = await instance.get('/fedBack');
//       return data.data;
//     },
//   });

// // post FedBack
//   const handleAddSay = (data) => {
//     instance.post('/fedBack', data)
//       .then(res => {
//         if (res.data.insertedId) {
//           toast.success('Thanks');
//           reset()
//           refModal.current.close()
//         }

//       }).catch(err => {
//       console.log(err)
//     })
//   }

//   return (
//     <div className=" my-[25px] p-2">
//       <div className=" text-center mb-5">
//         <button
//           onClick={handleClick}
//           className=" btn btn-secondary btn-outline rounded-2xl"
//         >
//           Say it Here
//         </button>
//       </div>

//       {isLoading && <Loader></Loader>}
//       <Swiper
//         loop={true}
//         slidesPerView={4}
//         spaceBetween={30}
//         autoplay={{
//           delay: 900,
//           disableOnInteraction: false,
//         }}
//         modules={[Autoplay]}
//         className="mySwiper "
//         breakpoints={{
//           320: {
//             slidesPerView: 1,
//           },
//           640: {
//             slidesPerView: 2,
//           },
//           768: {
//             slidesPerView: 3,
//           },
//           1024: {
//             slidesPerView: 4,
//           },
//         }}
//       >
//         {fedBackData.map((fed, i) => (
//           <SwiperSlide>
//             <HighlightCard key={i} fed={fed}></HighlightCard>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/*  the modal */}

//       <dialog ref={refModal} className="modal modal-bottom sm:modal-middle">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">say here!</h3>

//           {/* form */}
//           <form onSubmit={handleSubmit(handleAddSay)} className=" fieldset">
//             {/* name */}
//             <label className=" label ">Name</label>
//             <input {...register('name')} required className="input w-full" type="text" />
//             {/* description */}
//             <label className=" label"> Description </label>
//             <textarea
//               {...register('description')}

//               required
//               className=" textarea w-full"
//             ></textarea>

//             {/* action */}

//             <div className=" flex gap-3">
//               <button className=" btn btn-secondary">Say</button>
//               <div method="dialog ">
//                 {/* if there is a button in form, it will close the modal */}
//                 <button onClick={handleClose} type=" button" className="btn">
//                   Close
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default Highlight;

import React, { useRef } from 'react';
import HighlightCard from './HighlightCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { useForm } from 'react-hook-form';
import useNormanAxios from '../../Hook/useNormanAxios';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../LodingAndErrorPage/Loader';
import { BiMessageAltDetail } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

const Highlight = () => {
  const refModal = useRef();
  const instance = useNormanAxios();
  const { register, handleSubmit, reset } = useForm();

  const handleClick = () => refModal.current.showModal();
  const handleClose = e => {
    e.preventDefault();
    refModal.current.close();
  };

  const { data: fedBackData = [], isLoading } = useQuery({
    queryKey: ['fedBack'],
    queryFn: async () => {
      const data = await instance.get('/fedBack');
      return data.data;
    },
  });

  const handleAddSay = data => {
    instance
      .post('/fedBack', data)
      .then(res => {
        if (res.data.insertedId) {
          toast.success('Thank you for your feedback!');
          reset();
          refModal.current.close();
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="my-20 relative px-4 overflow-hidden">
      {/* Dynamic Background Decorations */}
      <div className="absolute top-0 -left-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 -right-10 w-60 h-60 bg-red-50 rounded-full blur-3xl opacity-60"></div>

      <div className="max-w-[1300px] mx-auto relative ">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase">
              Community <span className="text-red-500">Voices</span>
            </h2>
            <p className="text-gray-50 font-medium mt-2 bg-red-500 px-3 py-1 inline-block rounded-lg text-sm">
              Real stories from our heroes
            </p>
          </div>

          <button
            onClick={handleClick}
            className="group relative flex items-center gap-3 px-8 py-4 bg-white border-2 border-red-500 text-red-500 font-black rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-500 shadow-xl shadow-red-100 active:scale-95"
          >
            <BiMessageAltDetail className="text-2xl animate-bounce" />
            <span className="uppercase tracking-widest">Share Experience</span>
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader />
          </div>
        )}

        {/* Improved Swiper Container */}
        <div className="py-5">
          <Swiper
            loop={true}
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="overflow-visible"
          >
            {fedBackData.map((fed, i) => (
              <SwiperSlide key={i} className="py-4">
                <div className="transition-all duration-500 transform hover:scale-105">
                  <HighlightCard fed={fed} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Unique Animated Modal */}
      <dialog ref={refModal} className="modal backdrop-blur-md">
        <div className="modal-box max-w-lg p-0 bg-white rounded-[2.5rem] overflow-hidden border-none shadow-2xl">
          {/* Modal Header Decor */}
          <div className="bg-red-500 p-8 text-white relative">
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full transition-all"
            >
              <IoMdClose className="text-2xl" />
            </button>
            <h3 className="font-black text-3xl uppercase tracking-tighter">
              Your Story
            </h3>
            <p className="text-red-100 font-medium">
              Inspire others to save lives
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit(handleAddSay)} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-red-500 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <input
                {...register('name')}
                required
                className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 focus:border-red-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-800"
                placeholder="Enter your name..."
                type="text"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-red-500 uppercase tracking-widest ml-1">
                Message
              </label>
              <textarea
                {...register('description')}
                required
                className="w-full h-40 px-5 py-4 bg-gray-50 border-2 border-gray-100 focus:border-red-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-800 resize-none"
                placeholder="Share your blood donation experience..."
              ></textarea>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white font-black rounded-2xl shadow-lg shadow-red-200 transition-all active:scale-95 uppercase tracking-widest"
              >
                Submit Story
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Highlight;