import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const NotAccess = () => {
  return (
    <div className=" min-h-[100vh] bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
      <Navbar />
      <section className=" flex flex-col gap-3 justify-center items-center top-32 absolute h-[80vh] w-full bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
        <p className=" text-5xl">Login First To,</p>
        <p className=" text-3xl">Upload a Photo</p>
        <Link to={"/login"}>
          <button className=" py-2 px-5 border rounded-md">Login Now!</button>
        </Link>
      </section>
    </div>
  );
};

export default NotAccess;
