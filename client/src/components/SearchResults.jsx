import React from "react";
import { SlCalender } from "react-icons/sl";
import { FaLocationDot } from "react-icons/fa6";
import { FaHandPointRight } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";

const SearchResults = ({ data }) => {
  console.log(data);
  return (
    <div className="">
      <div className=" w-full h-[450px] flex gap-3 ">
        <img
          src={data?.imageUrl}
          alt=""
          className=" w-[400px] h-full object-contain"
        />

        <div className="  flex flex-col gap-4 ">
          <p className=" text-white">{data?.title}</p>
          <div className=" flex gap-4 items-center text-white">
            <BiSolidCategory />
            <p>This photo belongs to {data?.category} Category</p>
          </div>

          <div className=" flex gap-4 items-center  text-white">
            <SlCalender />
            <p>Published on {data?.createdAt?.slice(0, 10)}</p>
          </div>

          <div className=" flex gap-4 items-center text-white">
            <FaLocationDot />
            <div className=" flex gap-2">
              <p>{data?.country}</p>
              <p>{data?.state}</p>
              <p>{data?.city}</p>
            </div>
          </div>

          <div className=" flex gap-4 items-center text-white">
            <FaHandPointRight />
            <p>
              {data?.plus
                ? "Free to use under the Unsplash License"
                : "Licensed under the Unsplash+ License"}
            </p>
          </div>

          <div className=" flex gap-4 items-center  text-white">
            <div className=" w-20 h-20 bg-white rounded-full">
              <img
                src={data?.userObject?.user?.imageUrl}
                alt=""
                className=" h-full w-full rounded-full object-cover"
              />
            </div>
            <p>Posted by {data?.userObject?.user?.name}</p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default SearchResults;
