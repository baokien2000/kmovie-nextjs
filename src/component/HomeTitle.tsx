import React, { Ref ,RefObject} from "react";
interface Prop {
    forwardRef?: RefObject<HTMLDivElement> | undefined;
    title: string 
}
const HomeTitle = (props:Prop) => {
    return (
        <div className="bg-[#242525] mb-[10px]" ref={props.forwardRef}>
            <div className="relative Home_Title inline-block text-[#a7a7a7] text-[17px] font-bold bg-black px-[20px] h-[40px] leading-[40px] ">
                {props.title}
            </div>
        </div>
    );
};

export default HomeTitle;
