import React, { use, useRef } from 'react';
import HighlightCard from './HighlightCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { useForm } from 'react-hook-form';
import useNormanAxios from '../../Hook/useNormanAxios';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../LodingAndErrorPage/Loader';

const Highlight = () => {
 
  const refModal = useRef();
  const instance=useNormanAxios()
   const {
     register,
     handleSubmit,
     reset
    
   } = useForm();
  const handleClick = () => {
    refModal.current.showModal()
  }

  const handleClose = (e) => {
    e.preventDefault();
    refModal.current.close()
  }

  // get FedBAck 
  const { data: fedBackData = [],isLoading } = useQuery({
    queryKey: ['fedBack'],
    queryFn: async () => {
      const data = await instance.get('/fedBack');
      return data.data;
    },
  });

// post FedBack
  const handleAddSay = (data) => {
    instance.post('/fedBack', data)
      .then(res => {
        if (res.data.insertedId) {
          toast.success('Thanks');
          reset()
          refModal.current.close()
        }
      
      }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className=" my-[25px] p-2">
      <div className=" text-center mb-5">
        <button
          onClick={handleClick}
          className=" btn btn-secondary btn-outline rounded-2xl"
        >
          Say it Here
        </button>
      </div>

      {isLoading && <Loader></Loader>}
      <Swiper
        loop={true}
        slidesPerView={4}
        spaceBetween={30}
        autoplay={{
          delay: 900,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper "
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {fedBackData.map((fed, i) => (
          <SwiperSlide>
            <HighlightCard key={i} fed={fed}></HighlightCard>
          </SwiperSlide>
        ))}
      </Swiper>

      {/*  the modal */}

      <dialog ref={refModal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">say here!</h3>

          {/* form */}
          <form onSubmit={handleSubmit(handleAddSay)} className=" fieldset">
            {/* name */}
            <label className=" label ">Name</label>
            <input {...register('name')} required className="input w-full" type="text" />
            {/* description */}
            <label className=" label"> Description </label>
            <textarea
              {...register('description')}
              
              required
              className=" textarea w-full"
            ></textarea>

            {/* action */}

            <div className=" flex gap-3">
              <button className=" btn btn-secondary">Say</button>
              <div method="dialog ">
                {/* if there is a button in form, it will close the modal */}
                <button onClick={handleClose} type=" button" className="btn">
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Highlight;