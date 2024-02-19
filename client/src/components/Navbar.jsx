import React from "react";
import { Link, json, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user } = JSON.parse(localStorage.getItem("token")) || [];
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout successfully!");
  };

  return (
    <nav className=" flex  gap-6 py-2 px-4">
      <div className=" h-12 w-14">
        <Link to={"/"}>
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Mountain-logo-Design-Graphics-9785421-1-580x435.png"
            alt=""
            className=" h-full w-full"
          />
        </Link>
      </div>

      <div className=" w-[60%] border rounded-full h-10 flex justify-center items-center pl-2 gap-2">
        <FiSearch
          size={24}
          className=" cursor-pointer hover:text-gray-600 text-white"
        />
        <input
          type="text"
          className=" w-full h-full rounded-full bg-transparent outline-none text-gray-400"
          placeholder="Search high resolution images"
        />
      </div>

      {user ? (
        <>
          <div className=" w-10 h-10">
            <img
              src={user.imageUrl}
              alt=""
              className=" w-full h-full rounded-full object-cover"
            />
          </div>

          <div
            className=" h-10 w-20 rounded-full flex justify-center items-center border cursor-pointer"
            onClick={handleLogOut}
          >
            Logout
          </div>

          <div
            className="rounded-full flex justify-center items-center cursor-pointer w-fit px-3 h-fit py-2 bg-white hover:bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 hover:text-white hover:shadow-md"
            
          >
            Submit a photo
          </div>
        </>
      ) : (
        <Link to={"/"}>
          <div className=" h-10 w-20 rounded-full flex justify-center items-center border cursor-pointer">
            Login
          </div>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
