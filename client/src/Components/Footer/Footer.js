import React from "react";
import logoWhite from "../../Assets/logoWhite.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black py-20">
      <img
        src={logoWhite}
        alt=""
        className="w-full max-w-[300px] cursor-pointer block mx-auto"
        onClick={() => navigate("/")}
      />
      <p className="text-gray-300 text-center mt-2">
        © InfluencerCollab.in 2023
      </p>
    </div>
  );
};

export default Footer;
