import React from 'react';

const OurTeam = () => {
  const imgData = [
    {
      name: 'Alex',
      img: 'https://i.ibb.co.com/7xYcHFw8/young-confident-man-red-shirt-with-optical-glasses-points-back-looks-isolated-orange-wall.jpg',
    },
    {
      name: 'Rolex',
      img: 'https://i.ibb.co.com/nqpmc0vN/portrait-handsome-attractive-stylish-bearded-man-brown.jpg',
    },
    {
      name: 'Polok',
      img: 'https://i.ibb.co.com/bgCq0NQk/young-man-looking-camera-shirt-jacket-pants-looking-handsome-front-view.jpg',
    },
    {
      name: 'Badhon',
      img: 'https://i.ibb.co.com/kVgPP4rw/portrait-bearded-man-with-glasses-standing-white-wall.jpg',
    },
  ];
  return (
    <div className=" my-[25px] p-2 ">
      <div className=" text-center mb-[25px]">
        <h1 className=" text-center titles">Our Team</h1>
        <p>
          Our team is made up of dedicated and passionate individuals who work
          together to save lives through this platform. We believe in teamwork,
          responsibility, and transparency. Every member of our team is
          committed to improving the system, supporting donors and patients, and
          ensuring that help reaches people when they need it most.
        </p>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {imgData.map((im, i) => (
          <div className=" shadow-sm p-2 rounded-xl hover:translate-2 duration-300  cursor-pointer">
            <img
              key={i}
              src={im.img}
              alt=""
              className=" h-[350px] object-cover rounded-xl"
            />
            <div className=" text-center">
              <h4 className="font-bold capitalize text-xl my-2">{im.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;