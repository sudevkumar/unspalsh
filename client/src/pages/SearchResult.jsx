import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../assests/assets";
import Loader from "../components/Loader";
import Gallery from "../components/Gallery";
import Navbar from "../components/Navbar";
import SearchResults from "../components/SearchResults";

const SearchResult = () => {
  const { id } = useParams();
  const [searchResult, setSearchResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSearchResult = async () => {
    try {
      const res = await axios.get(URL + `/post/${id}`);
      setSearchResult(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearchResult();
  }, [id]);
  return (
    <div className=" min-h-[100vh] bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
      <Navbar />

      <section className="w-full  top-36 absolute h-fit bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">
        {loading ? <Loader /> : <SearchResults data={searchResult} />}
      </section>
    </div>
  );
};

export default SearchResult;
