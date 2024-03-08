import React from "react";
import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className=" flex justify-center items-center w-full h-[80vh]">
      <PuffLoader size={100} color="white" />
    </div>
  );
};

export default Loader;
