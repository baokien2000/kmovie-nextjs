import { Spin } from 'antd';
import React from 'react';
interface Prop {
    className: string,
}
const Loading = (props: Prop) => {
    return (
        <div className={props.className + ' w-full max-w-[1100px] flex justify-center items-center'}>
            <Spin size="large" />
        </div>

    );
};

export default Loading;