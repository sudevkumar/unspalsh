import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Gallery from "../components/Gallery";

const Home = () => {
  const [images, setImages] = useState([]);

  return (
    <div className=" min-h-[100vh] bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
      <Navbar />
      <Gallery />
    </div>
  );
};

export default Home;
