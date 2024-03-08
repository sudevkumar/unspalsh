import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import  { Toaster } from 'react-hot-toast';
import Home from "./pages/Home";
import CategoryWallPaper from "./pages/CategoryWallPaper";
import PhotoFyPlus from "./pages/PhotoFyPlus";
import CreateAPost from "./pages/CreateAPost";
import NotAccess from "./pages/NotAccess";
import UserProfile from "./pages/UserProfile";
import Favorite from "./pages/Favorite";
import SearchResult from "./pages/SearchResult";


function App() {
  // const {token} = JSON.parse(localStorage.getItem("token"))
  const user = JSON.parse(localStorage.getItem("token")) || null;
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/wallpapers/:cat" element={<CategoryWallPaper />} />
        <Route path="/photoFy+" element={<PhotoFyPlus />} />
        <Route path="/userprofile/:userID" element={<UserProfile />} />
        <Route path="/search/result/:id" element={<SearchResult />} />
        <Route path="/create" element={user !== null ? <CreateAPost />: <NotAccess /> }/> 
        <Route path="/favorite" element={user !== null ? <Favorite />: <NotAccess /> }/> 
      </Routes>
    </div>
  );
}

export default App;
