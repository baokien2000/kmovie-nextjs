import React from "react";
import { RefreshIcon } from "../asset/svg";
import { Button } from "antd";
import { Imovie } from "../repositories/interface/movie";

interface Prop {
    info: Imovie;
}
const Comment = (props: Prop) => {
    const { info } = props;
    return (
        <div className="flex flex-col p-[10px] mt-[10px] bg-[#404040] rounded-[5px] text-[#ccc] mb-[50px]">
            <div className="flex justify-between w-full">
                <h3 className="font-semibold mt-[5px]">Bình luận</h3>
                <RefreshIcon fill={"#ccc"} />
            </div>
            <div className="flex flex-col gap-[5px] items-center">
                <Button className="MovieWatchBtn bg-[#ffce4f] my-[10px]">Đăng nhập để bình luận</Button>
                <div className="flex bg-[#171717] rounded-[5px] p-[10px] w-full">
                    <img
                        className="h-[60px] w-[60px] object-cover border-[3px] border-[#656565] rounded-[8px]"
                        src={info.movie.thumb_url}
                        alt="avatar"
                    />
                    <div className="flex-1 flex flex-col ml-[10px]">
                        <div className=" font-bold text-[#ffce4f] text-[14px]">Bảo Kiên</div>
                        <div className="text-[#afaaaa] text-[13px] pb-[5px] break-all">Test bình luận</div>
                        <div className="text-[#7d7d7d] text-[12px]">1 giờ trước</div>
                    </div>
                </div>
                <div className="flex bg-[#171717] rounded-[5px] p-[10px] w-full">
                    <img
                        className="h-[60px] w-[60px] object-cover border-[3px] border-[#656565] rounded-[8px]"
                        src={info.movie.thumb_url}
                        alt="avatar"
                    />
                    <div className="flex-1 flex flex-col ml-[10px]">
                        <div className=" font-bold text-[#ffce4f] text-[14px]">Bảo Kiên</div>
                        <div className="text-[#afaaaa] text-[13px] pb-[5px] break-all">Test bình luận</div>
                        <div className="text-[#7d7d7d] text-[12px]">1 giờ trước</div>
                    </div>
                </div>
                <div className="border-l-[1px] border-[#000]   flex flex-col gap-[5px] w-[calc(100%-35px)] pl-[15px] ml-[35px]">
                    <div className="flex bg-[#171717] rounded-[5px] p-[10px] w-full">
                        <img
                            className="h-[60px] w-[60px] object-cover border-[3px] border-[#656565] rounded-[8px]"
                            src={info.movie.thumb_url}
                            alt="avatar"
                        />
                        <div className="flex-1 flex flex-col ml-[10px]">
                            <div className=" font-bold text-[#ffce4f] text-[14px]">Bảo Kiên</div>
                            <div className="text-[#afaaaa] text-[13px] pb-[5px] break-all">Test bình luận</div>
                            <div className="text-[#7d7d7d] text-[12px]">1 giờ trước</div>
                        </div>
                    </div>
                    <div className="flex bg-[#171717] rounded-[5px] p-[10px] w-full">
                        <img
                            className="h-[60px] w-[60px] object-cover border-[3px] border-[#656565] rounded-[8px]"
                            src={info.movie.thumb_url}
                            alt="avatar"
                        />
                        <div className="flex-1 flex flex-col ml-[10px]">
                            <div className=" font-bold text-[#ffce4f] text-[14px]">Bảo Kiên</div>
                            <div className="text-[#afaaaa] text-[13px] pb-[5px] break-all">Test bình luận</div>
                            <div className="text-[#7d7d7d] text-[12px]">1 giờ trước</div>
                        </div>
                   
                    </div>
                    <div className="w-full flex justify-center">
                            <span className="cursor-pointer font-semibold">Tải thêm</span>
                        </div>
                </div>
                <div className="flex bg-[#171717] rounded-[5px] p-[10px] w-full">
                    <img
                        className="h-[60px] w-[60px] object-cover border-[3px] border-[#656565] rounded-[8px]"
                        src={info.movie.thumb_url}
                        alt="avatar"
                    />
                    <div className="flex-1 flex flex-col ml-[10px]">
                        <div className=" font-bold text-[#ffce4f] text-[14px]">Bảo Kiên</div>
                        <div className="text-[#afaaaa] text-[13px] pb-[5px] break-all">Test bình luận</div>
                        <div className="text-[#7d7d7d] text-[12px]">1 giờ trước</div>
                    </div>
                </div>
            </div>
            <Button className="bg-[#ffce4f] MovieWatchBtn mt-[10px]">Tải thêm bình luận</Button>
        </div>
    );
};

export default Comment;
