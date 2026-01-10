import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-base-200 ">
      <div className=" md:max-w-[1300px] w-full mx-auto">
        <footer className="footer sm:footer-horizontal  items-center p-4">
          <aside className="grid-flow-col items-center">
            <img
              src="https://i.ibb.co.com/9kq6CXHW/icons8-blood-donation-64-1.png"
              className=""
              alt=""
            ></img>
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
          </aside>
          <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <a href="https://github.com/polokrf" target="_blank">
              <FaGithub size={30} />
            </a>
            <a href="https://www.linkedin.com/in/polokkumar" target="_blank">
              <FaLinkedin size={30} />
            </a>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Footer;