import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { URL } from "../assests/assets";
import axios from "axios";
import Loader from "../components/Loader";
import Gallery from "../components/Gallery";
import NoProduct from "../components/NoProduct";
import { useLocation, useParams } from "react-router-dom";

const CategoryWallPaper = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  console.log(location);

  const getAllPost = async () => {
    setLoading(true);
    try {
      const res = await axios.get(URL + `/post/cat/${location.state}`);
      setData(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPost();
  }, [location.state]);

  return (
    <div className=" min-h-[100vh] bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
      <Navbar />

      <section className="w-full  top-36 absolute h-fit bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
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

export default CategoryWallPaper;
