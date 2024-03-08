import React, { useContext, useEffect, useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import LowerNavBar from "./LowerNavBar";
import { UserContext } from "../context/userContext";
import { AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { URL } from "../assests/assets";

const useDebouncedValue = (inputValue, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout successfully!");
  };

  const debouncedSearchTerm = useDebouncedValue(search, 500);

  const fetchSEarchData = async () => {
    try {
      const res = await axios.get(URL + `/post?search=${search}`);
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // API call or other actions to be performed with debounced value
    if (search.length > 0) {
      fetchSEarchData();
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className="  fixed top-0 w-full z-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
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
              onChange={(e) => setSearch(e.target.value)}
            />

            {open && (
              <div className=" no-scrollbar top-[50px] left-0 absolute  bg-white z-10 w-[100%] h-fit max-h-[350px] rounded-md px-3 py-2 flex flex-col gap-2 overflow-y-scroll">
                {data?.length === 0
                  ? "ss"
                  : data?.map((ele, ind) => (
                      <Link
                        to={`/search/result/${ele._id}`}
                        onClick={() => setOpen(!open)}
                      >
                        <div className=" w-full flex h-[75px] gap-2 border hover:border-none hover:bg-gray-200  cursor-pointer">
                          <img
                            src={ele.imageUrl}
                            className=" h-full w-[100px]"
                            alt=""
                          />
                          <div className=" w-full py-2 gap-2 flex flex-col">
                            <p className=" font-semibold">
                              {ele.title.length > 85
                                ? ele.title.slice(0, 85) + "..."
                                : ele.title}
                            </p>

                            <p className="">{ele.category}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
              </div>
            )}
          </div>

          {user ? (
            <>
              <div className=" w-10 h-10">
                <img
                  src={user?.user?.imageUrl}
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

              <Link to={"/create"}>
                <div className="rounded-full flex justify-center items-center cursor-pointer w-fit px-3 h-fit py-2 bg-white hover:bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 hover:text-white hover:shadow-md">
                  Submit a photo
                </div>
              </Link>

              <Link to={"/favorite"}>
                <div className="rounded-full flex justify-center items-center cursor-pointer w-fit px-3 h-fit py-3 bg-white hover:bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 hover:text-white hover:shadow-md">
                  <AiFillHeart fill="red" />
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <div className=" h-10 w-20 rounded-full flex justify-center items-center border cursor-pointer">
                  Login
                </div>
              </Link>

              <Link to={"/create"}>
                <div className="rounded-full flex justify-center items-center cursor-pointer w-fit px-3 h-fit py-2 bg-white hover:bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 hover:text-white hover:shadow-md">
                  Submit a photo
                </div>
              </Link>

              <Link to={"/favorite"}>
                <div className="rounded-full flex justify-center items-center cursor-pointer w-fit px-3 h-fit py-3 bg-white hover:bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 hover:text-white hover:shadow-md">
                  <AiFillHeart className={"fill-gray-500"} />
                </div>
              </Link>
            </>
          )}
        </nav>
        <LowerNavBar />
      </div>
    </>
  );
};

export default Navbar;
