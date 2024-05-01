import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FormateDate } from "@/utils/FormatDate";

type Props = {
  title: string;
  coverImage: string;
  shortDescription: string;
  slug: string;
  categories: string[];
  layout: "featured" | "default";
  date: string;
};

function ArticleCard({
  title,
  coverImage,
  categories,
  layout = "default",
  shortDescription,
  slug,
  date,
}: Props) {
  return (
    (layout === "featured" && (
      <section className="w-full grid grid-cols-12 gap-x-5">
        <div className="relative col-span-full md:col-span-6 w-full h-full aspect-video overflow-hidden rounded-lg">
          <Image
            src={coverImage}
            alt={title}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <section className="w-full col-span-full md:col-span-6 flex flex-col py-6">
          <h3 className="order-2 my-3 lg:my-5 text-xl xl:text-3xl font-bold text-light-primary dark:text-dark-primary">
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h3>
          <p className="order-2 -mt-2 text-base font-medium text-light-primary dark:text-dark-primary">
            {FormateDate(date, "MMM DD, YYYY")}
          </p>
          <p className="order-2 text-base xl:text-lg">{shortDescription}</p>
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
      </section>
    )) ||
    (layout === "default" && (
      <Link href={`/blog/${slug}`} className="break-inside-avoid" >
        <section className="mb-5 lg:mb-6 border-2 border-light-primary/10 dark:border-dark-primary/10 rounded-lg w-full overflow-hidden break-inside-avoid cursor-pointer translate-y-0 hover:-translate-y-2 transition-all duration-200 ease-in-out">
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
            <p className="order-2 mt-3 text-base xl:text-base">
              {shortDescription}
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
        </section>
      </Link>
    ))
  );
}

export default ArticleCard;
