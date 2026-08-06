import React, { useState } from "react";
import "./App.css";
import NavBar from "./component/NavBar";
import { Home } from "./page/Home";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Movie from "./page/MovieDetails";
import MovieWatch from "./page/MovieWatch";
import Search from "./page/Search";
import Category from "./page/Category";
import UpdateMovies from "./page/UpdateMovies";
import UpdateMoviesV2 from "./page/UpdateMoviesV2";


function App() {

    return (
      <div className="App bg-[black] min-h-[100vh]  flex flex-col items-center ">
        <Router>
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="phim/:slug/" element={<Movie />} />
            <Route path="phim/:slug/:EpisodeSlug" element={<MovieWatch />} />
            <Route path="tim-kiem/" element={<Search />} />
            <Route path="test/" element={<UpdateMovies />} />
            <Route path="upload-movies/" element={<UpdateMoviesV2 />} />
            <Route path="the-loai/:CategorySlug" element={<Category />} />
            <Route path="/*" element={<div className="text-[red] ">404</div>} />
          </Routes>
          <div className="text-[#fff]/[.3] border-t-[1px] border-[#424242] max-w-[1100px] w-full bg-[#2d2d2d] text-center pt-[10px] pb-[30px] text-[12px]">
            Trang web này chỉ được tạo ra với mục đích học tập và nghiên cứu.
            <br />
            Tất cả các nội dung được sử dụng trên trang web này đều được lấy từ các nguồn công khai.
            <br />
            Chúng tôi không có bất kỳ mục đích thương mại nào và không có liên quan gì đến vấn đề bản quyền.
            <br />
            Nếu có bất kỳ vấn đề gì liên quan đến bản quyền, chúng tôi sẽ sẵn sàng hợp tác và thực hiện các biện pháp cần thiết để giải quyết vấn đề
            này
          </div>
        </Router>
        {/* <Home /> */}
      </div>
    );
}

export default App;
