
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Link as Dink } from "react-scroll";
import logo from "../images/logo.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);



  return (
    <div className="flex justify-between items-center w-full h-20 px-4 bg-white fixed">
      <div>
        <img src={logo} alt="devfolio logo" className="object-fill h-48 w-48" />
      </div>

      <ul className="hidden md:flex mt-2">
        <li className="px-4 cursor-pointer capitalize font-bold text-black  hover:scale-105  duration-100">
         
          <a href="/">Home</a>
        </li>

        <li className="px-4 cursor-pointer capitalize font-bold text-black  hover:scale-105  duration-100">
          <Dink to="preview" smooth duration={500}>
            Preview
          </Dink>
        </li>

        <li className="px-4 cursor-pointer capitalize font-bold text-black  hover:scale-105  duration-100">
          <Link to="/contact" smooth duration={500}>
            Contact
          </Link>
        </li>

        <li className="px-4 cursor-pointer capitalize font-bold text-black  hover:scale-105  duration-100">
          <Link to="/about" smooth duration={500}>
            About
          </Link>
        </li>

        <li className="px-4 cursor-pointer capitalize font-bold text-black  hover:scale-105  duration-100">
          <Link to="/profile" smooth duration={500}>
            My Profile
          </Link>
        </li>
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link to="/contact" smooth duration={500}>
              Contact
            </Link>
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link to="/about" smooth duration={500}>
              About
            </Link>
          </li>
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link to="/profile" smooth duration={500}>
              My Profile
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
