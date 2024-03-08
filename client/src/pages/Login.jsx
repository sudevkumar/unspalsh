import axios from "axios";
import React, { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../assests/assets";
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setLogOut, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (email.length === 0) {
      return toast.error("Name field is mandetory!");
    }

    if (password.length === 0) {
      return toast.error("Name field is mandetory!");
    }
    try {
      const payload = {
        email,
        password,
      };

      const res = await axios.post(URL + "/auth/login", payload);

      if (res.status === 200) {
        localStorage.setItem(
          "token",
          JSON.stringify({ token: res?.data?.token, user: res?.data?.user })
        );
        toast.success("Login successful!");
        navigate("/");
        setLogOut(!logout);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className=" w-full h-[100vh] flex">
      <div className=" w-1/2 h-full ">
        <img
          src="https://images.unsplash.com/photo-1708167437474-04ecd056e05b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className=" h-full w-full object-cover blur-[1px] "
        />
      </div>

      <div className=" w-1/2 h-full flex flex-col p-4 justify-center">
        <h1 className=" text-3xl font-thin text-[#672aba]">Login</h1>
        <div className=" flex flex-col mt-5 gap-5">
          <div className=" flex flex-col ">
            <label htmlFor="" className=" text-sm  font-thin">
              User's Email Id
            </label>
            <input
              type="text"
              className=" border rounded-md mt-2 px-3 py-1   outline-none  font-thin text-sm"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email Id..."
            />
          </div>
          <div className=" flex flex-col ">
            <label htmlFor="" className=" text-sm  font-thin">
              User's Password
            </label>
            <div className=" border rounded-md mt-2  px-3 py-1 flex">
              <input
                type={showPassword ? "text" : "password"}
                className=" w-full rounded-md  outline-none  font-thin text-sm"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password..."
              />
              {showPassword ? (
                <FaRegEye
                  size={22}
                  className=" cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaRegEyeSlash
                  size={22}
                  className=" cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>

          <button
            onClick={handleRegister}
            className=" border py-2 text-[#672aba] hover:text-white hover:bg-[#672aba] outline-none   "
          >
            Login
          </button>

          <p className=" text-sm">
            Dont't have an account?{" "}
            <Link to={"/register"}>
              <span className=" text-sm text-[#672aba] cursor-pointer">
                Register now!
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
