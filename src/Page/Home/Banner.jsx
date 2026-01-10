import React from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import bg1 from '../../assets/patient-getting-chemotherapy-treatment.jpg'
import bg2 from '../../assets/man-presenting-red-ornament-heart-woman.jpg'

const Banner = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-b-xl h-[500px]"
      >
        <SwiperSlide
          className=" bg-cover bg-no-repeat bg-top relative "
          style={{ backgroundImage: `url(${bg1})` }}
        >
          <div className="bg-black/60 w-full h-full absolute top-0 "></div>
          <div className=" h-[500px] flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-6  " data-aos="fade-down">
                <h2 className="text-white md:text-left text-center  text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                  Donate Blood, Save Lives
                </h2>

                <p className="text-white md:text-left text-center">
                  Join our community of life-saving donors and help those in
                  need
                </p>
              </div>
              <div className="flex" data-aos="fade-up">
                <Link
                  className="btn btn-secondary rounded-2xl text-white mr-3"
                  to="/register"
                >
                  Join as a donor
                </Link>
                <Link
                  className="btn btn-secondary btn-outline rounded-2xl"
                  to="/search"
                >
                  Search Donors
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className=" bg-center bg-cover bg-no-repeat relative"
          style={{ backgroundImage: `url(${bg2})` }}
        >
          <div className="bg-black/60 w-full h-full absolute top-0"></div>
          <div className="">
            <div className="h-[500px] flex flex-col items-center justify-center">
              <div className="mb-6  " data-aos="fade-down">
                <h2 className="text-white text-2xl md:text-left text-center md:text-3xl lg:text-4xl font-bold mb-2">
                  Donate Blood, Save Lives
                </h2>

                <p className="text-white md:text-left text-center">
                  Join our community of life-saving donors and help those in
                  need
                </p>
              </div>
              <div className="flex" data-aos="fade-up">
                <Link
                  className="btn btn-secondary rounded-2xl text-white mr-3"
                  to="/register"
                >
                  Join as a donor
                </Link>
                <Link
                  className="btn btn-secondary btn-outline rounded-2xl"
                  to="/search"
                >
                  Search Donors
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;