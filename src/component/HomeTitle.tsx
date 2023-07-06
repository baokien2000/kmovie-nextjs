import React from "react";

const HomeTitle = (props: { title: string }) => {
    return (
        <div className="bg-[#242525] my-[10px]">
            <div className="relative Home_Title inline-block text-[#a7a7a7] text-[17px] font-bold bg-black px-[20px] h-[40px] leading-[40px] ">
                {props.title}
            </div>
        </div>
    );
};

export default HomeTitle;
