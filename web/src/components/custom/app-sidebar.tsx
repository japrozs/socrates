import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "../ui/sidebar";
import { IoIosArrowDown } from "react-icons/io";
import { LuCog, LuPlus, LuSearch } from "react-icons/lu";
import { BsTextParagraph } from "react-icons/bs";
import { ImCog } from "react-icons/im";
import { GoPlus } from "react-icons/go";
import { CgFileDocument } from "react-icons/cg";
import { IoEllipsisHorizontal, IoSettingsOutline } from "react-icons/io5";
import { FiCompass, FiGlobe, FiPlus } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import Link from "next/link";
import { useMeQuery } from "@/generated/graphql";
import { getFirstName } from "@/utils/utils";
import { useRouter } from "next/router";
import { AccordionHeader } from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

interface AppSidebarProps {}

export const AppSidebar: React.FC<AppSidebarProps> = ({}) => {
    const { data } = useMeQuery();
    const router = useRouter();
    const active = (cid: string) => router.asPath === `/c/${cid}`;
    return (
        <Sidebar>
            <SidebarHeader className="gap-y-0.5">
                <div className="transition-colors group/parent hover:cursor-pointer px-1.5 py-1 rounded-sm flex items-center hover:bg-gray-100">
                    <span className="bg-primary-blue text-gray-100 px-1.5 py-0.5 rounded-sm text-xs menlo mr-2.5">
                        {data?.me?.name.charAt(0)}
                    </span>
                    <p className="text-sm font-medium">
                        {getFirstName(data?.me?.name || "")}'s workspace
                    </p>
                    <IoIosArrowDown className="ml-auto mr-0 text-gray-400 group-hover/parent:text-gray-500" />
                </div>
                <div className="transition-colors group/parent hover:cursor-pointer px-1.5 py-1 group rounded-sm flex items-center hover:bg-gray-100">
                    <LuSearch className="mr-3 text-gray-500" />
                    <p className="text-sm text-gray-700 font-medium group-hover/parent:text-black">
                        Search
                    </p>
                </div>
                <div className="transition-colors group/parent hover:cursor-pointer px-1.5 py-1 group rounded-sm flex items-center hover:bg-gray-100">
                    <IoSettingsOutline className="mr-3 text-gray-500" />
                    <p className="text-sm text-gray-700 font-medium group-hover/parent:text-black">
                        Settings
                    </p>
                </div>
            </SidebarHeader>
            <hr className="border-gray-100" />
            <SidebarContent>
                <SidebarGroup>
                    <p className="ml-1.5 mb-2 text-xsm text-gray-500 font-medium">
                        My Courses
                    </p>
                    <div className="flex flex-col gap-0.5">
                        <Accordion type="multiple" className="">
                            {data?.me?.courses.map((course, idx: number) => (
                                <AccordionItem key={idx} value={course.id}>
                                    <AccordionTrigger
                                        className={`${
                                            active(course.id)
                                                ? "bg-gray-100 text-black"
                                                : "text-gray-700"
                                        } transition-all group/parent hover:cursor-pointer px-1.5 py-1 group rounded-sm flex items-center hover:bg-gray-100 w-full`}
                                    >
                                        <a
                                            href={`/c/${course.id}`}
                                            className="flex items-center flex-1 min-w-0"
                                        >
                                            <CgFileDocument className="size-4.5 text-gray-500 mr-2" />

                                            <p className="text-sm truncate font-medium group-hover/parent:text-black overflow-hidden whitespace-nowrap min-w-0 flex-1">
                                                {course.name}
                                            </p>
                                        </a>

                                        <div className="flex gap-1 ml-2">
                                            <div className="group/child rounded-sm hover:bg-gray-200 min-w-max hidden group-hover/parent:block  transition-all">
                                                <IoEllipsisHorizontal
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        alert(123);
                                                    }}
                                                    className="rounded-sm size-5 p-0.5 group-hover/child:text-blue-500 text-gray-500"
                                                />
                                            </div>
                                            <div className="group/child rounded-sm hover:bg-gray-200 min-w-max hidden group-hover/parent:block transition-opacity">
                                                <AiOutlinePlus
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        alert(456);
                                                    }}
                                                    className="rounded-sm size-5 p-0.5 group-hover/child:text-blue-500 text-gray-500"
                                                />
                                            </div>
                                        </div>

                                        <ChevronDownIcon className="text-gray-400 accordion-arrow pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-[150ms]" />
                                    </AccordionTrigger>

                                    <AccordionContent className="pb-1.5 my-0">
                                        <div className="ml-2 transition-all group/parent hover:cursor-pointer px-1.5 py-1 group rounded-sm flex items-center gap-2 hover:bg-gray-100 w-full">
                                            <BsTextParagraph className="size-4.5 text-gray-500" />
                                            <p className="text-gray-700 truncate font-medium group-hover/parent:text-black overflow-hidden whitespace-nowrap flex-1">
                                                Chapter 1
                                            </p>
                                            <div className="mr-1.5 hidden group-hover/parent:block group/child rounded-sm hover:bg-gray-200 min-w-max">
                                                <IoEllipsisHorizontal
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        alert(123);
                                                    }}
                                                    className="rounded-sm size-4.5 p-0.5 group-hover/child:text-blue-500 text-gray-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="ml-2 transition-all group/parent hover:cursor-pointer px-1.5 py-1 group rounded-sm flex items-center gap-2 hover:bg-gray-100 w-full">
                                            <BsTextParagraph className="size-4.5 text-gray-500" />
                                            <p className="text-sm text-gray-700 truncate font-medium group-hover/parent:text-black overflow-hidden whitespace-nowrap flex-1">
                                                Chapter "dos"
                                            </p>
                                            <div className="mr-1.5 hidden group-hover/parent:block group/child rounded-sm hover:bg-gray-200 min-w-max">
                                                <IoEllipsisHorizontal
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        alert(123);
                                                    }}
                                                    className="rounded-sm size-4.5 p-0.5 group-hover/child:text-blue-500 text-gray-500"
                                                />
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </SidebarGroup>
                <SidebarGroup></SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
};
