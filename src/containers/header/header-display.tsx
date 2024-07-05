"use client";
import React, { useEffect } from "react";
import _ from "lodash";

const HeaderDisplay = () => {
    let scroll = 0;
    useEffect(() => {
        const handleScroll = () => {
            const headerAppClass = document?.getElementById("header-app")?.classList;
            const hasAutoScroll = headerAppClass?.contains("auto-scroll");

            if (scroll >= window.scrollY || window.scrollY < 72) {
                if (!hasAutoScroll) {
                    headerAppClass?.remove("opacity-0");
                    headerAppClass?.remove("pointer-events-none");
                }
                if (window.scrollY < 72) {
                    headerAppClass?.remove("auto-scroll");
                    headerAppClass?.remove("opacity-0");
                    headerAppClass?.remove("pointer-events-none");
                }
            } else {
                headerAppClass?.add("opacity-0");

                headerAppClass?.add("pointer-events-none");
                headerAppClass?.remove("auto-scroll");
            }

            scroll = window.scrollY;
        };
        const throttledHandleScroll = _.throttle(handleScroll, 100);
        window.addEventListener("scroll", throttledHandleScroll);

        return () => {
            window.removeEventListener("scroll", throttledHandleScroll);
        };
    }, []);
    return null;
};

export default HeaderDisplay;
