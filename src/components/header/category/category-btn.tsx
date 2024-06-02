import { cn } from "@/lib/cn";
import React, { useState } from "react";
import { HamburgerIcon } from "../../../../public/static/svg";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { TabGroup, TabPanels } from "@headlessui/react";
import CategoryContent from "./category-content";
import YearContent from "./years-content";
import CountriesContent from "./countries";
import CategoryTabList from "./category-tab-list";

const CategoryBtn = () => {
    return (
        <div className="flex gap-8">
            <Popover>
                {({ open }) => (
                    <>
                        <PopoverButton
                            className={cn(
                                open ? "border-mainColor bg-mainColor" : "border-des bg-black",
                                "h-[36px] w-[42px] outline-none rounded flex items-center  py-[5px]  border-[1px] cursor-pointer  hover:opacity-80"
                            )}
                        >
                            <HamburgerIcon className={open ? "active" : ""} />
                        </PopoverButton>
                        <Transition
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <PopoverPanel
                                anchor="bottom"
                                className=" mt-3 !left-1/2 !-translate-x-1/2 transform  !max-w-[calc(100svw-48px)] w-screen rounded bg-white/5 text-sm/6 "
                            >
                                <TabGroup>
                                    <CategoryTabList />
                                    <TabPanels>
                                        <CategoryContent />
                                        <YearContent />
                                        <CountriesContent />
                                    </TabPanels>
                                </TabGroup>
                            </PopoverPanel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
};

export default CategoryBtn;
