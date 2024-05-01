import { FormateDate } from "@/utils/FormatDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuFileEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

type Props = {
  title: string;
  coverImage: string;
  categories: string[];
  shortDescription: string;
  slug: string;
  date: string;
  showDeleteAlert: () => void;
  showEditForm: () => void;
};

export default function ArticleCard({
  title,
  shortDescription,
  categories,
  coverImage,
  date,
  slug,
  showDeleteAlert,
  showEditForm
}: Props) {
  return (
    <section className="relative group mb-5 lg:mb-6 border-2 border-light-primary/10 dark:border-dark-primary/10 rounded-lg w-full overflow-hidden break-inside-avoid cursor-pointer transition-all duration-200 ease-in-out">
      <div className="relative w-full aspect-video overflow-hidden ">
        <Image
          src={coverImage}
          alt={title}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <section className="w-full flex flex-col p-5">
        <h3 className="order-2 mt-3 text-xl xl:text-xl font-bold text-light-primary dark:text-dark-primary">
          {title}
        </h3>
        <p className="order-2 mt-2 text-base font-medium text-light-primary dark:text-dark-primary">
          {FormateDate(date, "MMM DD, YYYY")}
        </p>
        <section className="order-1 flex items-center justify-start flex-wrap gap-2">
          {categories.map((category, index) => {
            return (
              <p
                key={index}
                className="w-fit min-w-min text-xs xl:text-sm font-medium bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary py-2 px-4 rounded-full"
              >
                {category}
              </p>
            );
          })}
        </section>
      </section>
      <section className="absolute top-0 left-0 hidden group-hover:flex justify-center items-center gap-x-4 w-full h-full bg-black/50 backdrop-blur-md">
        <button className="w-12 h-12 flex justify-center items-center rounded-full border border-yellow-500 bg-yellow-500/20 text-yellow-500"
          onClick={() => {
            showEditForm();
          }}
        >
          <LuFileEdit className="text-2xl" />
        </button>

        <button
          className="w-12 h-12 flex justify-center items-center rounded-full border border-red-500 bg-red-500/20 text-red-500"
          onClick={() => {
            showDeleteAlert();
          }}
        >
          <MdDelete className="text-2xl" />
        </button>
      </section>
    </section>
  );
}
