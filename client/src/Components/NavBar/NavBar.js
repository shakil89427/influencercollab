import React from "react";
import { useNavigate } from "react-router-dom";
import logoBlack from "../../Assets/logoBlack.png";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between h-24 r-box">
      <img
        src={logoBlack}
        alt=""
        className="w-full max-w-[300px] cursor-pointer"
        onClick={() => navigate("/")}
      />
      <a
        href="mailto:contact@influencercollab.in"
        target="_blank"
        rel="noreferrer"
        className="border-2 border-black hidden md:flex items-center justify-center h-11 w-36 font-medium rounded-md"
        style={{ letterSpacing: " 0.4px" }}
      >
        Contact
      </a>
    </div>
  );
};

export default NavBar;
