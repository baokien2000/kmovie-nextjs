import React, { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "antd";
import { BookmarkIcon, ClockIcon, LogoutIcon, MenuIcon, SearchIcon, XIcon } from "../asset/svg";
import { useNavigate } from "react-router";
import { debounce } from "lodash";
import { Search, getMovie } from "../repositories/api/movie";
import { Imovie, MovieItem } from "../repositories/interface/movie";
import MovieSearchItem from "./MovieSearchItem";
import { useDispatch, useSelector } from "react-redux";
import { getShowSearch } from "../redux/selector";
import movieSlice from "../redux/slice/movie";
import Loading from "./Loading";
import { useWindowSize } from "../hook/useWindowSize";
import _ from 'lodash';
import MyComponent from "./test";

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [search, setSearch] = useState<MovieItem[]>();
    const [loading, setLoaing] = useState<boolean>(false);
    const showSearch = useSelector(getShowSearch);
    const [width, height] = useWindowSize()
    const [inputSearch, setInputSearch] = useState("")
    const [searchTerm, setSearchTerm] = useState<string>("");
    const debounceRef = useRef<_.DebouncedFunc<((value: string) => void)>>();

    const handleSearch = useCallback(
        _.debounce((value: string) => {
            if (value.length > 0) {
                    Search(value, (res) => {
                        setSearch(res);
                        console.log("res",res);
                        setLoaing(false);
                    });
                    setLoaing(false);
           
               
            } else {
                setLoaing(false);
                dispatch(movieSlice.actions.setShowSearch(false));
            }
        }, 1000)
        , []
    )

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //Debounce
        setSearchTerm(event.target.value);
        if (debounceRef.current) {
          debounceRef.current.cancel();
        }
        debounceRef.current = handleSearch;
        debounceRef.current(event.target.value);

        //Show suggesstion
        if (showSearch === false) {
            dispatch(movieSlice.actions.setShowSearch(true));
        }
        setLoaing(true);
      };
    
    const handleCloseSearch = () => {
        dispatch(movieSlice.actions.setShowSearch(false))
        setSearchTerm("")
    };

    return (
        <div className="w-full max-w-[1100px]">
            <header className="App-header border-b-[1px] border-b-[#424242] bg-[#2d2d2d] flex flex-col h-[117px] sm:h-[70px] w-full pr-[10px] pb-[10px] max-w-[1100px] ">
                <div className="h-[70px] w-full  flex items-center justify-between">
                
                <img
                    onClick={() => navigate("/")}
                    className="object-cover cursor-pointer h-full "
                    src={width >= 640 ? "/logo_sm_light.png" : "/Icon_light.png"}
                    alt="Logo"
                />
                {width >= 640 && <Input
                    className="SearchInput mx-[50px]"
                    onChange={handleChange}
                    placeholder="Nhập từ khóa..."
                        suffix={<SearchIcon />}
                        value={searchTerm}
                    />}
                <div className="flex gap-[10px]">
                    {/* {width < 640 && <div className="h-[36px] flex items-center px-[10px] py-[5px] bg-black border-[1px] cursor-pointer border-[#404040] ">
                        <SearchIcon />
                    </div>} */}
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
       
                </div>
                {width < 640 && <Input
                className="SearchInput ml-[10px] w-[calc(100%-10px)]"
                onChange={handleChange}
                    placeholder="Nhập từ khóa..."
                        suffix={<SearchIcon />}
                        value={searchTerm}
                    />}
            </header>
 
            {showSearch && (
                <div className="text-[#ccc] absolute p-[10px] sm:top-[70px] top-[117px] bg-black w-full max-w-[1100px] z-[100]">
                    <div className="flex justify-between mb-[10px]">
                        <span>Đến trang tìm kiếm</span>
                        <div
                            className="cursor-pointer"
                            onClick={handleCloseSearch}
                        >
                            <XIcon />
                        </div>
                    </div>
                    {search && !loading  ? (
                         search?.length > 0 ? <div className="flex flex-wrap">
                            {search?.slice(0, width >= 640 ? 10 : 10).map((item, index) => {
                                return <MovieSearchItem key={index} movie={item} setSearchTerm={setSearchTerm} />;
                            })}
                        </div> : <div className="text-[14px]">Không tìm thấy phim theo từ khóa</div>
                    ) : (
                        <Loading className="h-[100px] gray-dot" />
                    )}
                </div>
            )}
        </div>
    );
};

export default NavBar;
