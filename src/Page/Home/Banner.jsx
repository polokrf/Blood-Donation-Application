

import React from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import bg1 from '../../assets/patient-getting-chemotherapy-treatment.jpg';
import bg2 from '../../assets/man-presenting-red-ornament-heart-woman.jpg';

const Banner = () => {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-b-[40px] h-[450px] md:h-[650px] overflow-hidden"
      >
        {/* Slide 1 */}
        <SwiperSlide
          className="bg-cover bg-no-repeat bg-center relative"
          style={{ backgroundImage: `url(${bg1})` }}
        >
          {/* Solid White Tint Overlay */}
          <div className="absolute inset-0 bg-white bg-opacity-30"></div>

          <div className="relative h-full flex flex-col justify-center items-center px-6">
            <div className="bg-white p-8 md:p-16 rounded-[2rem] border-t-8 border-red-500 shadow-2xl max-w-3xl text-center">
              <div data-aos="fade-down">
                <h2 className="text-gray-900 text-3xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
                  Donate Blood, <span className="text-red-500">Save Lives</span>
                </h2>
                <p className="text-gray-600 text-lg md:text-2xl font-medium mb-10">
                  Join our community of life-saving donors and help those in
                  need today.
                </p>
              </div>

              <div
                className="flex flex-col sm:flex-row justify-center gap-5"
                data-aos="fade-up"
              >
                <Link
                  className="px-10 py-4 bg-red-500 hover:bg-red-600 text-white font-black text-lg rounded-2xl shadow-lg shadow-red-200 transition-all active:scale-95"
                  to="/register"
                >
                  Join as a donor
                </Link>
                <Link
                  className="px-10 py-4 bg-white border-4 border-red-500 text-red-500 hover:bg-red-50 font-black text-lg rounded-2xl transition-all active:scale-95"
                  to="/search"
                >
                  Search Donors
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide
          className="bg-cover bg-no-repeat bg-center relative"
          style={{ backgroundImage: `url(${bg2})` }}
        >
          <div className="absolute inset-0 bg-white bg-opacity-30"></div>

          <div className="relative h-full flex flex-col justify-center items-center px-6">
            <div className="bg-white p-8 md:p-16 rounded-[2rem] border-t-8 border-red-500 shadow-2xl max-w-3xl text-center">
              <div data-aos="fade-down">
                <h2 className="text-gray-900 text-3xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
                  Be A <span className="text-red-500">Real Hero</span>
                </h2>
                <p className="text-gray-600 text-lg md:text-2xl font-medium mb-10">
                  Your donation can bring a smile back to a family. Give today!
                </p>
              </div>

              <div
                className="flex flex-col sm:flex-row justify-center gap-5"
                data-aos="fade-up"
              >
                <Link
                  className="px-10 py-4 bg-red-500 hover:bg-red-600 text-white font-black text-lg rounded-2xl shadow-lg shadow-red-200 transition-all active:scale-95"
                  to="/register"
                >
                  Join as a donor
                </Link>
                <Link
                  className="px-10 py-4 bg-white border-4 border-red-500 text-red-500 hover:bg-red-50 font-black text-lg rounded-2xl transition-all active:scale-95"
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