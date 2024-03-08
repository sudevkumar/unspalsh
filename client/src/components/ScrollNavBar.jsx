import React from "react";
import { categories } from "../assests/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ScrollNavBar = () => {
  const pathname = useLocation();
  const navigate = useNavigate();

  const GoToCategoryPage = (name, path) => {
    navigate(`/wallpapers/${path}`, { state: name });
  };

  return (
    <div className=" w-[100%]  h-fit whitespace-nowrap gap-10    items-center overflow-x-auto ">
      {categories?.map((ele, ind) => (
        <div
          key={ind}
          className={`w-fit h-10 cursor-pointer   px-3 whitespace-nowrap inline-block ${
            pathname.state === ele.name && "underline"
          } `}
          onClick={() => GoToCategoryPage(ele.name, ele.path)}
        >
          <p
            className={`${
              pathname.state === ele.name &&
              "bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent"
            } ${
              pathname.state === ele.name &&
              " font-bold"
            } `}
          >
            {ele.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ScrollNavBar;
