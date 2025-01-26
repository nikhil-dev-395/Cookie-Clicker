import { Github01Icon, Linkedin01Icon } from "hugeicons-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black">
      <div className=" py-10 px-5 md:px-20 max-w-[1320px] text-white md:text-3xl text-xl flex md:flex-row flex-col gap-y-5 items-center justify-between mx-auto">
        <div>
          copyright &copy; 2025{" "}
          <span className="text-gray-400"> cookie clicker</span>
        </div>
        <ul className="flex gap-x-10">
          {/* linkedin */}
          <li>
            <a
              href="https://www.linkedin.com/in/nikhil-wankhade-3494b3234/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin01Icon width={40} height={40} />
            </a>
          </li>
          {/* github link here */}
          <li>
            <a
              href="https://github.com/nikhil-dev-395"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github01Icon width={40} height={40} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
