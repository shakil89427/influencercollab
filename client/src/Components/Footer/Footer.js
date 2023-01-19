import React from "react";
import logoWhite from "../../Assets/logoWhite.png";

const Footer = () => {
  return (
    <div className="bg-black py-20">
      <a href="https://flytant.com">
        <img src={logoWhite} alt="" className="w-full max-w-[300px] cursor-pointer block mx-auto" />
      </a>
      <a href="https://flytant.com">
        <p className="text-gray-300 text-center mt-2">© InfluencerCollab.in 2023</p>
      </a>
    </div>
  );
};

export default Footer;
