import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Image } from "cloudinary-react";
import { Country, State, City } from "country-state-city";
import { UserContext } from "../context/userContext";
import { URL, categories } from "../assests/assets";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAPost = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");

  // Country
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesCount, setCountriesCount] = useState(1);

  // State
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [statesCount, setStatesCount] = useState(0);

  // City
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [category, setCategory] = useState("");
  const [plus, setPlus] = useState(false);
  const { user } = useContext(UserContext);
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

  const getAllContries = () => {
    setCountries(Country?.getAllCountries());
  };

  const getAllStateOfCountry = () => {
    const countryCode = countries.find((ele, ind) => ele.name === country);

    setStates(State.getStatesOfCountry(countryCode?.isoCode));
  };

  const getAllCityeOfState = () => {
    const stateCode = states.find((ele, ind) => ele.name === state);
    const countryCode = countries.find((ele, ind) => ele.name === country);
    setCities(City.getCitiesOfState(countryCode?.isoCode, stateCode?.isoCode));
  };

  useEffect(() => {
    getAllContries();
  }, []);

  useEffect(() => {
    if (countriesCount > 0) {
      getAllStateOfCountry();
    }
  }, [countriesCount]);

  useEffect(() => {
    if (statesCount > 0) {
      getAllCityeOfState();
    }
  }, [statesCount]);

  const handleCreatePost = async () => {
    try {
      if (title === "") {
        return toast.error("Title field is mandatory");
      }

      if (imageUrl === "") {
        return toast.error("Image field is mandatory");
      }


      if (category === "") {
        return toast.error("Category field is mandatory");
      }

      const payload = {
        title: title,
        imageUrl: imageUrl,
        userID: user.user._id,
        userObject: user,
        city: city,
        state: state,
        country: country,
        category: category,
        plus: plus,
      };

      const res = await axios.post(URL + "/post/create", payload, {
        headers: {
          Authorization: user?.token,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        toast.success("Post created successfully!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" min-h-[100vh] bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
      <Navbar />

      <section className=" h-fit top-32 absolute w-full bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 px-8 py-6">
        <h1 className=" text-3xl mb-4 text-white">Create A New Post</h1>
        <div className=" flex flex-col gap-5">
          <div className=" w-full h-96 flex justify-center items-center bg-[#EEEEEE] rounded-md">
            {imageUrl.length === 0 ? (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                alt=""
                className=" h-48 w-48 "
              />
            ) : (
              <Image
                cloudName="sudevkumar"
                publicId={imageUrl}
                className=" h-full w-full rounded-md object-cover"
              />
            )}
          </div>
          <div className=" w-10">
            <input
              type="file"
              className=" outline-none py-1 font-thin text-sm text-white"
              onChange={handleImageUpload}
            />
          </div>

          <div className=" grid grid-cols-2 gap-3">
            <input
              type="text"
              name=""
              className=" py-2 px-3 outline-none rounded-md"
              id=""
              placeholder="Enter your post title..."
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              name=""
              id=""
              className=" py-2 px-3 outline-none rounded-md"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((ele, ind) => (
                <option key={ele.name} value={ele.name}>
                  {ele.name}
                </option>
              ))}
            </select>

            <select
              name=""
              id=""
              className=" py-2 px-3 outline-none rounded-md"
              onChange={(e) => {
                setCountry(e.target.value);
                setCountriesCount((prev) => prev + 1);
              }}
            >
              <option value="">Select your country</option>
              {countries?.map((ele, ind) => (
                <option key={ele.name} value={ele.name}>
                  {ele.name}
                </option>
              ))}
            </select>

            <select
              name=""
              id=""
              className=" py-2 px-3 outline-none rounded-md"
              onChange={(e) => {
                setStatesCount((prev) => prev + 1);
                setState(e.target.value);
              }}
            >
              <option value="">Select your state</option>
              {states?.map((ele, ind) => (
                <option key={ele.name} value={ele.name}>
                  {ele.name}
                </option>
              ))}
            </select>

            <select
              name=""
              id=""
              className=" py-2 px-3 outline-none rounded-md"
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select your city</option>
              {cities?.map((ele, ind) => (
                <option key={ele.name} value={ele.name}>
                  {ele.name}
                </option>
              ))}
            </select>

            <label htmlFor="" className=" flex gap-2 items-center text-white">
              <input
                type="checkbox"
                name=""
                id=""
                className=" h-5 w-5 cursor-pointer"
                checked={plus && true}
                onChange={(e) => setPlus(e.target.checked)}
              />
              PhotoFy+ or not?
            </label>
          </div>

          <div className=" w-full  h-auto ">
            <button
              className=" w-fit px-10 py-2 bg-white m-auto block"
              onClick={handleCreatePost}
            >
              Create A Post
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateAPost;
