"use client";
import Link from "next/link";
import React from "react";
import { RxDashboard } from "react-icons/rx";
import { RiArticleLine } from "react-icons/ri";
import { FaRegImages, FaUserFriends } from "react-icons/fa";
import { MdOutlineEditNote } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { Logout } from "@/utils/firebase";

export default function SideBar() {
  const activePage = usePathname();

  const dashboardPages = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <RxDashboard className="text-3xl" />,
    },
    {
      name: "Articles",
      link: "/dashboard/articles",
      icon: <RiArticleLine className="text-3xl" />,
    },
    {
      name: "Gallery",
      link: "/dashboard/gallery",
      icon: <FaRegImages className="text-3xl" />,
    },
    {
      name: "Users",
      link: "/dashboard/users",
      icon: <FaUserFriends className="text-3xl" />,
    },
  ];

  return (
    <section className="h-screen sticky top-0 col-span-2 flex flex-col border-r border-black/5 px-4 pb-3 pt-28 shadow-lg shadow-black/10 dark:shadow-white/5">
      {dashboardPages.map((page) => {
        return (
          <Link
            key={page.name}
            href={page.link}
            className={`flex items-center gap-x-4 my-2 p-3 rounded-lg ${page.link === activePage
              ? "bg-light-primary/30 dark:bg-dark-primary/30 text-black dark:text-white"
              : "text-black dark:text-white"
              }`}
          >
            {page.icon}
            <span className="text-xl">{page.name}</span>
          </Link>
        );
      })}
      <button className="mt-auto flex items-center gap-x-4 my-2 p-3 rounded-lg text-black dark:text-white"
        onClick={() => {
          Logout();
        }}
      >
        <TbLogout2 className="text-3xl" />
        Logout
      </button>
    </section>
  );
}
