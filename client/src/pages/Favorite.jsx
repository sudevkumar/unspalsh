import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Gallery from "../components/Gallery";
import axios from "axios";
import toast from "react-hot-toast";
import { URL } from "../assests/assets";
import "../components/gallery.css";
import { AiFillHeart } from "react-icons/ai";
import { IoMdDownload } from "react-icons/io";
import { Link } from "react-router-dom";
import NoProduct from "../components/NoProduct";
import PopModal from "./PopModal";

const Favorite = () => {
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState(false);
  const [popModal, setPopModal] = useState("");
  const [openPopModal, setOpenPopModal] = useState(false);

  const handleOpenPopModal = (item) => {
    setOpenPopModal(true);
    setPopModal(item);
  };

  const user = JSON.parse(localStorage.getItem("token")) || null;

  const [favList, setFavList] = useState([]);
  console.log(favList);

  const handleFavorite = async (e, item, userID) => {
    if (!user?.token) {
      return toast.error("You need to login first!");
    }
    const payload = {
      userID: user?.user?._id,
      mainUserID: userID,
      postID: e,
      postObject: item,
    };

    var count = 0;
    for (let i = 0; i < favList.length; i++) {
      if (favList[i].postID === e) {
        await axios.delete(URL + `/fav/${favList[i]._id}`, {
          headers: {
            Authorization: user?.token,
            "Content-Type": "application/json",
          },
        });
        getAllFavouritesItem();
        toast.success("Item is removed from favorite list!");
        setDatas(!datas);
        return;
      } else {
        count++;
      }
    }

    if (count === favList.length) {
      await axios.post(URL + "/fav/create", payload, {
        headers: {
          Authorization: user?.token,
          "Content-Type": "application/json",
        },
      });
      getAllFavouritesItem();
      toast.success("Item is added to favorite list!");
      setDatas(!datas);
    }
  };

  const createRedFillHeart = (id) => {
    console.log(id, "kj");
    var array = [];
    for (let i = 0; i < favList.length; i++) {
      if (favList[i] !== undefined) {
        array.push(favList[i].postID);
      }
    }

    return array;
  };

  const getAllFavouritesItem = async () => {
    try {
      setLoading(true);
      const res = await axios.get(URL + `/fav/prod/${user?.user?._id}`, {
        headers: {
          Authorization: user?.token,
          "Content-Type": "application/json",
        },
      });
      setFavList(res?.data);
      createRedFillHeart();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllFavouritesItem();
  }, [datas]);
  return (
    <>
      <div className=" min-h-[100vh] bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
        <Navbar />

        <section className="w-full  top-36 absolute h-fit bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
          {loading ? (
            <Loader />
          ) : favList.length === 0 ? (
            <NoProduct title="You have no favorite Images." />
          ) : (
            <div className="mainGallery">
              <div className="gallery">
                {favList.map((item, index) => {
                  return (
                    <div className="pics" key={index}>
                      <img
                        src={item?.postObject?.imageUrl}
                        alt={item.title}
                        style={{ width: "100%" }}
                        onClick={() => handleOpenPopModal(item?.postObject)}
                      />

                      <div
                        className=" assets absolute top-4 right-4 hidden h-fit w-fit bg-white p-2 px-3 rounded-md"
                        onClick={() =>
                          handleFavorite(
                            item?.postObject?._id,
                            item?.postObject,
                            item?.userID
                          )
                        }
                      >
                        <AiFillHeart
                          size={23}
                          className={
                            createRedFillHeart(item?.postID).find(
                              (ele, ind) => ele === item?.postObject?._id
                            )
                              ? " fill-rose-500"
                              : "fill-gray-500"
                          }
                        />
                      </div>

                      {item.plus && (
                        <div className=" assets absolute top-4 left-4 h-fit w-fit bg-black opacity-[0.7] text-sm p-1 px-4 rounded-full font-semibold  text-white">
                          PhotoFy+
                        </div>
                      )}

                      <Link to={`/userprofile/${item?.userID}`}>
                        <div className=" assets absolute bottom-2 left-4 hidden h-fit w-fit rounded-md">
                          <div className=" flex h-12 w-12 rounded-full bg-white">
                            <img
                              src={item?.postObject?.userObject?.user?.imageUrl}
                              alt=""
                              className=" w-full h-full rounded-full"
                            />
                          </div>
                          <p>{item?.postObject?.userObject?.user?.name}</p>
                        </div>
                      </Link>

                      <div className=" assets absolute bottom-2 right-4 hidden h-fit w-fit bg-white p-2 px-3 rounded-md">
                        <IoMdDownload size={23} fill="gray" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>

      {openPopModal && (
        <PopModal popModal={popModal} setOpenPopModal={setOpenPopModal} />
      )}
    </>
  );
};

export default Favorite;
