"use client";

import Link from "next/link";
import React from "react";
import { useAuthContext } from "./layout";
import { RxDashboard } from "react-icons/rx";
import { RiArticleLine } from "react-icons/ri";
import { MdOutlineEditNote } from "react-icons/md";
import { FaRegImages, FaUserFriends } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Dashboard() {
  const user = useAuthContext();
  const router = useRouter();
  const dashboardPages = [
    {
      name: "Articles",
      link: "/dashboard/articles",
      icon: <RiArticleLine className="text-4xl" />,
    },
    {
      name: "Add New Article",
      link: "/dashboard/articles/new",
      icon: <MdOutlineEditNote className="text-5xl" />,
    },
    {
      name: "Gallery",
      link: "/dashboard/gallery",
      icon: <FaRegImages className="text-4xl" />,
    },
    {
      name: "Users",
      link: "/dashboard/users",
      icon: <FaUserFriends className="text-4xl" />,
    },
  ];

  return (
    <section className="w-full min-h-[80vh] flex flex-col justify-center items-center ">
      <h2 className="text-4xl font-semibold text-light-primary dark:text-dark-primary">
        Welcome to Admin Dashboard
      </h2>
      <section className="w-full max-w-3xl grid grid-cols-2 gap-5 h-fit mt-8">
        {dashboardPages.map((page) => {
          return (
            <section
              key={page.link}
              className="aspect-[16/9] flex flex-col justify-center items-center gap-y-2 rounded-xl border-2 border-light-primary/25 dark:border-dark-primary/25 text-light-primary dark:text-dark-primary bg-light-primary/10 dark:bg-dark-primary/10 cursor-pointer hover:-translate-y-1 hover:rotate-1 transition-all ease-in-out duration-200"
              onClick={() => {
                router.push(page.link);
              }}
            >
              {page.icon}
              <span className="text-2xl">{page.name}</span>
            </section>
          );
        })}
      </section>
    </section>
  );
}

export default Dashboard;
