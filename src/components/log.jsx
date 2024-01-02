import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../conf/config";
import { navs } from "../constants"; // Import your Firebase config

const Log = () => {
  const [active, setActive] = useState(""); // Assuming you have a state for the active link
  const navigate = useNavigate();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Logout successful");
        // Redirect to the login page or any other desired page after logout
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error", error);
        // Handle logout error, e.g., display an error message
      });
  };

  return (
    <nav className='w-full flex py-6 justify-between items-center '>
      <Link to={"/"}>
        {/* <img src={logo} alt='ScholarShare' className='w-[124px] h-[32px]' /> */}
      </Link>

      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navs.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-secondary" : "text-dimWhite"
            } ${index === navs.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <Link to={`${nav.id}`}> {nav.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Log;
