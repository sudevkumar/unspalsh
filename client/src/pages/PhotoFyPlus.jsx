import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Gallery from "../components/Gallery";
import axios from "axios";
import { URL, scrollToTop } from "../assests/assets";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import NoProduct from "../components/NoProduct";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const PhotoFyPlus = () => {
  const [selectedValue, setSelectedValue] = useState("year");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { setUser, user, logout, setLogOut } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("token")) || null;
  console.log(user);
  const navigate = useNavigate();

  const getAllPost = async () => {
    try {
      setLoading(true);
      const res = await axios.get(URL + "/post");
      setData(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  const hanadlePhotoFyPlus = async () => {
    if (!user) {
      return toast.error("You need to login first!");
    }

    const payload = {
      name: user?.user?.name,
      email: user?.user?.email,
      password: user?.user?.password,
      plus: !user?.user?.plus,
    };

    try {
      const res = await axios.put(URL + `/user/${user?.user?._id}`, payload, {
        headers: {
          Authorization: user?.token,
          "Content-Type": "application/json",
        },
      });
      navigate("/");
      localStorage.removeItem("token");
      localStorage.setItem(
        "token",
        JSON.stringify({ token: user?.token, user: res?.data })
      );

      // setUser({ token: user?.token, user: res?.data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className=" min-h-[100vh] h-auto bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
      <Navbar />
      <div className=" w-full top-32 absolute h-auto bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
        <div className=" h-[75vh] w-full flex justify-center mt-10 mb-24 relative">
          <img
            className=" h-full w-[90%] rounded-2xl object-cover"
            src="https://images.unsplash.com/photo-1535459548739-91d8b0a25e3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <div className=" absolute top-0 left-28 h-full w-[120%]">
            <div className=" w-[400px] h-full bg-black rounded-2xl -skew-x-12  mix-blend-saturation"></div>
            <div className=" w-[400px] h-full bg-black top-0 -left-[42px] shadow-sm absolute rounded-2xl mix-blend-saturation"></div>
            <div className=" w-1/2  h-full absolute top-0 -left-[42px] px-16 py-10 text-white flex flex-col gap-3">
              <p className=" w-full text-white text-4xl font-bold">
                Premium, ready to use images.{" "}
              </p>

              <p className=" w-full text-white text-4xl font-bold">
                Get{" "}
                <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
                  unlimited
                </span>{" "}
                access.
              </p>

              <p className=" flex items-center gap-2">
                <div className=" h-3 w-3 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400  bg-clip-border text-transparent"></div>
                Members-only content added monthly
              </p>

              <p className=" flex items-center gap-2">
                <div className=" h-3 w-3 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400  bg-clip-border text-transparent"></div>
                Unlimited royalty-free downloads
              </p>

              <p className=" flex items-center gap-2">
                <div className=" h-3 w-3 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400  bg-clip-border text-transparent"></div>
                Enhanced legal protections
              </p>

              <div className=" flex gap-7 items-center">
                <div className=" flex items-center gap-3">
                  <input
                    type="radio"
                    name=""
                    id="year"
                    value={"year"}
                    checked={selectedValue === "year"}
                    onChange={() => handleRadioChange("year")}
                  />
                  <label htmlFor="year">Yearly</label>
                  <p className=" px-1 py-1 text-[9px] border rounded-full">
                    66% off
                  </p>
                </div>

                <div>
                  <input
                    type="radio"
                    name=""
                    id="month"
                    value={"month"}
                    checked={selectedValue === "month"}
                    onChange={() => handleRadioChange("month")}
                  />
                  <label htmlFor="month">Monthly</label>
                </div>
              </div>

              {selectedValue === "year" && (
                <div className=" flex gap-6">
                  <strong className="  line-through text-5xl text-gray-500">
                    $12
                  </strong>
                  <div className=" flex gap-2">
                    <strong className=" text-5xl text-white">$4</strong>
                    <div className=" flex flex-col -gap-1 text-sm  justify-center">
                      <p>USD</p>
                      <p>per month*</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="  w-[38%] h-auto mt-4">
                <button
                  className="border w-full py-3 rounded-md hover:border-0 text-white hover:bg-gradient-to-r from-pink-500 to-cyan-400"
                  onClick={hanadlePhotoFyPlus}
                >
                  {user?.user?.plus === true
                    ? "Cancle Subscription"
                    : "Get PhotoFy+"}
                </button>
              </div>

              <div className="w-[30%]">
                <p className=" text-[11px]  text-gray-300 leading-5 tracking-wide	">
                  <span className="">*Switch to yearly</span> to get 66% off
                  Renews automatically. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
      <section className="w-full  top-[650px] absolute h-fit mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
        {loading ? (
          <Loader />
        ) : data.length === 0 ? (
          <NoProduct title="Sorry we don't have any photos in this category" />
        ) : (
          <Gallery data={data} />
        )}
      </section>
    </div>
  );
};

export default PhotoFyPlus;
