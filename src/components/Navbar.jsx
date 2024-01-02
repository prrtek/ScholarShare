import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { navLinks } from "../constants";
import { auth } from "../conf/config"; // Import your Firebase config

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut().then(() => navigate("/"));
  };

  return (
    <nav className='w-full flex py-6 justify-between items-center'>
      <Link to={"/"}>
        <h2 className='text-gradient text-2xl font-poppins'>ScholarShare</h2>
      </Link>

      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {user ? (
          // Render this when the user is logged in
          <>
            <li>
              <Link
                to='/create-project'
                className='font-poppins font-normal cursor-pointer text-[16px] text-dimWhite ml-4'
              >
                Create Project
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className='font-poppins font-normal cursor-pointer text-[16px] text-dimWhite ml-4'
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          // Render this when the user is not logged in
          <>
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className='font-poppins font-normal cursor-pointer text-[16px] text-dimWhite p-2'
              >
                <Link to={`${nav.id}`}> {nav.title}</Link>
              </li>
            ))}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
