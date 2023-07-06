import React from "react";
import { Input } from "antd";
import { BookmarkIcon, ClockIcon, LogoutIcon, MenuIcon, SearchIcon } from "../asset/svg";
const NavBar = () => {
    return (
        <header className="App-header border-b-[1px] border-b-[#424242] bg-[#2d2d2d] h-[70px] w-full pr-[10px] flex items-center justify-between max-w-[1100px] ">
            <img className="object-cover h-full " src="./logo_sm.png" alt="Logo" />
            <Input className="mx-[50px]" placeholder="Nhập từ khóa..." suffix={<SearchIcon />} />
            <div className="flex gap-[10px]">
            <div className="h-[36px] flex items-center px-[10px] hidden py-[5px] bg-black border-[1px] cursor-pointer border-[#404040] ">
                    <SearchIcon />
                </div>
                <div className="h-[36px] flex items-center px-[10px] py-[5px] bg-black border-[1px] cursor-pointer border-[#404040] ">
                    <MenuIcon />
                </div>
                <div className="h-[36px] flex items-center px-[10px] py-[5px] bg-black border-[1px] cursor-pointer border-[#404040] ">
                    <ClockIcon />
                </div>
                <div className="h-[36px] flex items-center px-[10px] py-[5px] bg-black border-[1px] cursor-pointer border-[#404040] ">
                    <BookmarkIcon />
                </div>
                <div className="h-[36px] flex items-center px-[10px] py-[5px] bg-black border-[1px] cursor-pointer border-[#404040] ">
                    <LogoutIcon />
                </div>
            </div>
        </header>
    );
};

export default NavBar;
