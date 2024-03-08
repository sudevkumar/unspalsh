import React, { useContext, useEffect, useState } from "react";
import "./gallery.css";
import { AiFillHeart } from "react-icons/ai";
import { IoMdDownload } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL as URLS } from "../assests/assets";
import toast from "react-hot-toast";
import PopModal from "../pages/PopModal";
import { saveAs } from "file-saver";

const Gallery = ({ data }) => {
  const [datas, setDatas] = useState(false);
  const [popModal, setPopModal] = useState("");
  const [openPopModal, setOpenPopModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("token")) || null;
  const navigte = useNavigate();

  const [favList, setFavList] = useState([]);

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
        await axios.delete(URLS + `/fav/${favList[i]._id}`, {
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
      await axios.post(URLS + "/fav/create", payload, {
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
      const res = await axios.get(URLS + `/fav/prod/${user?.user?._id}`, {
        headers: {
          Authorization: user?.token,
          "Content-Type": "application/json",
        },
      });
      setFavList(res?.data);
      createRedFillHeart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenPopModal = (item) => {
    setOpenPopModal(true);
    setPopModal(item);
  };

  useEffect(() => {
    getAllFavouritesItem();
  }, [datas]);

  const handlePlusLock = (e, ee, url, title) => {
    if (e === true && ee === true) {
      toast.success("Download successful!");
      downLoadImage(url, title.split(" ")[0]);
      return true;
    } else if (e === true && ee === false) {
      toast.success("Download successful!");
      downLoadImage(url, title.split(" ")[0]);
      return true;
    } else if (e === false && ee === false) {
      toast.success("Download successful!");
      downLoadImage(url, `PhotoFy ${title.split(" ")[0]}`);
      return true;
    } else if (e === false && ee === true) {
      navigte("/photoFy+");
      toast.error("You have to take a subscription first!");
      return false;
    } else if (!user && ee === false) {
      toast.success("Download successful!");
      downLoadImage(url, `PhotoFy ${title.split(" ")[0]}`);
    } else if (!user && ee === true) {
      navigte("/");
      toast.error("You need to login first!");
    }
  };

  return (
    <>
      <div className="mainGallery mb-10">
        <div className="gallery">
          {data.map((item, index) => {
            return (
              <div className="pics" key={index}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{ width: "100%" }}
                  onClick={() => handleOpenPopModal(item)}
                />

                <div
                  className=" assets absolute top-4 right-4 hidden h-fit w-fit bg-white p-2 px-3 rounded-md"
                  onClick={() => handleFavorite(item._id, item, item.userID)}
                >
                  <AiFillHeart
                    size={23}
                    className={
                      createRedFillHeart(item?._id).find(
                        (ele, ind) => ele === item?._id
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
                  <div className=" assets absolute bottom-2 left-4 hidden h-fit w-fit  rounded-md">
                    <div className=" flex h-12 w-12 rounded-full bg-white">
                      <img
                        src={item?.userObject?.user?.imageUrl}
                        alt=""
                        className=" w-full h-full rounded-full"
                      />
                    </div>
                    <p className=" w-48">{item?.userObject?.user?.name}</p>
                  </div>
                </Link>

                <div
                  className=" assets absolute bottom-2 right-4 hidden h-fit w-fit bg-white p-2 px-3 rounded-md"
                  onClick={() =>
                    handlePlusLock(
                      user?.user?.plus,
                      item?.plus,
                      item?.imageUrl,
                      item?.title
                    )
                  }
                >
                  <IoMdDownload size={23} fill="gray" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {openPopModal && (
        <PopModal popModal={popModal} setOpenPopModal={setOpenPopModal} />
      )}
    </>
  );
};

export default Gallery;

const downLoadImage = async (imageSrc, imageName) => {
  const imageBlob = await fetch(imageSrc)
    .then((res) => res.arrayBuffer())
    .then((buffer) => new Blob([buffer], { type: "image/jpeg" }));
  console.log(imageBlob, "kjkjh");

  const link = document.createElement("a");
  link.href = URL.createObjectURL(imageBlob);
  link.download = imageName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
