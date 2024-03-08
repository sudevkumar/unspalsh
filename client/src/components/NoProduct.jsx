import React from "react";
import { Link } from "react-router-dom";

const NoProduct = ({ title }) => {
  return (
    <div className=" flex justify-center items-center w-full h-[80vh] flex-col gap-4">
      <h1 className=" text-3xl text-white">{title}</h1>
      <Link to="/">
        <button className=" py-3 px-10 bg-white rounded-md">
          Go To Home Page
        </button>
      </Link>
    </div>
  );
};

export default NoProduct;
