import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Image } from "cloudinary-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { URL } from "../assests/assets";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsplash");

    fetch("https://api.cloudinary.com/v1_1/sudevkumar/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.secure_url);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleRegister = async () => {
    try {
      const payload = {
        name,
        email,
        password,
        imageUrl,
      };

      console.log(payload)
  
      const res = await axios.post(URL + "/auth/register", payload)
      if (res.status === 200) {
       
        toast.success("Register successful!");
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
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
        <h1 className=" text-3xl font-thin text-[#672aba]">Register</h1>
        <div className=" flex flex-col mt-5 gap-5">
          <div className=" flex flex-col ">
            <label htmlFor="" className=" text-sm  font-thin">
              User's Name
            </label>
            <input
              type="text"
              className=" border-b  outline-none py-1 font-thin text-sm"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=" flex flex-col ">
            <label htmlFor="" className=" text-sm  font-thin">
              User's Email Id
            </label>
            <input
              type="text"
              className=" border-b  outline-none py-1 font-thin text-sm "
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" flex flex-col ">
            <label htmlFor="" className=" text-sm  font-thin">
              User's Password
            </label>
            <div className=" border-b flex">
              <input
                type={showPassword ? "text" : "password"}
                className=" w-full  outline-none py-1 font-thin text-sm"
                onChange={(e) => setPassword(e.target.value)}
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

          <div className=" flex flex-col ">
            <label htmlFor="" className=" text-sm  font-thin mb-3">
              User's Profile Photo
            </label>
            <div className=" flex">
              <input
                type="file"
                className=" outline-none py-1 font-thin text-sm"
                onChange={handleImageUpload}
              />
              {imageUrl && (
                <div className=" h-16 w-16 rounded-full border-2    ">
                  <Image
                    cloudName="sudevkumar"
                    publicId={imageUrl}
                    className=" h-full w-full rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleRegister}
            className=" border py-2 text-[#672aba] hover:text-white hover:bg-[#672aba] outline-none   "
          >
            Register
          </button>

          <p className=" text-sm">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className=" text-sm text-[#672aba]">Login now!</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
