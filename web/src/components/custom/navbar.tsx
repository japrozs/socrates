import React from "react";
import { Logo } from "./logo";
import { Button } from "./button";
import { TbPencil } from "react-icons/tb";
import { IoArrowForward } from "react-icons/io5";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    return (
        <div className="px-4">
            <div className="flex items-center py-2 max-w-[76rem] mx-auto border-b border-dashed border-border-color">
                <a href="/">
                    <Logo className="text-primary-blue h-6 my-1 w-auto" />
                </a>
                <div className="flex items-center gap-x-3 ml-auto mr-0">
                    {/* <a href="/login">
                        <p className="bg-primary-blue rounded-md  text-white transition-all cursor-pointer gara text-blb tracking-wide hover:bg-primary-blue/10 hover:text-primary-blue py-1 px-4.5">
                            Try for free
                        </p>
                    </a> */}
                    <div className="w-32">
                        <a href="/signup">
                            <Button
                                label="Try for free"
                                colored
                                icon={IoArrowForward}
                                iconRight
                                iconMargin={3}
                                iconAnimate={true}
                                className="cursor-pointer"
                                iconClassName="ml-1.5 text-smol"
                                makeDarker
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
