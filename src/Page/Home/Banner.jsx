import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="bg-linear-to-r from-red-100 to-red-50 p-10 ">
      <div className="md:max-w-[1200px] w-full mx-auto grid md:grid-cols-2  grid-cols-1 items-center justify-center md:gap-2">
        <div>
          <div className="mb-6  " data-aos="fade-down">
            <h2 className="text-red-950 text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              Donate Blood, Save Lives
            </h2>

            <p className="text-red-700">
              Join our community of life-saving donors and help those in need
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
        <div className=" hidden md:block" data-aos="zoom-in">
          <img
            src="https://i.ibb.co.com/zDhXQqn/Blod-DOnar.jpg"
            alt=""
            className="h-[400px] rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;