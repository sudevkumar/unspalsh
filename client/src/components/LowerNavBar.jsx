import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ScrollNavBar from "./ScrollNavBar";

const LowerNavBar = () => {
  const { pathname } = useLocation();

  return (
    <div className=" text-white flex  gap-6 py-2 px-8 border-b">
      {/* Left */}
      <div className=" w-[15%]  h-10 flex gap-6 justify-center  items-center">
        <Link to={"/"}>
          <p className={` cursor-pointer ${pathname === "/" && "underline"}`}>
            Editorial
          </p>
        </Link>

        <Link to={"/photoFy+"}>
          <p
            className={` cursor-pointer ${
              pathname === "/photoFy+" && "underline"
            }`}
          >
            PhotoFy+
          </p>
        </Link>

        <div className=" h-8 w-[0.2px] border"></div>
      </div>
      {/* right */}

      <ScrollNavBar />
    </div>
  );
};

export default LowerNavBar;
