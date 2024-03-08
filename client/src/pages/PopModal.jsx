import React from "react";
import { RxCross2 } from "react-icons/rx";
import { SlCalender } from "react-icons/sl";
import { FaLocationDot } from "react-icons/fa6";
import { FaHandPointRight } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";

const PopModal = ({ popModal, setOpenPopModal }) => {
  return (
    <div className=" fixed flex flex-col gap-5  top-10 z-30 h-[90vh]  left-0 right-0 w-5/6 mx-auto bg-gray-700 rounded-xl overflow-scroll">
      <div className="  w-full border-b flex justify-between px-6 py-2 items-center">
        <div className=" flex h-12 w-12 rounded-ful gap-3 items-center">
          <img
            src={popModal?.userObject?.user?.imageUrl}
            alt=""
            className=" w-full h-full rounded-full"
          />
          <p className="  font-semibold text-white">
            {popModal?.userObject?.user?.name}
          </p>
        </div>

        <div
          className=" bg-white h-10 w-10 flex justify-center items-center rounded-full cursor-pointer"
          onClick={() => setOpenPopModal(false)}
        >
          <RxCross2 className=" text-rose-600" size={23} />
        </div>
      </div>

      <div className=" w-[80%]  h-[85%]  m-auto">
        <img
          src={popModal?.imageUrl}
          alt=""
          className=" w-full h-full  object-contain"
        />
      </div>

      <p className=" px-6 text-white w-[60%]">{popModal?.title}</p>
      <div className=" flex gap-4 items-center px-6 text-white">
        <BiSolidCategory />
        <p>This photo belongs to {popModal?.category} Category</p>
      </div>

      <div className=" flex gap-4 items-center px-6 text-white">
        <SlCalender />
        <p>Published on {popModal?.createdAt.slice(0, 10)}</p>
      </div>

      <div className=" flex gap-4 items-center px-6 text-white">
        <FaLocationDot />
        <div className=" flex gap-2">
          <p>{popModal?.country}</p>
          <p>{popModal?.state}</p>
          <p>{popModal?.city}</p>
        </div>
      </div>

      <div className=" flex gap-4 items-center px-6 text-white mb-10">
        <FaHandPointRight />
        <p>
          {popModal?.plus
            ? "Free to use under the Unsplash License"
            : "Licensed under the Unsplash+ License"}
        </p>
      </div>
    </div>
  );
};

export default PopModal;
