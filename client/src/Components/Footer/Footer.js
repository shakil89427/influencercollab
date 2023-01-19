import React from "react";
import logoWhite from "../../Assets/logoWhite.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black py-20">
      <a href="https://flytant.com">
        <img
          src={logoWhite}
          alt=""
          className="w-full max-w-[300px] cursor-pointer block mx-auto"
          onClick={() => navigate("/")}
        />
      </a>
      <a href="https://flytant.com">
        <p className="text-gray-300 text-center mt-2">© InfluencerCollab.in 2023</p>
      </a>
    </div>
  );
};

export default Footer;
