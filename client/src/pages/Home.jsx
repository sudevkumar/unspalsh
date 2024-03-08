import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Gallery from "../components/Gallery";
import { URL, scrollToTop } from "../assests/assets";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllPost = async () => {
    setLoading(true);
    try {
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
    scrollToTop();
  }, []);

  return (
    <div className=" min-h-[100vh] bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
      <Navbar />

      <section className="w-full  top-36 absolute h-fit bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
        {loading ? <Loader /> : <Gallery data={data} />}
      </section>
    </div>
  );
};

export default Home;
