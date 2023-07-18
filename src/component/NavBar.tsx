import React, { useCallback, useEffect, useRef, useState } from "react";
import { Input, Tabs } from "antd";
import { BookmarkIcon, ClockIcon, LogoutIcon, MenuIcon, SearchIcon, XIcon } from "../asset/svg";
import { useNavigate } from "react-router";
import { Search, getMovie } from "../repositories/api/movie";
import { MovieItem } from "../repositories/interface/movie";
import MovieSearchItem from "./MovieSearchItem";
import { useDispatch, useSelector } from "react-redux";
import { getShowCategory, getShowSearch } from "../redux/selector";
import movieSlice from "../redux/slice/movie";
import Loading from "./Loading";
import { useWindowSize } from "../hook/useWindowSize";
import _ from "lodash";
import { Link } from "react-router-dom";

export const StringToSlug = (string: string) => {
    return string
        .toLowerCase()
        .replaceAll(" ","-")
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
        .replace(/ì|í|ị|ỉ|ĩ/g, "i")
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
        .replace(/đ/g, "d");
};
const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [search, setSearch] = useState<MovieItem[]>();
    const [loading, setLoaing] = useState<boolean>(false);
    const showSearch = useSelector(getShowSearch);
    const showCategory = useSelector(getShowCategory);
    const [width, height] = useWindowSize();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const debounceRef = useRef<_.DebouncedFunc<(value: string) => void>>();
    const Categories = [
        // "Phim Mới",
        // "Phim Bộ",
        // "Phim lẻ",
        // "TV Shows",
        // "Hoạt Hình",
        // "Phim Vietsub",
        // "Phim Thuyết Minh",
        // "Phim Lồng Tiếng",
        // "Phim Bộ Đang Chiếu",
        // "Phim Trọn Bộ",
        // "Phim Sắp Chiếu",
        "Hành Động",
        "Tình Cảm",
        "Hài Hước",
        "Cổ Trang",
        "Tâm Lý",
        "Hình Sự",
        "Chiến Tranh",
        "Thể Thao",
        "Võ Thuật",
        "Viễn Tưởng",
        "Phiêu Lưu",
        "Khoa Học",
        "Kinh Dị",
        "Âm Nhạc",
        "Thần Thoại",
        "Tài Liệu",
        "Gia Đình",
        "Chính kịch",
        "Bí ẩn",
        "Học Đường",
        "Kinh Điển",
    ];
    const years = [
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
    ];
    const handleSearch = useCallback(
        _.debounce((value: string) => {
            if (value.length > 0) {
                Search(value, (res) => {
                    setSearch(res);
                    setLoaing(false);
                });
                setLoaing(false);
            } else {
                setLoaing(false);
                dispatch(movieSlice.actions.setShowSearch(false));
            }
        }, 1000),
        []
    );

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
        dispatch(movieSlice.actions.setShowSearch(false));
        setSearchTerm("");
    };
    const onTabsChange = (key: string) => {
        switch (key) {
            case "3":
                dispatch(movieSlice.actions.setShowCategory(false))
                navigate("/loc-phim");
                break;
            case "4":
                dispatch(movieSlice.actions.setShowCategory(false))
                navigate("/loc-phim/phim-le");

                break;

            default:
                break;
        }
    };

    const renderFillItem = (list: string[], type: string) => {
        return (
            <div className="flex w-full flex-wrap cursor-pointer border-l-[1px] border-[#141414]">
                {list.map((item, index) => {
                    return (
                        <Link
                            to={type === "years" ? "/locphim?nam=" + item : "/the-loai/" + StringToSlug(item)}
                            key={index}
                            onClick={() => dispatch(movieSlice.actions.setShowCategory(false))}
                            className="bg-[#000] p-[10px] hover:text-[#cac9c9] text-[#cac9c9]  hover:bg-[#3e3e3e] w-1/5 text-center border-[2px] text-[13px] border-[#141414] border-t-0 border-l-0"
                        >
                            {item}
                        </Link>
                    );
                })}
            </div>
        );
    };
    const handleSearchClick = () => {
        if (searchTerm.length !== 0) {
            navigate("/tim-kiem/?search=" + searchTerm.replaceAll(" ", "-"))
            dispatch(movieSlice.actions.setShowSearch(false));
            setSearchTerm("");
        }
    }
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
                    {width >= 640 && (
                        <Input
                            className="SearchInput mx-[50px]"
                            onChange={handleChange}
                            placeholder="Nhập từ khóa..."
                            suffix={<div onClick={handleSearchClick}><SearchIcon /></div>}
                            value={searchTerm}
                        />
                    )}
                    <div className="flex gap-[10px]">
                        <div onClick={() => dispatch(movieSlice.actions.setShowCategory(!showCategory))}
                            className={(showCategory ? "bg-[#ffca44] " : "bg-black") +
                                " h-[36px] flex items-center px-[10px] py-[5px] border-[1px] cursor-pointer border-[#404040] hover:opacity-80 "
                            }>
                            {showCategory ? <XIcon fill="#474747"/> : <MenuIcon />}
                        </div>
                        <div className="h-[36px] flex items-center px-[10px] py-[5px] bg-black border-[1px] cursor-pointer border-[#404040] hover:opacity-80">
                            <ClockIcon />
                        </div>
                        <div className="h-[36px] flex items-center px-[10px] py-[5px] bg-black border-[1px] cursor-pointer border-[#404040] hover:opacity-80">
                            <BookmarkIcon />
                        </div>
                        <div className="h-[36px] flex items-center px-[10px] py-[5px] bg-black border-[1px] cursor-pointer border-[#404040] hover:opacity-80">
                            <LogoutIcon />
                        </div>
                    </div>
                </div>
                {width < 640 && (
                    <Input
                        className="SearchInput ml-[10px] w-[calc(100%-10px)]"
                        onChange={handleChange}
                        placeholder="Nhập từ khóa..."
                        suffix={<div onClick={handleSearchClick}><SearchIcon /></div> }
                        value={searchTerm}
                    />
                )}
            </header>

            {showSearch && (
                <div className="text-[#ccc] absolute p-[10px] sm:top-[70px] top-[117px] bg-black w-full max-w-[1100px] z-[100]">
                    <div className="flex justify-between mb-[10px]">
                        <Link to={"/tim-kiem/?search=" + searchTerm.replaceAll(" ", "-")} onClick={handleCloseSearch}>Đến trang tìm kiếm</Link>
                        <div className="cursor-pointer" onClick={handleCloseSearch}>
                            <XIcon />
                        </div>
                    </div>
                    {search && !loading ? (
                        search?.length > 0 ? (
                            <div className="flex flex-wrap">
                                {search?.slice(0, width >= 640 ? 10 : 6).map((item, index) => {
                                    return <MovieSearchItem key={index} movie={item} setSearchTerm={setSearchTerm} />;
                                })}
                            </div>
                        ) : (
                            <div className="text-[14px]">Không tìm thấy phim theo từ khóa</div>
                        )
                    ) : (
                        <Loading className="h-[100px] gray-dot" />
                    )}
                </div>
            )}

            {showCategory && (
                <div className="text-[#ccc] absolute  sm:top-[70px] top-[117px] bg-black w-full max-w-[1100px] z-[100]">
                    <Tabs
                        defaultActiveKey="1"
                        onChange={onTabsChange}
                        items={[
                            {
                                label: "Thể loại",
                                key: "1",
                                children: renderFillItem(Categories, "categories"),
                            },
                            {
                                label: "Năm",
                                key: "2",
                                children: renderFillItem(years, "years"),
                            },
                            {
                                label: "Lọc phim",
                                key: "3",
                            },
                            {
                                label: "Phim lẻ",
                                key: "4",
                            },
                        ]}
                    />
                </div>
            )}
        </div>
    );
};

export default NavBar;
