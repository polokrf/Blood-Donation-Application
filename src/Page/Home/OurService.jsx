import React from 'react';

const OurService = () => {
  return (
    <div className=" smp hover:translate-2 duration-300  cursor-pointer">
      <div className=" mb-[25px] text-center">
        <h1 className=" titles">Our Services</h1>
      </div>
      <div className=" grid md:grid-cols-3 gap-3 ">
        {/* item 1 */}
        <ul className=" listi" data-aos="fade-down">
          <div className=" ">
            <li className=" font-bold">🩸 Blood Donor Connection</li>
            <p>
              Create and manage urgent blood requests with fast response
              support.
            </p>
          </div>
          <div>
            <li className=" font-bold">🚨 Emergency Blood Requests</li>
            <p>
              Create and manage urgent blood requests with fast response
              support.
            </p>
          </div>
        </ul>
        {/* item 2 */}
        <ul className=" listi" data-aos="fade-down">
          <div>
            <li className=" font-bold">⏱ Fast Response System</li>
            <p>
              Get donor responses within minutes during critical situations.
            </p>
          </div>
          <div>
            <li className=" font-bold">🌍 Community-Based Support</li>
            <p>
              A trusted community of active donors ready to help save lives.
            </p>
          </div>
        </ul>
        {/* item 3  */}
        <ul className=" listi" data-aos="fade-down">
          <div>
            <li className=" font-bold">📍 Location-Based Matching</li>
            <p>Find suitable donors based on blood group and location.</p>
          </div>
          <div>
            <li className=" font-bold">🔒 Safe & Reliable Platform</li>
            <p>Secure and trusted system to ensure smooth communication.</p>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default OurService;