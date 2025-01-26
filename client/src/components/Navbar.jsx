import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.clear();
    navigate("/signup");
  };

  const authToken = localStorage.getItem("authToken");
  return (
    <>
      <header className=" pt-4 border-b border-slate-100 bg-black">
        <nav className="text-white max-w-[1320px] flex items-center justify-between mx-auto  h-20  md:px-20 px-4 uppercase">
          <div className="flex md:gap-5">
            <h3 className="md:text-2xl  text-xl font-mono uppercase">
              cookie clicker
            </h3>
          </div>
          <ul className="flex md:gap-x-10  md:text-[16px] text-sm py-5 items-center">
            <li className="hover:text-yellow-400 pr-4 text-yellow-400">
              <Link to="/">Home</Link>
            </li>

            {/*
             * if `authToken` is not here then sing up will show if `authToken` is avail then signout will show
             */}
            {authToken ? (
              <li className="hover:bg-blue-200   bg-white text-black px-4 py-2 rounded-md ">
                <button className=" cursor-pointer uppercase" onClick={signOut}>
                  sign out
                </button>
              </li>
            ) : (
              <li className="hover:bg-blue-200 cursor-pointer  bg-white text-black px-4 py-2 rounded-md">
                <Link to="/signup" className="cursor-pointer ">
                  sign up
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
