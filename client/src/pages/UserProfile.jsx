import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { URL, scrollToTop } from "../assests/assets";
import axios from "axios";
import { useParams } from "react-router-dom";
import Gallery from "../components/Gallery";
import Loader from "../components/Loader";

const UserProfile = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const getAllPost = async () => {
    try {
      setLoading(true);
      const res = await axios.get(URL + `/post/user/${params.userID}`);
      setData(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getUserByID = async () => {
    try {
      const res = await axios.get(URL + `/user/${params.userID}`);
      setUser(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPost();
    getUserByID();
    scrollToTop();
  }, []);
  return (
    <div className=" min-h-[100vh] bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
      <Navbar />

      <section className=" w-full top-32 absolute h-fit bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
        <div className=" w-full h-96  text-white flex justify-center items-center gap-5">
          <div className=" w-56 h-56 rounded-full">
            <img
              src={user?.imageUrl}
              alt=""
              className=" h-full w-full rounded-full object-cover"
            />
          </div>
          <div className=" w-96 h-56 flex flex-col justify-center gap-4 ">
            <p className=" text-4xl font-bold">{user?.name}</p>
            <p>{user?.desc}</p>
          </div>
        </div>

        <hr className=" mb-5" />
        {loading ? <Loader /> : <Gallery data={data} />}
      </section>
    </div>
  );
};

export default UserProfile;
